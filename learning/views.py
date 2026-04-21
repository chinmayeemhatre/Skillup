from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Count
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.views.decorators.http import require_POST

from .forms import HelpRequestForm, MessageForm, ProfileForm, SignUpForm
from .models import Badge, HelpRequest, Level, MentorMessage, Profile, TaskCompletion, UserBadge, UserLevelProgress


def ensure_profile(user):
    profile, _ = Profile.objects.get_or_create(
        user=user,
        defaults={'avatar': ''.join(part[:1] for part in (user.first_name or user.username).split())[:2].upper() or 'SU'},
    )
    profile.touch_streak()
    return profile


def award_badges(user):
    profile = ensure_profile(user)
    completed_tasks = TaskCompletion.objects.filter(user=user).count()
    completed_levels = UserLevelProgress.objects.filter(user=user, completed=True).count()
    for badge in Badge.objects.all():
        qualifies = profile.xp >= badge.xp_required
        qualifies = qualifies or (badge.name == 'Task Crusher' and completed_tasks >= 10)
        qualifies = qualifies or (badge.name == 'Level Finisher' and completed_levels >= 1)
        qualifies = qualifies or (badge.name == 'Consistency Spark' and profile.streak >= 3)
        if qualifies:
            UserBadge.objects.get_or_create(user=user, badge=badge)


def progress_snapshot(user):
    levels = Level.objects.prefetch_related('tasks').all()
    total_tasks = sum(level.tasks.count() for level in levels) or 1
    completed_tasks = TaskCompletion.objects.filter(user=user).count()
    profile = ensure_profile(user)
    profile.refresh_level()
    percent = round((completed_tasks / total_tasks) * 100)
    current = Level.objects.filter(number=profile.current_level).first() or levels.last()
    return {
        'levels': levels,
        'total_tasks': total_tasks,
        'completed_tasks': completed_tasks,
        'progress_percent': percent,
        'profile': profile,
        'current_level': current,
    }


def home(request):
    levels = Level.objects.all()
    leaders = Profile.objects.select_related('user').order_by('-xp')[:5]
    return render(request, 'learning/home.html', {'levels': levels, 'leaders': leaders})


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.email = form.cleaned_data['email']
            user.first_name = form.cleaned_data['first_name']
            user.save()
            Profile.objects.create(user=user, college=form.cleaned_data['college'])
            login(request, user)
            messages.success(request, 'Welcome to SKILLUP. Your developer journey starts now.')
            return redirect('dashboard')
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})


@login_required
def dashboard(request):
    snapshot = progress_snapshot(request.user)
    award_badges(request.user)
    recent_tasks = TaskCompletion.objects.filter(user=request.user).select_related('task', 'task__level').order_by('-completed_at')[:6]
    next_tasks = Level.objects.filter(number=snapshot['profile'].current_level).prefetch_related('tasks').first()
    badges = UserBadge.objects.filter(user=request.user).select_related('badge')
    return render(request, 'learning/dashboard.html', {
        **snapshot,
        'recent_tasks': recent_tasks,
        'next_tasks': next_tasks.tasks.all()[:4] if next_tasks else [],
        'badges': badges,
    })


@login_required
def roadmap(request):
    snapshot = progress_snapshot(request.user)
    completed_levels = set(UserLevelProgress.objects.filter(user=request.user, completed=True).values_list('level_id', flat=True))
    return render(request, 'learning/roadmap.html', {**snapshot, 'completed_levels': completed_levels})


@login_required
def level_detail(request, number):
    level = get_object_or_404(Level.objects.prefetch_related('tasks', 'resources'), number=number)
    snapshot = progress_snapshot(request.user)
    completed_task_ids = set(TaskCompletion.objects.filter(user=request.user, task__level=level).values_list('task_id', flat=True))
    resources = {
        'videos': level.resources.filter(kind='video'),
        'references': level.resources.filter(kind='reference'),
        'tips': level.resources.filter(kind='tip'),
    }
    level_progress = round((len(completed_task_ids) / max(level.tasks.count(), 1)) * 100)
    return render(request, 'learning/level_detail.html', {
        **snapshot,
        'level': level,
        'completed_task_ids': completed_task_ids,
        'level_progress': level_progress,
        **resources,
    })


@login_required
@require_POST
def toggle_task(request, task_id):
    from .models import LevelTask

    task = get_object_or_404(LevelTask, id=task_id)
    completion, created = TaskCompletion.objects.get_or_create(user=request.user, task=task)
    profile = ensure_profile(request.user)
    if created:
        profile.xp += task.xp
        messages.success(request, f'+{task.xp} XP earned for "{task.title}".')
    else:
        completion.delete()
        profile.xp = max(0, profile.xp - task.xp)
        messages.info(request, f'"{task.title}" marked incomplete.')
    profile.save(update_fields=['xp'])

    total = task.level.tasks.count()
    done = TaskCompletion.objects.filter(user=request.user, task__level=task.level).count()
    progress, _ = UserLevelProgress.objects.get_or_create(user=request.user, level=task.level)
    if done == total and total:
        progress.completed = True
        profile.xp += task.level.xp_reward
        profile.save(update_fields=['xp'])
        messages.success(request, f'Level {task.level.number} completed. Bonus +{task.level.xp_reward} XP unlocked.')
    else:
        progress.completed = False
    progress.save()
    profile.refresh_level()
    award_badges(request.user)
    return redirect(reverse('level_detail', args=[task.level.number]))


def leaderboard(request):
    leaders = Profile.objects.select_related('user').annotate(done=Count('user__task_completions')).order_by('-xp', '-streak')[:25]
    return render(request, 'learning/leaderboard.html', {'leaders': leaders})


@login_required
def mentors(request):
    profile = ensure_profile(request.user)
    low, high = max(1, profile.current_level - 1), min(7, profile.current_level + 2)
    peers = Profile.objects.select_related('user').exclude(user=request.user).filter(current_level=profile.current_level)
    mentors_above = Profile.objects.select_related('user').exclude(user=request.user).filter(current_level__range=(profile.current_level + 1, high)).order_by('current_level', '-xp')
    help_form = HelpRequestForm(request.POST or None)
    if request.method == 'POST' and help_form.is_valid():
        help_request = help_form.save(commit=False)
        help_request.user = request.user
        help_request.save()
        messages.success(request, 'Your help request is visible to mentors and nearby peers.')
        return redirect('mentors')
    requests = HelpRequest.objects.select_related('user', 'level').filter(level__number__range=(low, high)).order_by('-created_at')[:8]
    return render(request, 'learning/mentors.html', {
        'profile': profile,
        'peers': peers,
        'mentors_above': mentors_above,
        'help_form': help_form,
        'requests': requests,
    })


@login_required
def chat(request, user_id):
    other = get_object_or_404(User, id=user_id)
    ensure_profile(other)
    form = MessageForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        msg = form.save(commit=False)
        msg.sender = request.user
        msg.receiver = other
        msg.save()
        messages.success(request, 'Message sent in the mentorship room.')
        return redirect('chat', user_id=other.id)
    messages_qs = MentorMessage.objects.filter(sender__in=[request.user, other], receiver__in=[request.user, other]).select_related('sender')
    return render(request, 'learning/chat.html', {'other': other, 'chat_messages': messages_qs, 'form': form})


@login_required
def profile(request):
    profile_obj = ensure_profile(request.user)
    form = ProfileForm(request.POST or None, instance=profile_obj, initial={
        'first_name': request.user.first_name,
        'email': request.user.email,
    })
    if request.method == 'POST' and form.is_valid():
        request.user.first_name = form.cleaned_data['first_name']
        request.user.email = form.cleaned_data['email']
        request.user.save(update_fields=['first_name', 'email'])
        form.save()
        messages.success(request, 'Profile updated.')
        return redirect('profile')
    return render(request, 'learning/profile.html', {'form': form, 'profile_obj': profile_obj})

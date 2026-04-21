from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Level(models.Model):
    number = models.PositiveSmallIntegerField(unique=True)
    title = models.CharField(max_length=80)
    tagline = models.CharField(max_length=180)
    xp_reward = models.PositiveIntegerField(default=250)
    theory = models.TextField()
    mini_project = models.TextField()
    example_questions = models.TextField()

    class Meta:
        ordering = ['number']

    def __str__(self):
        return f'Level {self.number}: {self.title}'


class LevelTask(models.Model):
    level = models.ForeignKey(Level, related_name='tasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=140)
    description = models.TextField()
    xp = models.PositiveIntegerField(default=25)

    def __str__(self):
        return self.title


class Resource(models.Model):
    RESOURCE_TYPES = [('video', 'Video'), ('reference', 'Reference'), ('tip', 'Tip')]
    level = models.ForeignKey(Level, related_name='resources', on_delete=models.CASCADE)
    kind = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    title = models.CharField(max_length=160)
    url = models.URLField(blank=True)
    description = models.CharField(max_length=240)

    def __str__(self):
        return self.title


class Badge(models.Model):
    name = models.CharField(max_length=80, unique=True)
    description = models.CharField(max_length=180)
    icon = models.CharField(max_length=10, default='*')
    xp_required = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    college = models.CharField(max_length=120, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.CharField(max_length=4, default='SU')
    xp = models.PositiveIntegerField(default=0)
    streak = models.PositiveIntegerField(default=1)
    current_level = models.PositiveSmallIntegerField(default=1)
    last_active = models.DateField(default=timezone.localdate)

    def refresh_level(self):
        completed = UserLevelProgress.objects.filter(user=self.user, completed=True).count()
        self.current_level = min(completed + 1, 7)
        self.save(update_fields=['current_level'])

    def touch_streak(self):
        today = timezone.localdate()
        if self.last_active == today:
            return
        if (today - self.last_active).days == 1:
            self.streak += 1
        else:
            self.streak = 1
        self.last_active = today
        self.save(update_fields=['streak', 'last_active'])

    def __str__(self):
        return self.user.username


class UserLevelProgress(models.Model):
    user = models.ForeignKey(User, related_name='level_progress', on_delete=models.CASCADE)
    level = models.ForeignKey(Level, related_name='progress', on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'level')


class TaskCompletion(models.Model):
    user = models.ForeignKey(User, related_name='task_completions', on_delete=models.CASCADE)
    task = models.ForeignKey(LevelTask, related_name='completions', on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'task')


class UserBadge(models.Model):
    user = models.ForeignKey(User, related_name='badges', on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, related_name='users', on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'badge')


class HelpRequest(models.Model):
    user = models.ForeignKey(User, related_name='help_requests', on_delete=models.CASCADE)
    level = models.ForeignKey(Level, related_name='help_requests', on_delete=models.CASCADE)
    question = models.TextField()
    status = models.CharField(max_length=20, default='open')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username}: {self.question[:40]}'


class MentorMessage(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

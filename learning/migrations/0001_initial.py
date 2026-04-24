
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Badge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80, unique=True)),
                ('description', models.CharField(max_length=180)),
                ('icon', models.CharField(default='*', max_length=10)),
                ('xp_required', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Level',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveSmallIntegerField(unique=True)),
                ('title', models.CharField(max_length=80)),
                ('tagline', models.CharField(max_length=180)),
                ('xp_reward', models.PositiveIntegerField(default=250)),
                ('theory', models.TextField()),
                ('mini_project', models.TextField()),
                ('example_questions', models.TextField()),
            ],
            options={
                'ordering': ['number'],
            },
        ),
        migrations.CreateModel(
            name='HelpRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('status', models.CharField(default='open', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='help_requests', to=settings.AUTH_USER_MODEL)),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='help_requests', to='learning.level')),
            ],
        ),
        migrations.CreateModel(
            name='LevelTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=140)),
                ('description', models.TextField()),
                ('xp', models.PositiveIntegerField(default=25)),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='learning.level')),
            ],
        ),
        migrations.CreateModel(
            name='MentorMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_messages', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('college', models.CharField(blank=True, max_length=120)),
                ('bio', models.TextField(blank=True)),
                ('avatar', models.CharField(default='SU', max_length=4)),
                ('xp', models.PositiveIntegerField(default=0)),
                ('streak', models.PositiveIntegerField(default=1)),
                ('current_level', models.PositiveSmallIntegerField(default=1)),
                ('last_active', models.DateField(default=django.utils.timezone.localdate)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kind', models.CharField(choices=[('video', 'Video'), ('reference', 'Reference'), ('tip', 'Tip')], max_length=20)),
                ('title', models.CharField(max_length=160)),
                ('url', models.URLField(blank=True)),
                ('description', models.CharField(max_length=240)),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resources', to='learning.level')),
            ],
        ),
        migrations.CreateModel(
            name='TaskCompletion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed_at', models.DateTimeField(auto_now_add=True)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='completions', to='learning.leveltask')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task_completions', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'task')},
            },
        ),
        migrations.CreateModel(
            name='UserBadge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('earned_at', models.DateTimeField(auto_now_add=True)),
                ('badge', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to='learning.badge')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='badges', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'badge')},
            },
        ),
        migrations.CreateModel(
            name='UserLevelProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed', models.BooleanField(default=False)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='progress', to='learning.level')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='level_progress', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'level')},
            },
        ),
    ]
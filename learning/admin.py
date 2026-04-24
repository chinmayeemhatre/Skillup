from django.contrib import admin

from .models import (
    Badge,
    HelpRequest,
    Level,
    LevelTask,
    MentorMessage,
    Profile,
    Resource,
    TaskCompletion,
    UserBadge,
    UserLevelProgress,
)

class LevelTaskInline(admin.TabularInline):
    model = LevelTask
    extra = 0

class ResourceInline(admin.TabularInline):
    model = Resource
    extra = 0

@admin.register(Level)
class LevelAdmin(admin.ModelAdmin):
    list_display = ('number', 'title', 'xp_reward')
    inlines = [LevelTaskInline, ResourceInline]

admin.site.register(Profile)
admin.site.register(Badge)
admin.site.register(UserBadge)
admin.site.register(UserLevelProgress)
admin.site.register(TaskCompletion)
admin.site.register(HelpRequest)
admin.site.register(MentorMessage)
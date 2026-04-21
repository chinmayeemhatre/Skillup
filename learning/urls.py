from django.contrib.auth import views as auth_views
from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('roadmap/', views.roadmap, name='roadmap'),
    path('level/<int:number>/', views.level_detail, name='level_detail'),
    path('task/<int:task_id>/toggle/', views.toggle_task, name='toggle_task'),
    path('leaderboard/', views.leaderboard, name='leaderboard'),
    path('mentors/', views.mentors, name='mentors'),
    path('chat/<int:user_id>/', views.chat, name='chat'),
    path('profile/', views.profile, name='profile'),
]

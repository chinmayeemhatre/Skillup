from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import HelpRequest, MentorMessage, Profile


class SignUpForm(UserCreationForm):
    email = forms.EmailField()
    first_name = forms.CharField(label='Full name', max_length=80)
    college = forms.CharField(max_length=120)

    class Meta:
        model = User
        fields = ['first_name', 'username', 'email', 'college', 'password1', 'password2']


class ProfileForm(forms.ModelForm):
    first_name = forms.CharField(max_length=80)
    email = forms.EmailField()

    class Meta:
        model = Profile
        fields = ['first_name', 'email', 'college', 'bio', 'avatar']


class HelpRequestForm(forms.ModelForm):
    class Meta:
        model = HelpRequest
        fields = ['level', 'question']
        widgets = {'question': forms.Textarea(attrs={'rows': 4})}


class MessageForm(forms.ModelForm):
    class Meta:
        model = MentorMessage
        fields = ['body']
        widgets = {'body': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Ask a focused question or share where you are stuck...'})}

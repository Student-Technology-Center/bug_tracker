from django import forms
from .models import BugReport

class BugForm(forms.Form):
	info = forms.CharField(label='Description', max_length=300, required=True,
				error_messages={
					'required':'Please fill this out',
					'max_length':'Limit 300 characters',},
				widget=forms.Textarea(attrs={
					'placeholder': 'Describe the issue',
					'rows': '5'}))
	recreate = forms.CharField(label='Recreation', max_length=300, required=True,
				error_messages={
					'required':'Please fill this out',
					'max_length':'Limit 300 characters',},
				widget=forms.Textarea(attrs={
					'placeholder': 'How can we recreate it?',
					'rows': '5'}))
	team = forms.ChoiceField(label='Team', choices=BugReport.TEAM_CHOICES,
				error_messages={
					'required':'Select a team',})
from django.shortcuts import render, redirect
from bug_tracker.models import BugReport

def index(request):

    context = { "teams" : BugReport.TEAM_CHOICES }

    return render(
        request,
        'bug_index.html',
        context
    )

def admin(request):
    
    context = { "bugs" : BugReport.objects.all() }

    if not request.user.is_superuser:
        redirect('/')

    return render(
        request,
        'bug_admin.html',
        context
    )
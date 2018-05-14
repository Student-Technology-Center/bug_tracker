from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from bug_tracker.models import BugReport

from .forms import BugForm
from django.contrib.auth.decorators import login_required
from login.decorators import user_is_email_confirmed

@login_required
@user_is_email_confirmed
def index(request):

    if request.method == 'POST':
        form = BugForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            new_report = BugReport.objects.create(info=data.get('info'),
                                              recreation=data.get('recreate'),
                                              user=request.user,
                                              team=data.get('team'))
            return HttpResponseRedirect('/bug/submitted/')

    else: 
        form = BugForm()

    context = { 
        'teams' : BugReport.TEAM_CHOICES,
        'form'  : form,
    }

    return render(
        request,
        'bug_index.html',
        context
    )

@login_required
@user_is_email_confirmed
def admin(request):

    team_info = []

    for k,v in BugReport.TEAM_CHOICES:
        team_info.append({
            'name':v,
            'open':BugReport.objects.filter(team__exact=k).filter(resolved__exact=False),
            'closed':BugReport.objects.filter(team__exact=k).filter(resolved__exact=True),
        })

    context={'team_info':team_info}

    print(context)

    if not request.user.is_superuser:
        redirect('/')

    return render(
        request,
        'bug_admin.html',
        context
    )

@login_required
@user_is_email_confirmed
def submitted(request):

    context = {}

    return render(
        request,
        'submitted.html',
        context)
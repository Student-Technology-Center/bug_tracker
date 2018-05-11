from django.shortcuts import render, redirect
#from django.http import JsonResponse
from django.http import HttpResponseRedirect
from bug_tracker.models import BugReport

from .forms import BugForm

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

def index2(request):

    if request.method == 'POST':
        form = BugForm(request.POST)
        if form.is_valid():
            print("ITS ALL GOOD")
            data = form.cleaned_data
            new_report = BugReport.objects.create(info=data.get('info'),
                                              recreation=data.get('recreate'),
                                              user=request.user,
                                              team=data.get('team'))
            return HttpResponseRedirect('/bug/submitted/')

        else: 
            valid = False

    else: 
        form = BugForm()
        valid = True

    context = { 
        'teams' : BugReport.TEAM_CHOICES,
        'form'  : form,
        'valid' : valid,
    }

    return render(
        request,
        'bug_index2.html',
        context
    )


def submitted(request):

    context = {}

    return render(
        request,
        'submitted.html',
        context)
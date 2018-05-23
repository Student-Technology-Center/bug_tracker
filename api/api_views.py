from django.http import JsonResponse
from django.http import HttpResponseRedirect
from bug_tracker.models import BugReport
from bug_tracker.forms import BugForm
from django import forms
from django.views.decorators.http import require_http_methods

#Submit a new bug to the database
def submit(request):
    info = request.POST.get('info', False)
    recreate = request.POST.get('recreate', False)
    team = request.POST.get('team', False)

    for i in BugReport.objects.all():
        print("{} by {} for {}: {} recreated by {}".format(i.pk, i.user.username, i.team, i.info, i.recreation))
    
    if (len(info) > 300 or 
        len(recreate) > 300 or
        recreate == '' or
        info == ''):
        return JsonResponse({
            'status':'failed',
            'message':'Either your length is too long, or you entered nothing.'
        })
    
    if info and recreate:
        new_report = BugReport.objects.create(info=info,
                                              recreation=recreate,
                                              user=request.user,
                                              team=team)

    return JsonResponse({
        'status':'success',
        'message':'Thanks for the submission.'
    })

# Get info for an existing bug
def get(request, pk):
    context = {}

    bug_report = BugReport.objects.get(pk=pk)

    if bug_report.resolved_by is None:
        resolved_by_val = ""
    else:
        resolved_by_val = "{} {}".format(bug_report.resolved_by.first_name, bug_report.resolved_by.last_name)

    return JsonResponse({
        'status':'success',
        'message':'Info is in bugReport.',
        'bugReport': {
            'pk': str(bug_report.pk),
            'report': str(bug_report.info),
            'recreation': str(bug_report.recreation),
            'team': str(bug_report.team),
            'full_name': "{} {}".format(bug_report.user.first_name, bug_report.user.last_name),
            'resolved': bool(bug_report.resolved),
            'resolved_by' : resolved_by_val,
            'resolution' : str(bug_report.resolution)
        }
    })

# Delete an existing bug
def delete(request, pk):

    if not request.user.is_superuser:
        return JsonResponse({
            'status':'failed',
            'message':"User isn't admin.",
            'resolved':'false'
        })

    bug_report = BugReport.objects.get(pk=pk)

    if bug_report:
        bug_report.delete()
        return JsonResponse({
            'status':'success',
            'message':'Deleted entry.',
            'resolved':'delete'
        })

    return JsonResponse({
        'status':'failed',
        'message':'Something went wrong.',
        'resolved':'true' if (bug_report.resolved) else 'false'
    })


# Update the status of an existing bug
@require_http_methods(['POST'])
def update(request):

    context = {}

    if not request.user.is_superuser:
        return JsonResponse({
            'status':'failed',
            'message':"User isn't admin."
        })

    pk = request.POST.get('pk', False)
    resolved = request.POST.get('resolved', False)
    resolution = request.POST.get('resolution', False)

    bug_report = BugReport.objects.get(pk=pk)

    resolved_bool = True if resolved == 'True' else False

    if resolved:
        bug_report.resolved = resolved_bool
        bug_report.resolution = resolution
        if resolved_bool:
            bug_report.resolved_by = request.user
        else:
            bug_report.resolved_by = None
        bug_report.save()
        print(bug_report.resolved)
        return JsonResponse({
            'status':'success',
            'message':'Report updated'
        })

    return JsonResponse({
            'status':'failed',
            'message':'Something went wrong'
        })

from django.http import JsonResponse
from bug_tracker.models import BugReport

def submit(request):
    info = request.POST.get('info', False)
    recreate = request.POST.get('recreate', False)

    for i in BugReport.objects.all():
        print("{} by {}: {} recreated by {}".format(i.pk, i.user.username, i.info, i.recreation))
    
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
                                              user=request.user)


    return JsonResponse({
        'status':'success',
        'message':'Thanks for the submission.'
    })

def get(request, pk):
    context = {}

    bug_report = BugReport.objects.get(pk=pk)

    return JsonResponse({
        'status':'success',
        'message':'Info is in bugReport.',
        'bugReport': {
            'pk': str(bug_report.pk),
            'report': str(bug_report.info),
            'recreation': str(bug_report.recreation),
            'full_name': "{} {}".format(bug_report.user.first_name, bug_report.user.last_name)
        }
    })



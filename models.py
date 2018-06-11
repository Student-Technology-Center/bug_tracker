from django.db import models
from django.conf import settings


class BugReport(models.Model):

    web         = 'WEBMASTER'
    hardware    = 'HARDWARE'
    dev         = 'DEV'
    other       = 'OTHER'

    TEAM_CHOICES = (
		(web, 'Website Staff'),
		(hardware, 'Hardware Team'),
        (dev, 'Dev Team'),
		(other, 'Miscellaneous Bugs'),
    )

    TEAM_PERMS = {
        web:'bug_tracker.view_webmaster',
        hardware:'bug_tracker.view_hardware',
        dev:'bug_tracker.view_dev',
        other:'bug_tracker.view_other',
    }
	  
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user")
    info = models.CharField(max_length=300, blank=False)
    recreation = models.CharField(max_length=300, blank=False)
    resolved = models.BooleanField(default=False)
    resolution = models.CharField(max_length=300, blank=False, null=True)
    resolved_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name="resolved_by")
    team = models.CharField(max_length = 50, default='OTHER', choices=TEAM_CHOICES)


    class Meta:

        permissions = (
            ('bug_admin', "Is able to view bug admin page"),
            ('view_webmaster', "Is able to view webmaster bugs"),
            ('view_hardware', "Is able to view hardware team bugs"),
            ('view_dev', "Is able to view dev team bugs"),
            ('view_other', "Is able to view uncategorized bugs"),
        )
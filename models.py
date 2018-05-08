from django.db import models
from django.conf import settings

class BugReport(models.Model):

    TEAM_CHOICES = (
		('WEBMASTER', 'Webmaster'),
		('DEV', 'Dev Team'),
		('HARDWARE', 'Hardware Team'),
		('OTHER', 'Other'),
    )
	  
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    info = models.CharField(max_length=300, blank=False)
    recreation = models.CharField(max_length=300, blank=False)
    resolved = models.BooleanField(default=False)
    team = models.CharField(max_length = 50, default='OTHER', choices=TEAM_CHOICES)

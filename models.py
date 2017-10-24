from django.db import models
from django.conf import settings

class BugReport(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    info = models.CharField(max_length=300, blank=False)
    recreation = models.CharField(max_length=300, blank=False)
    resolved = models.BooleanField(default=False)

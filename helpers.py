from utils.message import send_stc_email
from .models import BugReport

from django.contrib.auth.models import Group, User



def send_bug_notification(bug):
	team_group = Group.objects.get(name=bug.team)
	subject = "New bug at the STC"
	message = """There's a new bug on the bug tracker for you!

Team: {}
Submitted by: {}

Description: {}

Recreation: {}
				""".format(bug.team, bug.user, bug.info, bug.recreation)
	members = User.objects.filter(groups__name=team_group)
	emails = []
	for user in members:
		emails += user.email

	send_stc_email(subject, message, members, True)
from django.conf.urls import url, include

import bug_tracker.views as view

urlpatterns = [
    url(r'^$', view.index),
    url(r'admin/$', view.admin),
    url(r'api/', include('bug_tracker.api.api_urls')),
    url(r'submitted/', view.submitted),
]
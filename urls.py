from django.conf.urls import url

import bug_tracker.views as view

urlpatterns = [
    url(r'^$', view.index)
]
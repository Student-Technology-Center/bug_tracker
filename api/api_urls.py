from . import api_views as view
from django.conf.urls import url

urlpatterns = [
    url(r'submit/', view.submit),
    url(r'get/(?P<pk>\d+)/?$', view.get),
    url(r'mark/(?P<pk>\d+)/?$', view.mark)
]
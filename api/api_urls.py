from . import api_views as view
from django.conf.urls import url

urlpatterns = [
    url(r'submit/', view.submit),
    url(r'get/(?P<pk>\d+)/?$', view.get),
    url(r'delete/(?P<pk>\d+)/?$', view.delete),
    url(r'update/', view.update),
]
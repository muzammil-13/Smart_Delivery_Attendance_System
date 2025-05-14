from django.urls import path
from .views import BecknDiscoveryAPI

urlpatterns = [
    path('beckn/discovery', BecknDiscoveryAPI.as_view(), name='beckn-discovery'),
]

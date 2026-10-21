from django.urls import path
from .api_views import drinkAvailableCreateView;

urlpatterns = [
    path(
        'orders/',
        drinkAvailableCreateView.as_view(),
        name='create-order'
    ),
]
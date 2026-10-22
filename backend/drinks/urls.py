from django.urls import path
from .api_views import drinkAvailableListCreateView;

urlpatterns = [
    path(
        'orders/',
        drinkAvailableListCreateView.as_view(),
        name='create-order'
    ),
]
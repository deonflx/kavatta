from rest_framework import generics
from .models import drinksAvailable
from .serializers import drinkAvailableserializer

class drinkAvailableListCreateView(generics.ListCreateAPIView):
    queryset=drinksAvailable.objects.all()
    serializer_class=drinkAvailableserializer


from rest_framework import generics
from .models import drinksAvailable
from .serializers import drinkAvailableserializer

class drinkAvailableCreateView(generics.CreateAPIView):
    queryset=drinksAvailable.objects.all()
    serializer_class=drinkAvailableserializer
    
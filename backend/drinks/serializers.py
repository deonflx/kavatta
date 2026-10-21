from .models import drinksAvailable
from rest_framework import serializers

class drinkAvailableserializer(serializers.ModelSerializer):
    class Meta:
        model=drinksAvailable
        fields=['id,'
        'brand',
        'quantity',
        'number',
        'location',
        'contact',
        'created_at'
                 ]
        read_only_fields=['id','created_at']
        
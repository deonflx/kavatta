from django.db import models

class drinksAvailable(models.Model):

# Create your models here.
    brand=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100,default='Full')
    number=models.PositiveIntegerField()
    location=models.CharField()
    district=models.CharField(max_length=100,default='ernakulam')
    contact=models.CharField(max_length=20)
    price=models.PositiveIntegerField()

    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.brand}-{self.number} bottles"
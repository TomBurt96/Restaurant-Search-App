from django.db import models

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=120)
    restaurant_type = models.CharField(max_length=120)
    price_range = models.PositiveSmallIntegerField(
        choices=[(1, "$"), (2, "$$"), (3, "$$$"), (4, "$$$$"), (5, "$$$$$")],
        default=1
    )
    food_type = models.CharField(max_length=120)
    address = models.CharField(max_length=120)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    delivers = models.BooleanField()



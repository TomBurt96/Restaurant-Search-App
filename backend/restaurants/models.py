from django.db import models

# Create your models here.
class Restaurant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    food_type = models.CharField(max_length=120)
    address = models.CharField(max_length=120)
    price_range = models.CharField(max_length=5)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    phone_number = models.CharField(
        max_length=20,  # Adjust based on your needs
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',  # Example regex for international phone numbers
                message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
            )
        ]
    )
    wesbite = models.CharField(Max_length=100)
    delivery = models.BooleanField()
    notes = models.CharField(max_length=1000)
    __all__ = ['name', 'restaurant_type', 'price_range', 'food_type', 'address', 'rating', 'delivers']

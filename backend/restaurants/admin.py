from django.contrib import admin
from .models import Restaurant

class TodoAdmin(admin.ModelAdmin):
    list_display = ('name', 'restaurant_type', 'price_range', 'food_type', 'address', 'rating', 'delivers')

# Register your models here.

admin.site.register(Restaurant, TodoAdmin)
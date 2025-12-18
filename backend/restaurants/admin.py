from django.contrib import admin
from .models import Restaurant

class TodoAdmin(admin.ModelAdmin):
    list_display = Restaurant.__all__
# Register your models here.
admin.site.register(Restaurant, TodoAdmin)
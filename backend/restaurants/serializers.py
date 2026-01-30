from rest_framework import serializers # Add this line!
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Restaurant

class RestaurantSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Restaurant
        geo_field = 'position'
        id_field = False
        fields = Restaurant.__all__
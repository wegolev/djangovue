from django.contrib import admin
from .models import Delivery

@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('order', 'transport_type', 'estimated_delivery_date', 'cost')
    list_filter = ('transport_type',)
    search_fields = ('order__id',)

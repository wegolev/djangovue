from django.db import models
from orders.models import Order

class Delivery(models.Model):
    TRANSPORT_CHOICES = [
        ('truck', 'Грузовик'),
        ('dump_truck', 'Самосвал'),
        ('loader', 'Погрузчик'),
    ]
    
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='delivery')
    transport_type = models.CharField(max_length=20, choices=TRANSPORT_CHOICES)
    estimated_delivery_date = models.DateField()
    actual_delivery_date = models.DateField(null=True, blank=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    driver_info = models.CharField(max_length=200, blank=True)
    tracking_number = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return f"Delivery for Order #{self.order.id}"
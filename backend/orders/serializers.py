from rest_framework import serializers
from products.serializers import ProductSerializer
from .models import Order, OrderItem
from delivery.serializers import DeliverySerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    delivery = DeliverySerializer(read_only=True)  # Доставка будет вложена в заказ
    
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source='order_items', many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ('customer', 'status')


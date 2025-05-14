# from rest_framework import viewsets, permissions
# from .models import Order, OrderItem
# from .serializers import OrderSerializer, OrderItemSerializer
# from rest_framework.decorators import action
# from rest_framework.response import Response

# class OrderViewSet(viewsets.ModelViewSet):
#     serializer_class = OrderSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         return Order.objects.filter(customer=self.request.user)
    
#     def perform_create(self, serializer):
#         serializer.save(customer=self.request.user)
    
#     @action(detail=True, methods=['post'])
#     def add_item(self, request, pk=None):
#         order = self.get_object()
#         # Логика добавления товара в заказ
#         return Response({'status': 'item added'})
    

from rest_framework import viewsets
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.permissions import IsAuthenticated

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    basename = 'order'  # Явно указываем basename


    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]  # Можно настроить права по желанию
    basename = 'order'  # Явно указываем basename



# from rest_framework import viewsets
# from .models import Order, OrderItem
# from .serializers import OrderSerializer, OrderItemSerializer
# from rest_framework.permissions import IsAuthenticated

# class OrderViewSet(viewsets.ModelViewSet):
#     serializer_class = OrderSerializer
#     permission_classes = [IsAuthenticated]
#     basename = 'order'  # Явно указываем basename

#     def get_queryset(self):
#         return Order.objects.filter(customer=self.request.user)

#     def perform_create(self, serializer):
#         serializer.save(customer=self.request.user)

# class OrderItemViewSet(viewsets.ModelViewSet):
#     serializer_class = OrderItemSerializer
#     permission_classes = [IsAuthenticated]
#     basename = 'orderitem'  # Явно указываем basename

#     def get_queryset(self):
#         return OrderItem.objects.filter(order__customer=self.request.user)
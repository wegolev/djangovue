<template>
    <div class="order-success">
      <h1>Заказ успешно оформлен!</h1>
      <p>Спасибо за ваш заказ. Номер вашего заказа: #{{ $route.params.orderId }}</p>
      <router-link to="/" class="back-link">Вернуться в магазин</router-link>
    </div>
  </template>
  
  <style scoped>
  .order-success {
    text-align: center;
    padding: 40px 20px;
  }
  .back-link {
    display: inline-block;
    margin-top: 20px;
    color: #42b983;
    font-size: 1.1em;
  }
  </style>
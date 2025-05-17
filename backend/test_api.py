import requests
from getpass import getpass

# 1. Получение токена
BASE_URL = "http://127.0.0.1:8000/api/"
username = input("Введите имя пользователя: ")
password = getpass("Введите пароль: ")

# Аутентификация
auth_response = requests.post(
    f"{BASE_URL}token/",
    json={"username": username, "password": password}
)
auth_response.raise_for_status()
access_token = auth_response.json()["access"]
print(f"Токен получен: {access_token[:15]}...")

# 2. Проверка заказов
orders_response = requests.get(
    f"{BASE_URL}orders/",
    headers={"Authorization": f"Bearer {access_token}"}
)

print("Статус код:", orders_response.status_code)
print("Ответ сервера:", orders_response.json())
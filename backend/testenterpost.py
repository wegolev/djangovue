import requests

# Данные для авторизации
login_data = {
    "username": "testuser01",
    "password": "testuser01"
}

# Отправляем POST запрос на получение токена
response_login = requests.post("http://127.0.0.1:8000/api/token/", json=login_data)

if response_login.status_code == 200:
    token = response_login.json().get("token")
    if token:
        print("Авторизация успешная! Токен:", token)
    else:
        print("Ошибочная структура ответа. Возможно, сервер возвращает неверный формат.")
else:
    print(f"Ошибка авторизации. Код статуса: {response_login.status_code}")
    print(response_login.text)
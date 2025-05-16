import requests

# Данные для регистрации
registration_data = {
    "username": "testuser01",
    "email": "test01@example.com",
    "password": "testuser01",
    "phone": "+123456789",
    "company_name": "Test Company"
}

# Отправляем POST запрос на сервер
response_registration = requests.post("http://127.0.0.1:8000/api/users/", json=registration_data)

if response_registration.status_code == 201:
    print("Пользователь успешно зарегистрирован!")
else:
    print(f"Произошла ошибка регистрации. Код статуса: {response_registration.status_code}")
    print(response_registration.text)
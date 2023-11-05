from fastapi.testclient import TestClient
from main import app
from models import User
from database import SessionLocal

url_base = "http://127.0.0.1:8000"
# create a database session
db = SessionLocal()

# delete all Users
db.query(User).delete()

# commit the changes
db.commit()

client = TestClient(app)

def test_create_user():
    # Comprobamos que la contraseña sea de longitud mayor a 8
    user = {
        "username": "Javi",
        "password": "aaa",
        "email": "alguien@ejemplo.com",
        "available_money": 0
    }
    response = client.post("/user/", json=user)
    assert response.status_code == 422

    # Comprobamos que la contraseña tenga un caracter especial
    user = {
        "username": "Javi",
        "password": "Aaaaaaaa",
        "email": "alguien@ejemplo.com",
        "available_money": 0
    }
    response = client.post("/user/", json=user)
    assert response.status_code == 422

    # Comprobamos que el email es válido.
    user = {
        "username": "Javi",
        "password": "Aaaaaaaa",
        "email": "alguien.ejemplo.com",
        "available_money": 0
    }
    response = client.post("/user/", json=user)
    assert response.status_code == 422


    user = {
        "username": "Javi",
        "password": "Aaaaaaaa.",
        "email": "alguien@ejemplo.com",
        "available_money": 0
    }
    response = client.post("/user/", json=user)
    assert response.status_code == 200
    created_user = response.json()
    assert created_user["username"] == user["username"]
    assert created_user["password"] == user["password"]
    assert created_user["available_money"] == user["available_money"]
    assert created_user["email"] == user["email"]
    user = {
        "username": "Carlos",
        "password": "Bbbbbbbbbb.",
        "email": "alguien1@ejemplo.com",
        "available_money": 0
    }
    response = client.post("/user/", json=user)
    assert response.status_code == 200
    created_user = response.json()
    assert created_user["username"] == user["username"]
    assert created_user["password"] == user["password"]
    assert created_user["available_money"] == user["available_money"]

def test_read_users():
    users = [
     {
        "username": "Javi",
        "password": "Aaaaaaaa.",
         "email": "alguien@ejemplo.com",
        "available_money": 0
    },
    {
        "username": "Carlos",
        "password": "Bbbbbbbbbb.",
        "email": "alguien1@ejemplo.com",
        "available_money": 0
        }
    ]
    response = client.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) == len(users)
    for i, user in enumerate(users):
        assert response.json()[i]["username"] == user["username"]
        assert response.json()[i]["email"] == user["email"]


def test_update_user():
    updated_user = {
        "username": "Marcos",
        "password": "Ccccccccc.",
        "email": "alguien2@ejemplo.com",
        "available_money": 0,
    }

    response = client.put(f"/userN/Javi", json=updated_user)
    assert response.status_code == 200
    assert response.json()["username"] == updated_user["username"]
    assert response.json()["password"] == updated_user["password"]
    assert response.json()["email"] == updated_user["email"]
    assert response.json()["available_money"] == updated_user["available_money"]

def test_delete_user():
    user = {
        "username": "Marcos",
        "password": "Ccccccccc.",
        "email": "alguien2@ejemplo.com",
        "available_money": 0,
    }
    response = client.delete(f"/user/Marcos")
    assert response.status_code == 200
    assert response.json()["username"] == user["username"]
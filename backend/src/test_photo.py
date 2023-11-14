from fastapi.testclient import TestClient
from main import app
from models import Photo,User
from database import SessionLocal

url_base = "http://127.0.0.1:8000"
# create a database session
db = SessionLocal()

# delete all photos
db.query(Photo).delete()

#delete the user
db.query(User).delete()

# commit the changes
db.commit()

client = TestClient(app)

def test_create_valid_photo():
    user_data = {
        "username": "drake",
        "email": "dragon@gmail.com",
        "available_money": 100,
    }
    user = User(**user_data)
    user.password = "Dragon07$"
    db.add(user)
    db.commit()
    valid_photo_data = {
        "url": "https://example.com/photo.jpg",
        "title": "Valid Photo",
        "price": 100
    }
    user_id = "drake"

    response = client.post("/photos/", json=valid_photo_data, params={"user_id": user_id})
    assert response.status_code == 200
    created_photo = response.json()
    assert created_photo["url"] == valid_photo_data["url"]
    assert created_photo["title"] == valid_photo_data["title"]
    assert created_photo["price"] == valid_photo_data["price"]

def test_read_photos():
    user_data = {
        "username": "drake",
        "email": "dragon@gmail.com",
        "available_money": 100,
    }
    user = User(**user_data)
    user.password = "Dragon07$"
    db.add(user)
    db.commit()
    client.post("/photos/", json={
        "url": "https://example.com/photo.jpg",
        "title": "Valid Photo",
        "price": 100
    }, params={"user_id": "drake"})
    client.post("/photos/", json={
        "url": "https://example.com/photo2.jpg",
        "title": "Valid Photo2",
        "price": 100
    }, params={"user_id": "drake"})
    response = client.get("/photos/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert response.json() == [{
        "id":1,
        "url": "https://example.com/photo.jpg",
        "title": "Valid Photo",
        "price": 100,
        "user_id":"drake"
    },{
        "id":2,
        "url": "https://example.com/photo2.jpg",
        "title": "Valid Photo2",
        "price": 100,
        "user_id":"drake"
    }]



def test_read_photo_by_title():
    user_data = {
        "username": "drake",
        "email": "dragon@gmail.com",
        "available_money": 100,
    }
    user = User(**user_data)
    user.password = "Dragon07$"
    db.add(user)
    db.commit()
    client.post("/photos/", json={
        "url": "https://example.com/photo.jpg",
        "title": "ValidPhoto",
        "price": 100
    }, params={"user_id": "drake"})
    response = client.get("/photos/ValidPhoto")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "url": "https://example.com/photo.jpg",
        "title": "ValidPhoto",
        "price": 100,
        "user_id": "drake"
    }

def test_update_photo():
    user_data = {
        "username": "drake",
        "email": "dragon@gmail.com",
        "available_money": 100,
    }
    user = User(**user_data)
    user.password = "Dragon07$"
    db.add(user)
    db.commit()
    client.post("/photos/", json={
        "url": "https://example.com/photo.jpg",
        "title": "ValidPhoto",
        "price": 100
    }, params={"user_id": "drake"})
    updated_photo_data = {
        "url": "https://example.com/photo.jpg",
        "title": "ValidPhoto",
        "price": 200
    }
    response = client.put("/photos/1/", json=updated_photo_data, params={"user_id": "drake"})
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "url": "https://example.com/photo.jpg",
        "title": "ValidPhoto",
        "price": 200,
        "user_id": "drake"
    }

def test_delete_photo():
    user_data = {
        "username": "drake",
        "email": "dragon@gmail.com",
        "available_money": 100,
    }
    user = User(**user_data)
    user.password = "Dragon07$"
    db.add(user)
    db.commit()
    client.post("/photos/", json={
        "url": "https://example.com/photo.jpg",
        "title": "ValidPhoto",
        "price": 100
    }, params={"user_id": "drake"})
    response = client.delete("/photos/1/")
    assert response.status_code == 200
from imageOCR import imageOCR
import time

start = time.time()
image_raw_text = imageOCR([
    {"fileName": "uploads/df96964e-82de-4f5c-9d1e-c53855452e50.jpeg", "id": 13}, 
    {"fileName": "uploads/7a988cb8-d8d7-4c40-abfe-e259d596b6f6.jpeg", "id": 25},
    {"fileName": "uploads/e75d7a9b-043b-4452-8447-79db61929fa0.jpeg", "id": 26},
    {"fileName": "uploads/783ae786-cfe6-4444-96d0-9f3d1dc92bb3.jpeg", "id": 27},
    {"fileName": "uploads/92b66e8e-fbbc-4c61-bd4a-d5d33d82cc42.jpeg", "id": 28},
])

print(time.time() - start)
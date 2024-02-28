from imageOCR import imageOCR
import time

start = time.time()
image_raw_text = imageOCR([{"fileName": "20230923_222521.jpg", "id": 13}, {"fileName": "20230923_222555.jpg", "id": 25}])
print(image_raw_text)
print(time.time() - start)
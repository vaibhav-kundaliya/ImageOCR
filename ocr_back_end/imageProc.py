import cv2
from matplotlib import pyplot as plt
import time
from multiprocessing import Process
import easyocr
from multiprocessing import Process, Manager
# Define your EasyOCR reader (assuming it's initialized elsewhere in your code)
# reader = ...

def process_cropped_images_easy_ocr(image_path, image, bboxes, reader):
    for i in bboxes[0][0]:
        start = time.time()
        cropped_part = image[i[2]:i[3], i[0]:i[1]]
        text = reader.readtext(cropped_part)
        print(text)       
        print(image_path, "Time:", time.time()-start)
    

def process_image(image_path, reader):
    start = time.time()
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)    
    resized_image = cv2.resize(image, (image.shape[1]//4, image.shape[0]//4))
    detect_text = reader.detect(resized_image)
    process_cropped_images_easy_ocr(image_path, resized_image, detect_text, reader)
    print("Total time:", time.time()-start)

if __name__ == '__main__':
    reader = easyocr.Reader(['en'])  # Initialize your EasyOCR reader here

    list_of_image_path = [
        "uploads\\20230921_154104 (Large).jpg",
    ]

    # Create a process for each image
    processes = []

    for image_path in list_of_image_path:
        # process_image(image_path, reader)
        process = Process(target=process_image, args=(image_path, reader))
        processes.append(process)
        process.start()

    # Wait for all processes to finish
    # for process in processes:
    #     process.join()
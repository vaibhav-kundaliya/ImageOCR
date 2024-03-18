import re
import os
import numpy as np
import pytesseract
import spacy
import cv2
from time import time

nlp = spacy.load("en_core_web_sm")

CONTACT_REGEX = r'(?:\+|)\d(?:[\.\s-]?\d){9,11}'
URL_REGEX = r"www.*(?:in|com|org|net|dev)"
EMAIL_REGEX = r'[\d|\w]+@\w+.(?:com|in|net|org|dev)'
DOWNLOAD_FOLDER = "./uploads/"
def FetchCompanyName(text):
    doc = nlp(text)
    organizations = [ent.text for ent in doc.ents if ent.label_ == 'ORG']
    return " | ".join(organizations)

def process_cropped_images_easy_ocr(image, bboxes, reader):
    final_text = []
    for i in bboxes[0][0]:
        cropped_part = image[i[2] : i[3], i[0] : i[1]]
        kernal = np.array([
             [-1,-1,-1],
             [-1,9,-1],
             [-1,-1,-1]
        ])
        final_image = cv2.filter2D(cropped_part, -1, kernal)
        
        start = time()
        text = reader.readtext(final_image, detail=0)
        print("reader.readtext time",time()-start)
        if text:
                final_text.append(text[0])

    return " ".join(final_text)

def imageProcessing(image_path: str):
    
    image = cv2.imread(DOWNLOAD_FOLDER+image_path)

    grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    resized_image = cv2.resize(grayscale_image, (image.shape[1], image.shape[0]))

    
    results = pytesseract.image_to_string(resized_image)
    
    return results

def imageOCR(images: [dict]):
    """Extract text from given list of images

    Args:
        images (list): list of path of images

    Returns:
        dataframe: Dataframe having extracted email,  mobile number and website
    """
    final_data = []
    for image in images:
        data = {}
        image_name = image.get('fileName')
        start = time()
        final_text = imageProcessing(image_name)
        print("imageProcessing function",time()-start)
        contacts = re.findall(CONTACT_REGEX, final_text)
        urls = re.findall(URL_REGEX, final_text, re.IGNORECASE)
        emails = re.findall(EMAIL_REGEX, final_text, re.IGNORECASE)
    
        data["text"] = final_text
        data["email"] = " | ".join(emails)
        data["website"] = " | ".join(urls)
        data["contact"] = " | ".join(contacts)
        data["companyName"] = FetchCompanyName(final_text)
        data["id"] = image.get('id')
        data['fileName'] = image_name

        final_data.append(data)
        
    return final_data
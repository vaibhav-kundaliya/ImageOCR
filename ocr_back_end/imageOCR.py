import re
import os
import numpy as np
import easyocr
import spacy
import cv2

current_directory = os.path.dirname(os.path.realpath(__file__))
uploads_directory = os.path.join(current_directory, 'uploads')

CONTACT_REGEX = r'(?:\+|)\d(?:[\.\s-]?\d){9,11}'
URL_REGEX = r"www.*(?:in|com|org|net|dev)"
EMAIL_REGEX = r'[\d|\w]+@\w+.(?:com|in|net|org|dev)'

def FetchCompanyName(text):
    nlp = spacy.load("en_core_web_sm")
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
        text = reader.readtext(final_image, detail=0)
        if text:
                final_text.append(text[0])

    return " ".join(final_text)

def imageProcessing(image_path: str):
    reader = easyocr.Reader(lang_list=['en'])
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    resized_image = cv2.resize(image, (image.shape[1] // 3, image.shape[0] // 3))

    detect_text = reader.detect(resized_image)

    return process_cropped_images_easy_ocr(resized_image, detect_text, reader)


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
        final_text = imageProcessing(uploads_directory + "/"+image_name)
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

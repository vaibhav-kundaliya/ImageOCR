import re
import os
import pytesseract
import spacy
import cv2

current_directory = os.path.dirname(os.path.realpath(__file__))
uploads_directory = os.path.join(current_directory, 'uploads')
nlp = spacy.load("en_core_web_sm")

CONTACT_REGEX = r'(?:\+|)\d(?:[\.\s-]?\d){9,11}'
URL_REGEX = r"www.*(?:in|com|org|net|dev)"
EMAIL_REGEX = r"""(?i)(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x3f\x41-\x5a\x61-\x7e]|\\[\\x01\-\x09\x0b\x0c\x0e-\x7f])+)@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?:\.[a-z]{2,})?"""

def FetchCompanyName(text):
    doc = nlp(text)
    organizations = [ent.text for ent in doc.ents if ent.label_ == 'ORG']
    return " | ".join(organizations)

def imageProcessing(image_path: str):
    image = cv2.imread(image_path)
    resized_image = cv2.resize(image, (image.shape[1]//2, image.shape[0]//2))

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
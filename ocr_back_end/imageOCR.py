import pytesseract
from pytesseract import Output
import re
from PIL import Image, ImageOps, ImageFilter
import os
import numpy as np
import easyocr
import spacy
from sympy import expand

current_directory = os.path.dirname(os.path.realpath(__file__))
uploads_directory = os.path.join(current_directory, 'uploads')
nlp = spacy.load("en_core_web_sm")
CONTACT_REGEX = r'/^(\+\d{2}[-\s]?)?(\d{4}|\d{3})[-\s]?(\d{2,3}[-\s]?\d{2,3}[-\s]?\d{2,3}|\d{10})$/'
URL_REGEX = r"\s\w+\.(?:com|in|net|org)|www\.\w+\.(?:com|in|net|org)"
EMAIL_REGEX = r'[\d|\w]+@\w+.(?:com|in|net|org)'
custom_oem_psm_config = r'--psm 11 --oem 3'

def FetchCompanyName(text):
    doc = nlp(text)
    organizations = [ent.text for ent in doc.ents if ent.label_ == 'ORG']
    print(organizations)
    return "|".join(organizations)


def extractText(image):
        
    img_resized = image.resize((image.height//2, image.width//2))
    gray_img = img_resized.convert("L")
    inverted_img = ImageOps.invert(gray_img)
    try:
        osddata = pytesseract.image_to_osd(inverted_img, output_type=Output.DICT, config=r'-c min_characters_to_try=5')
        inverted_img = inverted_img.rotate(osddata['orientation'], expand=True)
    except Exception as exe:
        print("Error in Image Rotation", exe)

    reader = easyocr.Reader(lang_list=['en'])
    result = reader.detect(np.array(inverted_img, dtype=np.uint8))

    listoftext = " "
    for i in result[0][0]:
        cropped_part = inverted_img.crop((i[0], i[2], i[1], i[3]))
        edge_enh = cropped_part.filter(ImageFilter.EDGE_ENHANCE)
        temp = pytesseract.image_to_data(edge_enh, config=custom_oem_psm_config, output_type=Output.DICT)
        temp = " ".join(temp['text'])
        listoftext += " " + temp
    
    return listoftext

def imageOCR(images):
    """Extract text from given list of images

    Args:
        images (list): list of path of images

    Returns:
        dataframe: Dataframe having extracted email,  mobile number and website
    """
    final_data = []
    for image in images:
        data = {}
        img = Image.open(uploads_directory+"/"+image['fileName'])
        print(np.array(img).shape)
        
        final_text = extractText(img)

        contacts = re.findall(CONTACT_REGEX, final_text)
        urls = re.findall(URL_REGEX, final_text, re.IGNORECASE)
        emails = re.findall(EMAIL_REGEX, final_text, re.IGNORECASE)
    
        data["email"] = " | ".join(emails)
        data["website"] = " | ".join(urls)
        data["contact"] = " | ".join(contacts)
        data["companyName"] = FetchCompanyName(final_text)
        data["id"] = image['id']
        data['fileName'] = image['fileName']

        final_data.append(data)
        
    return final_data

import pytesseract
from pytesseract import Output
import re
import pandas as pd
from PIL import Image

CONTACT_REGEX = r'\+\d{2}(?:\s|-)?(?:\d{2,4}(?:\s|-)?){2,3}\d{2,4}'
URL_REGEX = r"\s\w+\.(?:com|in|net|org)|www\.\w+\.(?:com|in|net|org)"
EMAIL_REGEX = r'[\d|\w]+@\w+.(?:com|in|net|org)'

def imageOCR(images):
   """Extract text from given list of images

   Args:
       images (list): list of path of images

   Returns:
       dataframe: Dataframe having extracted email,  mobile number and website
   """
   custom_oem_psm_config = r'--oem 2 --psm 12 --tessdata-dir tessdata'
   final_data = []
   for image in images:
      data = {}
      img = Image.open("uploads/"+image['fileName'])
      text = pytesseract.image_to_data(img, config=custom_oem_psm_config, output_type=Output.DICT)
      final_text = " ".join(text['text'])

      contacts = re.findall(CONTACT_REGEX, final_text)
      urls = re.findall(URL_REGEX, final_text, re.IGNORECASE)
      emails = re.findall(EMAIL_REGEX, final_text, re.IGNORECASE)
   
      data["text"] = final_text
      data["email"] = ",".join(emails)
      data["website"] = ",".join(urls)
      data["contact"] = ",".join(contacts)
      data["id"] = image['id']
      data['fileName'] = image['fileName']

      final_data.append(data)

   df = pd.DataFrame(final_data)
   df.to_excel("example.xlsx", index=False)
   return final_data


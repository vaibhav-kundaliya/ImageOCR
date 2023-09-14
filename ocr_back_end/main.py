import streamlit as st
from PIL import Image
from imageOCR import imageOCR
from zipfile import ZipFile, is_zipfile
import os
import random as rand

def extractData(uploaded_file, type):
   """It creates list of path of images as per
      respective data type.

   Args:
       uploaded_file (UploadedFile): uploaded file
       type (string): uploaded file type

   Returns:
       dataframe: Dataframe having extracted email,  mobile number and website
   """
   if type=="Images" :
      data = imageOCR(uploaded_file)

   elif is_zipfile(uploaded_file):
      with ZipFile(uploaded_file, 'r') as zip:
         zip.extractall("temp_imgs/")

      images = os.listdir("temp_imgs/")
      for i in range(len(images)):
         images[i] = "temp_imgs/"+images[i]
      
      data = imageOCR(images)
      
      for i in range(len(images)):
         os.remove(images[i])

   return data

@st.cache_data
def download_excel(file_name):
   """It reads data in binary format from generated excel file 
      and after that it deletes the generated file. 

   Args:
       file_name (string): generated excel file

   Returns:
       binary string: binary formed data
   """
   with open(file_name, "rb") as template_file:
      template_byte = template_file.read()

   os.remove(file_name)
   return template_byte



st.title("Fetch text from your image...")

type = st.radio(
    "Upload type...",
    ["Images", "Zip file"],
    captions = ["Upload one or multiple images", "upload single zip file"])

file_name = ""
try:
   with st.form("my-form", clear_on_submit=True):
      label = "Upload zip file or single image file"
      if type == "Images":
         uploaded_file = st.file_uploader(label, type=["jpg", "png", "jpeg"], accept_multiple_files=True, key=None, help=None, on_change=None, args=None, kwargs=None, disabled=False, label_visibility="visible")
      else:
         uploaded_file = st.file_uploader(label, type=["zip"], label_visibility="visible")

      submit_btn = st.form_submit_button("Extract Text")

      if submit_btn:
            if uploaded_file:
               with st.spinner("Wait for some time... magic will happen :magic_wand:") as s:
                  random_id = rand.randint(10000, 99999)
                  file_name = str(random_id)+'.xlsx'

                  data = extractData(uploaded_file, type)   
                  data.to_excel(file_name, index=False)
                  
            else:
               st.error("Upload atleast one file :cry:")

   if file_name:
      st.success("Hurray :tada: Text fetched from images")
      data = download_excel(file_name)
      st.download_button(label="Click to Download Excel file",
                     data=data,
                     file_name=file_name,
                     mime='application/octet-stream')
      
except Exception as e:
   st.error(e)

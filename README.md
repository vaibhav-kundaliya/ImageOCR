# Buisness Card OCR
This application helps user to extract company name, website, email and phone number. And also user can conver these data into excel sheet.

The backend of application is made up of **Python Flask** and the frontend is made up of **ReactJs**.

## Install
Due to limitation of resourses, You have to install backend saperatly for usage. 

#### Backend
**Step 0:** Install python with version >=3.7 if not

**Step 1:** Clone this repo
<code>git clone https://github.com/vaibhav-kundaliya/ImageOCR.git</code>

**Step 2:** Install tesseract-ocr
<code>Follow given instructions https://linuxhint.com/install-tesseract-windows/</code>

**Step 3:** Go to the ocr_back_end/ directory
<code>cd ocr_back_end/</code>

**Step 4:** Create virtual environment
<code>python -m venv .env</code>

**Step 5:** Activate virtual environment
<code>.env\Script\activate</code>

**Step 6:** Install required packages
<code>pip install -r requirements.txt</code>

**Step 7:** Run following command
<code>python app.py</code>

Now you backend is running...
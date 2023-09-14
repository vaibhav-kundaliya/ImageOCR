from flask import Flask, jsonify, request, send_file, make_response
from flask_cors import CORS
import os
from imageOCR import imageOCR

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'], supports_credentials=True)


@app.route("/saveImage", methods=["POST"])
def saveImage():
    file = request.files['file']
    file.save("uploads/" + file.filename)
    
    return make_response('Image is uploaded', 200)

@app.route("/getImage/<file>", methods=["GET"])
def sendImage(file):
    return send_file("uploads/"+file, mimetype='image/jpeg')

@app.route("/removeImage/<file>", methods=["GET"])
def removeImage(file):
    os.remove("uploads/"+file)
    return {"status": "image removed"}

@app.route("/extractText", methods=["POST"])
def extractText():
    files = request.json
    response_data = imageOCR(files)
    return make_response(jsonify(response_data), 200)

@app.route("/downloadFile", methods=["GET"])
def downloadFile():
    return send_file("example.xlsx", as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)

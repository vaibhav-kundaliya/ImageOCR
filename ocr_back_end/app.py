from flask import Flask, jsonify, request, send_file, make_response
from flask_cors import CORS
import os
from imageOCR import imageOCR

app = Flask(__name__)
CORS(app, supports_credentials=True)

current_directory = os.path.dirname(os.path.realpath(__file__))
uploads_directory = os.path.join(current_directory, "uploads")
if not os.path.exists(uploads_directory):
    os.makedirs(uploads_directory)


@app.route("/saveImage", methods=["POST"])
def saveImage():
    file = request.files["file"]
    try:
        if file.content_type in ["image/jpeg", "image/jpg", "image/png"]:
            file.save(uploads_directory + "/" + file.filename)
            return make_response("Image is uploaded", 200)
        else:
            return make_response("Invalid file type of", 403)
    except Exception as exe:
        print(exe)
        return make_response("Server error", 500)


@app.route("/getImage/<file>", methods=["GET"])
def sendImage(file):
    try:
        return send_file(uploads_directory + "/" + file, mimetype="image/jpeg")
    except Exception as exe:
        print(exe)
        return make_response(" Image is not exist", 403)


@app.route("/removeImage/<file>", methods=["GET"])
def removeImage(file):
    try:
        os.remove(uploads_directory + "/" + file)
        return make_response("Image is removed", 200)
    except Exception as exe:
        print(exe)
        return make_response(" Image is not exist", 403)


@app.route("/removeAllImages", methods=["GET"])
def removeAllImages():
    try:
        files = os.listdir(uploads_directory)
        for file in files:
            os.remove(uploads_directory + "/" + file)
        return make_response("Images are removed", 200)
    except Exception as exe:
        print(exe)
        return make_response(" Something went wrong ", 500)


@app.route("/extractText", methods=["POST"])
def extractText():
    files = request.json
    if len(files) == 0:
        return make_response("No images are uploaded", 403)
    try:
        response_data = imageOCR(files)

        if response_data:
            return make_response(jsonify(response_data), 200)
        else:
            return make_response("Something went wrong", 500)
    except Exception as exe:
        print(exe)
        return make_response("Something went wrong", 500)


@app.route("/downloadFile", methods=["GET"])
def downloadFile():
    try:
        return send_file(current_directory + "/example.csv", as_attachment=True)
    except Exception as exe:
        print(exe)
        return make_response(" You haven't uploaded images", 403)


if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000, debug=True)

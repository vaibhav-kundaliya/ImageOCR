from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/saveImage", methods=["POST"])
def saveImage():
    files = request.files
    for file in files:
        print(files[file])
        files[file].save("uploads/" + files[file].filename)

    return {"status": "success"}

@app.route("/getImage/<id>", methods=["GET"])
def sendImage(id):
    print(id)
    return {"status": "image send"}

@app.route("/removeImage/<id>", methods=["GET"])
def removeImage(id):
    print(id)
    return {"status": "image removed"}


if __name__ == "__main__":
    app.run(debug=True)

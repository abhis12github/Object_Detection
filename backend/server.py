import os
import cv2
import base64
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from detect import detectImage
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads/'
MODIFIED_FOLDER = 'modified/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MODIFIED_FOLDER'] = MODIFIED_FOLDER

def create_upload_folder_if_not_exists():
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

def create_modified_folder_if_not_exists():
    if not os.path.exists(app.config['MODIFIED_FOLDER']):
        os.makedirs(app.config['MODIFIED_FOLDER'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/upload", methods=["POST"])
def upload_file():
    create_upload_folder_if_not_exists()

    if 'file' not in request.files:
        response = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        response.status_code = 400  # Bad Request
        return response
    
    file = request.files['file']
    if file.filename == '':
        response = jsonify({
            "message": "No file entered",
            "status": 'failed'
        })
        response.status_code = 400  # Bad Request
        return response

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        uploaded_image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        with open(uploaded_image_path, 'rb') as image_file:
            uploaded_image = base64.b64encode(image_file.read()).decode('utf-8')

        image,objects_detected = detectImage(uploaded_image_path)

        modified_filename = "modified_" + filename
        modified_path = os.path.join(app.config['MODIFIED_FOLDER'], modified_filename)
        cv2.imwrite(modified_path, image)

        with open(modified_path, 'rb') as modified_image_file:
            encoded_modified_image = base64.b64encode(modified_image_file.read()).decode('utf-8')

        response = jsonify({
            "message": "Image successfully uploaded and modified",
            "status": "success",
            "modified_image": encoded_modified_image,
            "uploaded_image": uploaded_image,
            "objects_detected":objects_detected
        })
        response.status_code = 201  # Created
        return response
    else:
        response = jsonify({
            "message": "File type is not allowed",
            "status": "failed"
        })
        response.status_code = 400  # Bad Request
        return response

if __name__ == "__main__":
    app.run(debug=True)

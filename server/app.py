from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

model = load_model('../model_training/models/mnist_prediction.keras')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if 'image' not in data:
        return jsonify({'error': 'No image provided'}), 400

    try:
        image_data = np.array(data['image']).reshape(1, 28, 28, 1) / 255.0
        prediction = model.predict(image_data)
        predicted_digit = int(np.argmax(prediction))
        return jsonify({'prediction': predicted_digit})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

🎨 **MNIST Digit Recognition DL App**  
This project classifies handwritten digits (0–9) using a deep learning model trained on the MNIST dataset. Built with TensorFlow/Keras, the model takes grayscale images as input and predicts the corresponding digit. It includes model training, API deployment with Flask, and an interactive ReactJS frontend for real-time digit drawing and prediction.

---

📂 **Dataset**  
The project uses the MNIST dataset, a widely used benchmark in computer vision consisting of 28x28 grayscale images of handwritten digits. The dataset contains 60,000 training images and 10,000 test images. Each image is labeled with the correct digit (0–9) and is preloaded from TensorFlow's datasets.

---

🔧 **Tech Stack**  
- **Data Analysis & Visualization**: NumPy, Pandas, Matplotlib  
- **Modeling**: TensorFlow, Keras  
- **Backend**: Flask, Flask-CORS  
- **Frontend**: ReactJS, Axios, HTML5 Canvas  

---

📁 **Project Structure**  
- **model_training/**: Contains Jupyter notebooks for data loading, preprocessing, and CNN model training  
- **models/**: Stores the trained `.keras` model used for prediction  
- **backend/**: Flask API that loads the model and handles digit prediction requests  
- **frontend/**: ReactJS web app that allows users to draw digits and see real-time predictions  
- **README.md**: Project documentation  

---

📊 **1. Data Exploration & Preprocessing**  
- Display sample digit images using Matplotlib  
- Normalize image pixel values to a [0, 1] range  
- One-hot encode the digit labels for multiclass classification  
- Reshape image data to fit the CNN input format  
- Split data into training and test sets  

---

🤖 **2. Model Training (TensorFlow/Keras)**  
A Convolutional Neural Network (CNN) is trained to recognize digits.  
- Input layer receives 28x28 grayscale images  
- Convolution and MaxPooling layers extract features  
- Flatten and Dense layers classify the digit  
- Output layer uses softmax activation to predict one of 10 digits  
- Compiled with categorical cross-entropy loss and optimized with Adam  
- Trained with early stopping for improved generalization  

---

🧪 **3. Model Evaluation**  
- Visualization of training and validation loss/accuracy curves  
- Evaluation on test data to measure model accuracy  
- Confusion matrix and classification report to analyze performance per class  

---

🌐 **4. Flask Backend**  
- Loads the trained model on server startup  
- Provides a REST API endpoint `/predict`  
- Accepts a 28x28 flattened grayscale image via JSON  
- Normalizes and reshapes input, runs prediction  
- Returns the predicted digit as a JSON response  

---

💻 **5. React Frontend**  
- HTML5 canvas interface for users to draw a digit  
- Downscales drawing to 28x28 format  
- Sends the pixel data to the backend via Axios  
- Displays the predicted digit returned by the Flask API  
- Clean, responsive design with interactive buttons and input preview  

---

🚀 **Getting Started**  
1. Clone the repository  
2. Train the model using the Jupyter notebook or use the provided model file  
3. Start the Flask backend to serve predictions  
4. Launch the React frontend  
5. Access the app in your browser at `http://localhost:3000`  

---

🛠 **Technologies Used**  
| Layer         | Tools                              |  
|---------------|-------------------------------------|  
| Data/EDA      | NumPy, Pandas, Matplotlib           |  
| Modeling      | TensorFlow, Keras                   |  
| Backend/API   | Flask, Flask-CORS, NumPy            |  
| Frontend      | ReactJS, Axios, HTML5 Canvas        |  

---

🧪 **Sample Prediction**  
The user draws a digit (0–9) on the web canvas. The app resizes and preprocesses the drawing, sends it to the Flask API, and receives a prediction. The predicted digit is displayed immediately with a preview of the processed input.

---

🎉 **Conclusion**  
This project demonstrates a complete deep learning pipeline — from model training to deployment in an interactive web application. It allows users to explore and test handwritten digit recognition through a clean, real-time interface.

Happy building! 🚀

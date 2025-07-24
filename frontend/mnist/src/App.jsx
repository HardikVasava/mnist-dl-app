import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState(null);
  const [imageDataURL, setImageDataURL] = useState("");

  useEffect(() => {
    clearCanvas();
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a1a1a"; // dark gray background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
    setImageDataURL("");
  };

  const getImageData = () => {
    const canvas = canvasRef.current;

    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = 28;
    resizedCanvas.height = 28;
    const resizedCtx = resizedCanvas.getContext("2d");
    resizedCtx.drawImage(canvas, 0, 0, 28, 28);

    const imgData = resizedCtx.getImageData(0, 0, 28, 28).data;
    const grayscaleData = [];
    for (let i = 0; i < imgData.length; i += 4) {
      grayscaleData.push(imgData[i]); // red channel as grayscale
    }

    setImageDataURL(resizedCanvas.toDataURL());
    return grayscaleData;
  };

  const handlePredict = async () => {
    const pixelArray = getImageData();

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        image: pixelArray,
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error(err);
    }
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const x = e.nativeEvent.clientX - rect.left;
    const y = e.nativeEvent.clientY - rect.top;

    ctx.fillStyle = "#e0e0e0"; // soft white
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#f0f0f0",
        padding: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
          letterSpacing: "1px",
          textShadow: "0 0 8px #3b82f6",
        }}
      >
        MNIST Digit Predictor
      </h1>

      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        onMouseMove={(e) => e.buttons === 1 && draw(e)}
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.6)",
          cursor: "crosshair",
          marginBottom: "1.5rem",
          border: "2px solid #3b82f6",
          touchAction: "none",
        }}
      />

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <button
          onClick={handlePredict}
          style={{
            padding: "0.6rem 1.8rem",
            background:
              "linear-gradient(135deg, #3b82f6, #2563eb)",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(59,130,246,0.6)",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(135deg, #2563eb, #3b82f6)")}
          onMouseLeave={e => (e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)")}
        >
          Predict
        </button>

        <button
          onClick={clearCanvas}
          style={{
            padding: "0.6rem 1.8rem",
            background:
              "linear-gradient(135deg, #ef4444, #dc2626)",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(239,68,68,0.6)",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(135deg, #dc2626, #ef4444)")}
          onMouseLeave={e => (e.currentTarget.style.background = "linear-gradient(135deg, #ef4444, #dc2626)")}
        >
          Clear
        </button>
      </div>

      {imageDataURL && (
        <div
          style={{
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "#3b82f6",
            }}
          >
            28x28 Input Preview
          </h2>
          <img
            src={imageDataURL}
            alt="input preview"
            style={{
              borderRadius: "8px",
              border: "1px solid #3b82f6",
              filter: "drop-shadow(0 0 3px #3b82f6)",
              imageRendering: "pixelated",
              width: "112px",
              height: "112px",
            }}
          />
        </div>
      )}

      {prediction !== null && (
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          Predicted Digit: <span>{prediction}</span>
        </h2>
      )}
    </div>
  );
}

export default App;

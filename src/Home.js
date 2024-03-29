import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [classificationResult, setClassificationResult] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    } else {
      setSelectedFile(null);
      setPreviewUrl('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setClassificationResult({
        confidence: data.confidence,
        predictedClass: data.predicted_class,
      });
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setClassificationResult({});
    setPreviewUrl('');
    fileInputRef.current.value = ''; 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Varicose Veins Classifier</h1>
        <div className="content">
          <div className="instructions">
            <p>Upload an image to classify whether it shows varicose veins, spider veins, or normal legs.</p>
          </div>
          <div className="upload">
            <form onSubmit={handleSubmit}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="imageInput" />
              <button type="submit" className="classifyButton">Classify Image</button>
              <button type="button" onClick={handleClear} className="clearButton">Clear</button>
            </form>
            {previewUrl && <img src={previewUrl} alt="Preview" className="imagePreview" />}
          </div>
          <div className="results">
            {classificationResult.predictedClass && (
                <div className="resultContainer">
                <p>Classification Result: {classificationResult.predictedClass}</p>
                <p>Confidence Level: {classificationResult.confidence.toFixed(2)}</p> 
                <button type="button" onClick={() => navigate("/treatment")} className="viewTreatmentButton">
                  View Treatment
                </button>
          </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;

import React from 'react';
import { useNavigate } from "react-router-dom";

function Treatment() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Treatment Recommendations</h2>
      <p>This page contains information about treatments...</p>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
}

export default Treatment;

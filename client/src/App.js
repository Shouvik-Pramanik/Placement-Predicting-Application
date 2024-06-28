import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '',
    Stream: '',
    Internships: '',
    CGPA: '',
    Hostel: '',
    HistoryOfBacklogs: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData); // Debugging statement
    axios.post('http://127.0.0.1:5000/predict', formData)
      .then(response => {
        console.log('Response:', response.data); // Debugging statement
        setPrediction(response.data.prediction);
        setError(null);
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
        setError('There was an error making the request!');
      });
  };

  return (
    <div className="App">
      <h1>College Placement Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="number" name="Age" onChange={handleChange} />
        </label>
        <br />
        <label>
          Gender:
          <select name="Gender" onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Stream:
          <select name="Stream" onChange={handleChange}>
            <option value="">Select</option>
            <option value="Electronics And Communication">Electronics And Communication</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Civil">Civil</option>
          </select>
        </label>
        <br />
        <label>
          Internships:
          <input type="number" name="Internships" onChange={handleChange} />
        </label>
        <br />
        <label>
          CGPA:
          <input type="number" name="CGPA" step="0.01" onChange={handleChange} />
        </label>
        <br />
        <label>
          Hostel:
          <input type="number" name="Hostel" onChange={handleChange} />
        </label>
        <br />
        <label>
          History of Backlogs:
          <input type="number" name="HistoryOfBacklogs" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>
      {prediction !== null && (
        <h2>Prediction: {prediction === 1 ? 'Placed' : 'Not Placed'}</h2>
      )}
      {error && (
        <h2 style={{ color: 'red' }}>{error}</h2>
      )}
    </div>
  );
}

export default App;

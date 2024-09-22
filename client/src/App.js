import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [getResponse, setGetResponse] = useState(null);
  const [postResponse, setPostResponse] = useState(null);

  // Function to handle GET request
  const handleGetRequest = async () => {
    try {
      const response = await axios.get('http://localhost:4040/bfhl');
      setGetResponse(response.data);
    } catch (error) {
      console.error('Error making GET request', error);
    }
  };

  // Function to handle POST request
  const handlePostRequest = async () => {
    const postData = {
      full_name: 'John Doe',
      dob: '1990-01-01',
      base64File: '', // Your base64 encoded string here
      alphabet: 'abc123',
    };

    try {
      const response = await axios.post('http://localhost:4040/bfhl', postData);
      setPostResponse(response.data);
    } catch (error) {
      console.error('Error making POST request', error);
    }
  };

  return (
    <div>
      <h1>Express-React Client</h1>

      {/* Button to trigger GET request */}
      <button onClick={handleGetRequest}>Send GET Request</button>
      {getResponse && (
        <div>
          <h3>GET Response:</h3>
          <pre>{JSON.stringify(getResponse, null, 2)}</pre>
        </div>
      )}

      {/* Button to trigger POST request */}
      <button onClick={handlePostRequest}>Send POST Request</button>
      {postResponse && (
        <div>
          <h3>POST Response:</h3>
          <pre>{JSON.stringify(postResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;


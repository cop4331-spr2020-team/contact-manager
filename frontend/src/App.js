import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {


  axios.get(`api/version`)
  .then((resp) => {
    console.log("Version ok!" + resp.data)
  })
  .catch(error => {
    console.log(`Axios error: ${error}`);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. This is a test.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

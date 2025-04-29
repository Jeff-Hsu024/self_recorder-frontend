import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RedirectPage from './components/RedirectPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/redirect" element={<RedirectPage />} />
          <Route path="/" element={
            <header className="App-header">
              <p>
                Welcome to Self Recorder!
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
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

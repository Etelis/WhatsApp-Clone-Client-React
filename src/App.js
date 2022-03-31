import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import './App.css';

function App() {
  const [user, setUser] = useState("null");
  return (
    <div className="app">
      {!user ? (
        <h1> LOG DA FUCK IN</h1>
      ) : (
        <div className="app_body"> 
        <Router>
          <Routes>
            <Route path="/rooms/:roomId" element={[<Sidebar />, <Chat />]} />
            <Route path="/app" element={[<Sidebar />, <Chat />]} />
            <Route path="/" element={<h1> Home Screen </h1>} />
          </Routes>
        </Router>
        </div>
      )}
      </div>
  );
}

export default App;
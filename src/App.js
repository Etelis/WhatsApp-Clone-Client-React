import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login_2 from './Login';
import { useStateValue } from './StateProvider';


function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login_2 />
      ) : (
        <div className="app_body"> 
        <Router>
          <Routes>
            <Route path="/rooms/:roomId" element={[<Sidebar />, <Chat />]} />
            <Route path="/" element={[<Sidebar />]} />
          </Routes>
        </Router>
        </div>
      )}
      </div>
  );
}

export default App;
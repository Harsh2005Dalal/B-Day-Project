import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add quiz pages like <Route path="/quiz/1" element={<Quiz1 />} /> later */}
    </Routes>
  </BrowserRouter>
);
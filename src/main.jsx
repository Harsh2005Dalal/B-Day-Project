import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './App';
import {QuizProvider} from './context/QuizContext'

import QuestionOne from './pages/QuizPage1.jsx'
import QuestionTwo from './pages/p2.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <QuizProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/1" element={<QuestionOne />} />
      <Route path="/quiz/2" element={<QuestionTwo />} />
      {/* Add quiz pages like <Route path="/quiz/1" element={<Quiz1 />} /> later */}
    </Routes>
    </QuizProvider>
  </BrowserRouter>
);
import { createContext, useState } from 'react';
import react from 'react'

// ✅ Export the context
export const QuizContext = createContext();

// ✅ Export the provider
export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const incrementScore = () => setScore(prev => prev + 1);
  const incrementAttempts = () => setAttempts(prev => prev + 1);

  return (
    <QuizContext.Provider value={{
      score,
      attempts,
      incrementScore,
      incrementAttempts
    }}>
      {children}
    </QuizContext.Provider>
  );
};

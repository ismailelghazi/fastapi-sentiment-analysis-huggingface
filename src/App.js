import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Sentiment from './pages/Sentiment';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si un token existe
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ?
              <Navigate to="/sentiment" /> :
              <Login setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ?
              <Navigate to="/sentiment" /> :
              <Register setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route
            path="/sentiment"
            element={
              isAuthenticated ?
              <Sentiment setIsAuthenticated={setIsAuthenticated} /> :
              <Navigate to="/login" />
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
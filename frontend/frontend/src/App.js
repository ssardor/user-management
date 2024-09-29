import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import UserTable from './components/UserTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSetToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        {token ? (
          <>
            <button className="btn btn-link" onClick={handleLogout}>Logout</button>
            <Routes>
              <Route path="/" element={<UserTable token={token} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/auth" element={<Auth setToken={handleSetToken} />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
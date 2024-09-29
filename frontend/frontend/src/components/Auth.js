import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
    try {
      const res = await axios.post(url, formData);
      if (isLogin) {
        setToken(res.data.token);
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
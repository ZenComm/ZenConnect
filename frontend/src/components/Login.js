import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/api';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });
      const { token } = response.data;
      // Store the token in local storage or cookies
      localStorage.setItem('token', token);
      // Redirect to the protected route
      window.location.href = '/protected';
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </label>
          <br />
          {error && <div style={{ color: 'ed' }}>{error}</div>}
          <button type="submit">Login</button>
        </form>
        <p>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </p>
      </div>
    </div>
  );
};

export default Login;
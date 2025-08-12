import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import authService from '../services/authService';
import '../styles/auth/Login.css';

class Login extends React.Component {
  handleSubmit = async (credentials, onSuccess, onError) => {
    try {
      const message = await authService.loginUser(credentials);
      onSuccess(message);
    } catch (error) {
      onError(error);
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="card-header">
            <h2>
              <i className="fas fa-sign-in-alt me-2"></i>
              Login
            </h2>
            <p>Welcome back! Please sign in to continue.</p>
          </div>
          
          <LoginForm onSubmit={this.handleSubmit} />

          <div className="login-links">
            <p>
              Don't have an account?{' '}
              <Link to="/register">Register now</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login; 
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/register/RegisterForm';
import authService from '../services/authService';
import '../styles/auth/Register.css';

class Register extends React.Component {
  handleSubmit = async (userData, onSuccess, onError) => {
    try {
      const message = await authService.registerUser(userData);
      onSuccess(message);
    } catch (error) {
      onError(error);
    }
  };

  render() {
    return (
      <div className="register-container">
        <div className="register-card">
          <div className="card-header">
            <h2>
              <i className="fas fa-user-plus me-2"></i>
              Register
            </h2>
            <p>Create a new account to start managing your tasks.</p>
          </div>
          
          <RegisterForm onSubmit={this.handleSubmit} />

          <div className="register-links">
            <p>
              Already have an account?{' '}
              <Link to="/login">Login now</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register; 
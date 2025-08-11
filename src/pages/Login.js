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
              Đăng nhập
            </h2>
            <p>Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.</p>
          </div>
          
          <LoginForm onSubmit={this.handleSubmit} />

          <div className="login-links">
            <p>
              Chưa có tài khoản?{' '}
              <Link to="/register">Đăng ký ngay</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login; 
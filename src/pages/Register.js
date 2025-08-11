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
              Đăng ký
            </h2>
            <p>Tạo tài khoản mới để bắt đầu quản lý công việc của bạn.</p>
          </div>
          
          <RegisterForm onSubmit={this.handleSubmit} />

          <div className="register-links">
            <p>
              Đã có tài khoản?{' '}
              <Link to="/login">Đăng nhập ngay</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register; 
import React from 'react';
import { Link } from 'react-router-dom';
import { findUserByEmail, saveUser } from '../utils/storage';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    success: '',
    isLoading: false
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: '',
      success: ''
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email.trim() || !password.trim()) {
      this.setState({ error: 'Vui lòng nhập đầy đủ thông tin!' });
      return;
    }

    this.setState({ isLoading: true, error: '', success: '' });

    // Simulate API call
    setTimeout(() => {
      const user = findUserByEmail(email);
      
      if (user && user.password === password) {
        saveUser(user);
        this.setState({ 
          success: 'Đăng nhập thành công! Đang chuyển hướng...',
          isLoading: false 
        });
        
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        this.setState({ 
          error: 'Email hoặc mật khẩu không đúng!',
          isLoading: false 
        });
      }
    }, 1000);
  }

  render() {
    const { email, password, error, success, isLoading } = this.state;

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
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                <i className="fas fa-check-circle me-2"></i>
                {success}
              </div>
            )}

            <form className="login-form" onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="fas fa-envelope me-2"></i>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <i className="fas fa-lock me-2"></i>
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="login-loading">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span>Đang đăng nhập...</span>
                  </div>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Đăng nhập
                  </>
                )}
              </button>
            </form>

            <div className="login-links">
              <p>
                Chưa có tài khoản?{' '}
                <Link to="/register">Đăng ký ngay</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login; 
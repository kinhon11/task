import React from 'react';
import { Link } from 'react-router-dom';
import { checkUserExists, addUser } from '../utils/storage';
import '../styles/Register.css';

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const { name, email, password, confirmPassword } = this.state;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      this.setState({ error: 'Vui lòng nhập đầy đủ thông tin!' });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: 'Mật khẩu phải có ít nhất 6 ký tự!' });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: 'Mật khẩu xác nhận không khớp!' });
      return;
    }

    this.setState({ isLoading: true, error: '', success: '' });

    // Simulate API call
    setTimeout(() => {
      if (checkUserExists(email)) {
        this.setState({ 
          error: 'Email đã được sử dụng! Vui lòng chọn email khác.',
          isLoading: false 
        });
        return;
      }

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        password,
        createdAt: new Date().toISOString()
      };

      addUser(newUser);
      this.setState({ 
        success: 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.',
        isLoading: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }, 1000);
  }

  render() {
    const { name, email, password, confirmPassword, error, success, isLoading } = this.state;

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

            <form className="register-form" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      <i className="fas fa-user me-2"></i>
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={this.handleInputChange}
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
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
                      placeholder="Nhập email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
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
                      placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      <i className="fas fa-lock me-2"></i>
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={this.handleInputChange}
                      placeholder="Nhập lại mật khẩu"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="register-loading">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span>Đang đăng ký...</span>
                  </div>
                ) : (
                  <>
                    <i className="fas fa-user-plus me-2"></i>
                    Đăng ký
                  </>
                )}
              </button>
            </form>

            <div className="register-links">
              <p>
                Đã có tài khoản?{' '}
                <Link to="/login">Đăng nhập ngay</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register; 
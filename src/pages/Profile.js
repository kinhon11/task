import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, removeCurrentUser } from '../utils/storage';
import '../styles/Profile.css';

class Profile extends React.Component {
  state = {
    user: null,
    isLoggedIn: false
  };

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = () => {
    const user = getCurrentUser();
    if (user) {
      this.setState({ 
        user,
        isLoggedIn: true 
      });
    } else {
      window.location.href = '/login';
    }
  }

  handleLogout = () => {
    removeCurrentUser();
    this.setState({ 
      user: null, 
      isLoggedIn: false 
    });
    window.location.href = '/login';
  }

  render() {
    const { user, isLoggedIn } = this.state;

    if (!isLoggedIn || !user) {
      return (
        <div className="profile-loading">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    const joinDate = new Date(user.createdAt);
    const daysSinceJoin = Math.floor((new Date() - joinDate) / (1000 * 60 * 60 * 24));

    return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="container">
            <div className="profile-avatar">
              <i className="fas fa-user"></i>
            </div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <p className="profile-join-date">
              Tham gia từ {joinDate.toLocaleDateString('vi-VN')} ({daysSinceJoin} ngày trước)
            </p>
          </div>
        </div>

        <div className="container">
          <div className="profile-content">
            <div className="row">
              <div className="col-md-8">
                <div className="profile-card">
                  <div className="card-header">
                    <i className="fas fa-info-circle"></i>
                    <h5>Thông tin cá nhân</h5>
                  </div>
                  <div className="card-body">
                    <div className="profile-info-item">
                      <div className="profile-info-icon">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="profile-info-content">
                        <div className="profile-info-label">Họ và tên</div>
                        <div className="profile-info-value">{user.name}</div>
                      </div>
                    </div>

                    <div className="profile-info-item">
                      <div className="profile-info-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="profile-info-content">
                        <div className="profile-info-label">Email</div>
                        <div className="profile-info-value">{user.email}</div>
                      </div>
                    </div>

                    <div className="profile-info-item">
                      <div className="profile-info-icon">
                        <i className="fas fa-calendar"></i>
                      </div>
                      <div className="profile-info-content">
                        <div className="profile-info-label">Ngày tham gia</div>
                        <div className="profile-info-value">
                          {joinDate.toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="profile-info-item">
                      <div className="profile-info-icon">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="profile-info-content">
                        <div className="profile-info-label">Thời gian sử dụng</div>
                        <div className="profile-info-value">
                          {daysSinceJoin} ngày
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="profile-stats">
                  <div className="row">
                    <div className="col-6">
                      <div className="profile-stat-card">
                        <div className="profile-stat-icon">
                          <i className="fas fa-tasks"></i>
                        </div>
                        <div className="profile-stat-number">0</div>
                        <div className="profile-stat-label">Tổng công việc</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="profile-stat-card">
                        <div className="profile-stat-icon">
                          <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="profile-stat-number">0</div>
                        <div className="profile-stat-label">Đã hoàn thành</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="profile-stat-card">
                        <div className="profile-stat-icon">
                          <i className="fas fa-clock"></i>
                        </div>
                        <div className="profile-stat-number">0</div>
                        <div className="profile-stat-label">Đang thực hiện</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="profile-stat-card">
                        <div className="profile-stat-icon">
                          <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <div className="profile-stat-number">0</div>
                        <div className="profile-stat-label">Quá hạn</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <div className="row">
                <div className="col-md-6">
                  <Link to="/" className="btn btn-outline-primary w-100 mb-2">
                    <i className="fas fa-home me-2"></i>
                    Về trang chủ
                  </Link>
                </div>
                <div className="col-md-6">
                  <button 
                    className="btn btn-danger w-100 mb-2"
                    onClick={this.handleLogout}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile; 
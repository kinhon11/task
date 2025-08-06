import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, removeCurrentUser } from '../utils/storage';

class Navbar extends React.Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    this.checkLoginStatus();
    // Check login status every 2 seconds
    this.interval = setInterval(this.checkLoginStatus, 2000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  checkLoginStatus = () => {
    const user = getCurrentUser();
    const isLoggedIn = !!user;
    if (this.state.isLoggedIn !== isLoggedIn) {
      this.setState({ isLoggedIn });
    }
  }

  handleLogout = () => {
    removeCurrentUser();
    this.setState({ isLoggedIn: false });
    window.location.href = '/';
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-tasks me-2"></i>
            Personal Task Manager
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home me-1"></i>
                  Trang chủ
                </Link>
              </li>
            </ul>
            
            <ul className="navbar-nav">
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <i className="fas fa-sign-in-alt me-1"></i>
                      Đăng nhập
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <i className="fas fa-user-plus me-1"></i>
                      Đăng ký
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <i className="fas fa-user me-1"></i>
                      Hồ sơ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button 
                      className="nav-link btn btn-link" 
                      onClick={this.handleLogout}
                      style={{ border: 'none', background: 'none' }}
                    >
                      <i className="fas fa-sign-out-alt me-1"></i>
                      Đăng xuất
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar; 
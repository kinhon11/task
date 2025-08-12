import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, removeCurrentUser } from "../utils/storage";
import "../styles/Profile.css";

class Profile extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  };

  componentDidMount() {
    this.loadUserData();
    this.focusListener = () => this.loadTaskStats();
    window.addEventListener('focus', this.focusListener);
  }

  componentWillUnmount() {
    if (this.focusListener) window.removeEventListener('focus', this.focusListener);
  }

  loadUserData = () => {
    const user = getCurrentUser();
    if (user) {
      this.setState({
        user,
        isLoggedIn: true,
      }, this.loadTaskStats);
    } else {
      window.location.href = "/login";
    }
  };

  loadTaskStats = () => {
    const { user } = this.state;
    if (!user) return;
    const tasks = JSON.parse(localStorage.getItem(`tasks_${user.id}`)) || [];

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const inProgressTasks = tasks.filter(t => !t.completed).length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdueTasks = tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < today).length;

    this.setState({ totalTasks, completedTasks, inProgressTasks, overdueTasks });
  };

  handleLogout = () => {
    removeCurrentUser();
    this.setState({
      user: null,
      isLoggedIn: false,
      totalTasks: 0,
      completedTasks: 0,
      inProgressTasks: 0,
      overdueTasks: 0,
    });
    window.location.href = "/login";
  };

  render() {
    const { user, isLoggedIn, totalTasks, completedTasks, inProgressTasks, overdueTasks } = this.state;

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
    const daysSinceJoin = Math.floor(
      (new Date() - joinDate) / (1000 * 60 * 60 * 24)
    );

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
              Joined on {joinDate.toLocaleDateString("en-US")} ({daysSinceJoin}{" "}
              days ago)
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
                    <h5>Personal information</h5>
                  </div>
                  <div className="card-body">
                    <div className="profile-info-item">
                      <div className="profile-info-icon">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="profile-info-content">
                        <div className="profile-info-label">Full name</div>
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
                        <div className="profile-info-label">Join date</div>
                        <div className="profile-info-value">
                          {joinDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="profile-info-item">
                      <div className="profile-info-icon">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="profile-info-content">
                        <div className="profile-info-label">Usage time</div>
                        <div className="profile-info-value">{daysSinceJoin} days</div>
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
                        <div className="profile-stat-number">{totalTasks}</div>
                        <div className="profile-stat-label">Total tasks</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="profile-stat-card">
                        <div className="profile-stat-icon">
                          <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="profile-stat-number">{completedTasks}</div>
                        <div className="profile-stat-label">Completed</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="profile-stat-card">
                        <div className="profile-stat-icon">
                          <i className="fas fa-clock"></i>
                        </div>
                        <div className="profile-stat-number">{inProgressTasks}</div>
                        <div className="profile-stat-label">In progress</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="profile-stat-card">
                        <div className="profile-stat-icon">
                          <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <div className="profile-stat-number">{overdueTasks}</div>
                        <div className="profile-stat-label">Overdue</div>
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
                    Go to home
                  </Link>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-danger w-100 mb-2"
                    onClick={this.handleLogout}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
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

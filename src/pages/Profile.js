import React from "react";
import { getCurrentUser, removeCurrentUser } from "../utils/storage";

class Profile extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
    search: "",
    tasks: [],
  };

  componentDidMount() {
    this.loadUserData();
    this.loadTaskStats();
  }

  loadUserData = () => {
    const user = getCurrentUser();
    if (user) {
      this.setState({
        user,
        isLoggedIn: true,
      });
    } else {
      window.location.href = "/login";
    }
  };

  loadTaskStats = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const inProgressTasks = tasks.filter((t) => !t.completed).length;
    const overdueTasks = tasks.filter(
      (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    ).length;

    this.setState({
      totalTasks,
      completedTasks,
      inProgressTasks,
      overdueTasks,
      tasks,
    });
  };

  handleLogout = () => {
    removeCurrentUser();
    this.setState({
      user: null,
      isLoggedIn: false,
    });
    window.location.href = "/login";
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    const {
      user,
      isLoggedIn,

      search,
      tasks,
    } = this.state;

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

    const filteredTasks = tasks.filter(
      (task) =>
        task.title?.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="profile-container">
        <div className="container mt-4">
          <h5>Danh sách công việc của bạn</h5>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Tìm kiếm công việc..."
            value={search}
            onChange={this.handleSearchChange}
          />
          <ul className="list-group">
            {filteredTasks.length === 0 ? (
              <li className="list-group-item text-muted">
                Không có công việc nào phù hợp.
              </li>
            ) : (
              filteredTasks.map((task) => (
                <li key={task.id} className="list-group-item">
                  <strong>{task.title}</strong> - {task.description}
                  <span className="badge bg-secondary ms-2">
                    {task.completed ? "Hoàn thành" : "Chưa hoàn thành"}
                  </span>
                  {task.dueDate && (
                    <span className="badge bg-light text-dark ms-2">
                      Hạn: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Profile;

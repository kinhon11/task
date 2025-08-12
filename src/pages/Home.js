import React from "react";
import { getCurrentUser } from "../utils/storage";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import TaskFilter from "../components/tasks/TaskFilter";
import "../styles/Home.css";

class Home extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    tasks: [],
    filter: "all",
  };

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = () => {
    const user = getCurrentUser();

    if (user) {
      this.setState(
        {
          user,
          isLoggedIn: true,
        },
        () => {
          this.loadTasks();
        }
      );
    } else {
      this.setState({
        user: null,
        isLoggedIn: false,
      });
      window.location.href = "/login";
    }
  };

  loadTasks = () => {
    const { user } = this.state;

    if (user && user.id) {
      try {
        const userId = parseInt(user.id);
        const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`)) || [];
        this.setState({ tasks });
      } catch (error) {
        console.error("Error loading tasks:", error);
        this.setState({ tasks: [] });
      }
    } else {
      console.error("No user or user.id found");
    }
  };

  handleRefresh = () => {
    this.loadTasks();
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  getFilteredTasks = () => {
    const { tasks, filter } = this.state;

    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  render() {
    const { user, isLoggedIn } = this.state;
    const filteredTasks = this.getFilteredTasks();

    if (!isLoggedIn) {
      return null;
    }

    return (
      <div className="home-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="welcome-section">
                <h1>
                  <i className="fas fa-tasks me-3"></i>
                  Task Manager
                </h1>
                <p className="text-muted">
                  Welcome back, {user?.name}! Manage your tasks effectively.
                </p>
              </div>

              <TaskFilter
                tasks={this.state.tasks}
                onFilterChange={this.handleFilterChange}
              />

              <TaskForm onRefresh={this.handleRefresh} />

              <TaskList tasks={filteredTasks} onRefresh={this.handleRefresh} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

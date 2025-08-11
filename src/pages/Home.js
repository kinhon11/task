import React from 'react';
import { getCurrentUser } from '../utils/storage';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TaskFilter from '../components/tasks/TaskFilter';
import '../styles/Home.css';

class Home extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    tasks: [],
    filter: 'all'
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
      this.loadTasks();
    } else {
      this.setState({
        user: null,
        isLoggedIn: false
      });
      window.location.href = '/login';
    }
  };

  loadTasks = () => {
    const { user } = this.state;
    if (user) {
      const tasks = JSON.parse(localStorage.getItem(`tasks_${user.id}`)) || [];
      this.setState({ tasks });
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
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  render() {
    const { user, isLoggedIn, filter } = this.state;
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
                  Quản lý công việc
                </h1>
                <p className="text-muted">
                  Chào mừng trở lại, {user?.name}! Hãy quản lý công việc của bạn một cách hiệu quả.
                </p>
              </div>

              <TaskFilter 
                tasks={this.state.tasks}
                onFilterChange={this.handleFilterChange}
              />

              <TaskForm onRefresh={this.handleRefresh} />

              <TaskList 
                tasks={filteredTasks}
                onRefresh={this.handleRefresh}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home; 
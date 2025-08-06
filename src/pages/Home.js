import React from 'react';
import { getCurrentUser, getTasks, addTask, updateTask, deleteTask, toggleTaskStatus, filterTasks } from '../utils/storage';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import '../styles/Home.css';

class Home extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    showForm: false,
    editingTask: null
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

  showAddForm = () => {
    this.setState({ 
      showForm: true, 
      editingTask: null
    });
  }

  showEditForm = (task) => {
    this.setState({ 
      showForm: true, 
      editingTask: task
    });
  }

  hideForm = () => {
    this.setState({ 
      showForm: false, 
      editingTask: null
    });
  }

  handleFormSubmit = (taskData) => {
    const { editingTask, user } = this.state;

    if (editingTask) {
      // Update existing task
      updateTask(user.id, editingTask.id, taskData);
    } else {
      // Add new task
      addTask(user.id, taskData);
    }

    this.hideForm();
  }

  render() {
    const { 
      showForm, 
      editingTask,
      user,
      isLoggedIn 
    } = this.state;

    if (!isLoggedIn) {
      return (
        <div className="home-loading">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="home-container">
        <div className="home-header">
          <div className="container">
            <div className="home-welcome-section">
              <div className="welcome-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <h2>Quản lý công việc</h2>
              <p>Chào mừng {user.name}! Hãy quản lý công việc của bạn một cách hiệu quả.</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="home-actions">
            <div className="row">
              <div className="col-md-8">
                {/* TaskFilter is now included in TaskList component */}
              </div>
              <div className="col-md-4 text-end">
                <button
                  className="btn btn-primary"
                  onClick={this.showAddForm}
                >
                  <i className="fas fa-plus me-2"></i>
                  Thêm công việc mới
                </button>
              </div>
            </div>
          </div>

          {showForm && (
            <TaskForm
              task={editingTask}
              onSubmit={this.handleFormSubmit}
              onCancel={this.hideForm}
            />
          )}

          <div className="home-content">
            <TaskList
              userId={user.id}
              getTasks={getTasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              toggleTaskStatus={toggleTaskStatus}
              filterTasks={filterTasks}
              onEdit={this.showEditForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home; 
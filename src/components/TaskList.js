import React from 'react';
import '../styles/TaskList.css';
import TaskItem from './TaskItem';

class TaskList extends React.Component {
  state = {
    tasks: [],
    filteredTasks: [],
    filterStatus: 'all',
    searchTerm: ''
  };

  componentDidMount() {
    this.loadTasks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadTasks();
    }
  }

  loadTasks = () => {
    const { userId } = this.props;
    if (userId) {
      const { getTasks } = this.props;
      const tasks = getTasks(userId);
      this.setState({ 
        tasks,
        filteredTasks: tasks 
      });
    }
  }

  handleFilterChange = (filterStatus) => {
    this.setState({ filterStatus }, () => {
      this.applyFilters();
    });
  }

  handleSearchChange = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.applyFilters();
    });
  }

  applyFilters = () => {
    const { tasks, filterStatus, searchTerm } = this.state;
    const { filterTasks } = this.props;
    const filtered = filterTasks(tasks, filterStatus, searchTerm);
    this.setState({ filteredTasks: filtered });
  }

  handleToggleStatus = (taskId) => {
    const { userId, toggleTaskStatus } = this.props;
    const updatedTasks = toggleTaskStatus(userId, taskId);
    this.setState({ 
      tasks: updatedTasks,
      filteredTasks: updatedTasks 
    });
  }

  handleDeleteTask = (taskId) => {
    const { userId, deleteTask } = this.props;
    const updatedTasks = deleteTask(userId, taskId);
    this.setState({ 
      tasks: updatedTasks,
      filteredTasks: updatedTasks 
    });
  }

  render() {
    const { filteredTasks, filterStatus, searchTerm } = this.state;
    const { onEdit } = this.props;

    return (
      <div className="task-list-container">
        <div className="task-filter-section">
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="card shadow-sm task-filter-card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="searchInput" className="form-label">
                        <i className="fas fa-search me-2"></i>
                        Tìm kiếm
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="searchInput"
                        placeholder="Tìm kiếm theo tiêu đề hoặc mô tả..."
                        value={searchTerm}
                        onChange={(e) => this.handleSearchChange(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="statusFilter" className="form-label">
                        <i className="fas fa-filter me-2"></i>
                        Lọc theo trạng thái
                      </label>
                      <select
                        className="form-select"
                        id="statusFilter"
                        value={filterStatus}
                        onChange={(e) => this.handleFilterChange(e.target.value)}
                      >
                        <option value="all">Tất cả công việc</option>
                        <option value="pending">Chưa hoàn thành</option>
                        <option value="completed">Đã hoàn thành</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-5 task-list-empty">
                <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">Chưa có công việc nào</h5>
                <p className="text-muted">Hãy thêm công việc đầu tiên của bạn!</p>
              </div>
            ) : (
              <div className="task-list">
                {filteredTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={() => onEdit(task)}
                    onToggleStatus={() => this.handleToggleStatus(task.id)}
                    onDelete={() => this.handleDeleteTask(task.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TaskList; 
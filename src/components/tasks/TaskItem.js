import React from 'react';
import '../../styles/tasks/TaskItem.css';

class TaskItem extends React.Component {
  state = {
    isEditing: false,
    editTitle: this.props.task.title,
    editDescription: this.props.task.description,
    editPriority: this.props.task.priority,
    editDueDate: this.props.task.dueDate
  };

  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleSave = () => {
    const { task } = this.props;
    const { editTitle, editDescription, editPriority, editDueDate } = this.state;

    if (editTitle.trim()) {
      const updatedTask = {
        ...task,
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
        dueDate: editDueDate,
        updatedAt: new Date().toISOString()
      };

      // Update task in storage
      this.updateTaskInStorage(updatedTask);
      this.setState({ isEditing: false });
    }
  };

  handleCancel = () => {
    this.setState({
      isEditing: false,
      editTitle: this.props.task.title,
      editDescription: this.props.task.description,
      editPriority: this.props.task.priority,
      editDueDate: this.props.task.dueDate
    });
  };

  handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
      this.deleteTaskFromStorage();
    }
  };

  handleToggle = () => {
    const { task } = this.props;
    const updatedTask = {
      ...task,
      completed: !task.completed,
      updatedAt: new Date().toISOString()
    };
    this.updateTaskInStorage(updatedTask);
  };

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  updateTaskInStorage = (updatedTask) => {
    const { task } = this.props;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
      const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.id}`)) || [];
      const updatedTasks = tasks.map(t => t.id === task.id ? updatedTask : t);
      localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify(updatedTasks));
      
      // Notify parent to refresh
      if (this.props.onUpdate) {
        this.props.onUpdate();
      }
    }
  };

  deleteTaskFromStorage = () => {
    const { task } = this.props;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
      const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.id}`)) || [];
      const updatedTasks = tasks.filter(t => t.id !== task.id);
      localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify(updatedTasks));
      
      // Notify parent to refresh
      if (this.props.onUpdate) {
        this.props.onUpdate();
      }
    }
  };

  getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'Cao';
      case 'medium':
        return 'Trung bình';
      case 'low':
        return 'Thấp';
      default:
        return 'Không xác định';
    }
  };

  formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  render() {
    const { task } = this.props;
    const { isEditing, editTitle, editDescription, editPriority, editDueDate } = this.state;

    if (isEditing) {
      return (
        <div className="task-item task-item-editing">
          <div className="task-edit-form">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={editTitle}
                onChange={(e) => this.handleInputChange('editTitle', e.target.value)}
                placeholder="Tiêu đề công việc"
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                value={editDescription}
                onChange={(e) => this.handleInputChange('editDescription', e.target.value)}
                placeholder="Mô tả công việc"
                rows="3"
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <select
                  className="form-control"
                  value={editPriority}
                  onChange={(e) => this.handleInputChange('editPriority', e.target.value)}
                >
                  <option value="low">Thấp</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao</option>
                </select>
              </div>
              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control"
                  value={editDueDate}
                  onChange={(e) => this.handleInputChange('editDueDate', e.target.value)}
                />
              </div>
            </div>
            <div className="task-edit-actions">
              <button
                className="btn btn-success btn-sm me-2"
                onClick={this.handleSave}
              >
                <i className="fas fa-save me-1"></i>
                Lưu
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={this.handleCancel}
              >
                <i className="fas fa-times me-1"></i>
                Hủy
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`task-item ${task.completed ? 'completed' : ''} ${this.getPriorityClass(task.priority)}`}>
        <div className="task-content">
          <div className="task-header">
            <div className="task-title-section">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={task.completed}
                  onChange={this.handleToggle}
                />
              </div>
              <h5 className={`task-title ${task.completed ? 'text-decoration-line-through' : ''}`}>
                {task.title}
              </h5>
            </div>
            <div className="task-actions">
              <button
                className="btn btn-outline-primary btn-sm me-2"
                onClick={this.handleEdit}
                title="Chỉnh sửa"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={this.handleDelete}
                title="Xóa"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className={`task-description ${task.completed ? 'text-decoration-line-through' : ''}`}>
              {task.description}
            </p>
          )}
          
          <div className="task-meta">
            <span className={`badge ${this.getPriorityClass(task.priority)}`}>
              {this.getPriorityLabel(task.priority)}
            </span>
            {task.dueDate && (
              <span className="task-due-date">
                <i className="fas fa-calendar me-1"></i>
                {this.formatDate(task.dueDate)}
              </span>
            )}
            <span className="task-date">
              <i className="fas fa-clock me-1"></i>
              {this.formatDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskItem; 
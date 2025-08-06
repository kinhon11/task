import React from 'react';
import '../styles/TaskItem.css';

class TaskItem extends React.Component {
  state = {
    showDeleteConfirm: false
  };

  handleDelete = () => {
    this.setState({ showDeleteConfirm: true });
  }

  confirmDelete = () => {
    this.props.onDelete();
    this.setState({ showDeleteConfirm: false });
  }

  cancelDelete = () => {
    this.setState({ showDeleteConfirm: false });
  }

  render() {
    const { task, onEdit, onToggleStatus, onDelete } = this.props;
    const { showDeleteConfirm } = this.state;

    const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
    const dueDate = new Date(task.dueDate);
    const isToday = dueDate.toDateString() === new Date().toDateString();

    return (
      <div className={`card mb-3 task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-1">
              <button
                className={`btn btn-sm ${task.completed ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={onToggleStatus}
                title={task.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}
              >
                <i className={`fas ${task.completed ? 'fa-check' : 'fa-circle'}`}></i>
              </button>
            </div>
            
            <div className="col-md-8">
              <h6 className={`card-title mb-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                {task.title}
              </h6>
              <p className={`card-text mb-2 ${task.completed ? 'text-muted' : ''}`}>
                {task.description}
              </p>
              <div className="task-meta">
                <small className="text-muted">
                  <i className="fas fa-calendar me-1"></i>
                  Hạn: {dueDate.toLocaleDateString('vi-VN')}
                  {isToday && !task.completed && (
                    <span className="badge bg-warning text-dark ms-2">Hôm nay</span>
                  )}
                  {isOverdue && (
                    <span className="badge bg-danger ms-2">Quá hạn</span>
                  )}
                </small>
                <small className="text-muted ms-3">
                  <i className="fas fa-clock me-1"></i>
                  Tạo: {new Date(task.createdAt).toLocaleDateString('vi-VN')}
                </small>
              </div>
            </div>
            
            <div className="col-md-3 text-end">
              <div className="btn-group" role="group">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={onEdit}
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
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                    Xác nhận xóa
                  </h5>
                  <button type="button" className="btn-close" onClick={this.cancelDelete}></button>
                </div>
                <div className="modal-body">
                  <p>Bạn có chắc chắn muốn xóa công việc "<strong>{task.title}</strong>"?</p>
                  <p className="text-muted small">Hành động này không thể hoàn tác.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.cancelDelete}>
                    <i className="fas fa-times me-2"></i>
                    Hủy
                  </button>
                  <button type="button" className="btn btn-danger" onClick={this.confirmDelete}>
                    <i className="fas fa-trash me-2"></i>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </div>
        )}
      </div>
    );
  }
}

export default TaskItem; 
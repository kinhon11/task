import React from 'react';
import '../styles/TaskForm.css';

class TaskForm extends React.Component {
  state = {
    title: '',
    description: '',
    dueDate: '',
    error: ''
  };

  componentDidMount() {
    if (this.props.task) {
      this.setState({
        title: this.props.task.title,
        description: this.props.task.description,
        dueDate: this.props.task.dueDate
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.task !== this.props.task) {
      if (this.props.task) {
        this.setState({
          title: this.props.task.title,
          description: this.props.task.description,
          dueDate: this.props.task.dueDate,
          error: ''
        });
      } else {
        this.setState({
          title: '',
          description: '',
          dueDate: '',
          error: ''
        });
      }
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, dueDate } = this.state;

    if (!title.trim()) {
      this.setState({ error: 'Vui lòng nhập tiêu đề công việc!' });
      return;
    }

    if (!dueDate) {
      this.setState({ error: 'Vui lòng chọn ngày hết hạn!' });
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      dueDate
    };

    this.props.onSubmit(taskData);
  }

  render() {
    const { title, description, dueDate, error } = this.state;
    const { task, onCancel } = this.props;
    const isEditing = !!task;

    return (
      <div className="task-form-container">
        <div className="row mb-4">
          <div className="col">
            <div className="card shadow task-form-card">
              <div className={`card-header ${isEditing ? 'bg-warning' : 'bg-success'} text-white`}>
                <h5 className="mb-0">
                  <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus'} me-2`}></i>
                  {isEditing ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
                </h5>
              </div>
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}
                
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          <i className="fas fa-heading me-2"></i>
                          Tiêu đề công việc *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={title}
                          onChange={this.handleInputChange}
                          placeholder="Nhập tiêu đề công việc"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="dueDate" className="form-label">
                          <i className="fas fa-calendar me-2"></i>
                          Ngày hết hạn *
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="dueDate"
                          name="dueDate"
                          value={dueDate}
                          onChange={this.handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      <i className="fas fa-align-left me-2"></i>
                      Mô tả
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={description}
                      onChange={this.handleInputChange}
                      placeholder="Nhập mô tả chi tiết về công việc (tùy chọn)"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={onCancel}
                    >
                      <i className="fas fa-times me-2"></i>
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className={`btn ${isEditing ? 'btn-warning' : 'btn-success'}`}
                    >
                      <i className={`fas ${isEditing ? 'fa-save' : 'fa-plus'} me-2`}></i>
                      {isEditing ? 'Cập nhật' : 'Thêm'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm; 
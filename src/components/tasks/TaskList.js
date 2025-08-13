import React from "react";
import TaskItem from "./TaskItem";
import "../../styles/tasks/TaskList.css";

class TaskList extends React.Component {
  state = {
    tasks: this.props.tasks || [],
    filterStatus: "all",
    searchTerm: "",
    selectedDate: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.tasks !== this.props.tasks) {
      this.setState({ tasks: this.props.tasks || [] });
    }
  }

  handleTaskUpdate = () => {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
  };

  handleStatusChange = (e) => {
    this.setState({ filterStatus: e.target.value });
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleDateChange = (e) => {
    this.setState({ selectedDate: e.target.value });
  };

  getFilteredTasks = () => {
    const { tasks, filterStatus, searchTerm, selectedDate } = this.state;
    return tasks
      .filter((task) => {
        // Lọc trạng thái
        if (filterStatus === "completed") return task.completed;
        if (filterStatus === "pending") return !task.completed;
        return true;
      })
      .filter((task) => {
        // Lọc ngày hết hạn
        if (selectedDate) {
          return (
            task.dueDate &&
            new Date(task.dueDate).toLocaleDateString() ===
              new Date(selectedDate).toLocaleDateString()
          );
        }
        return true;
      })
      .filter(
        (task) =>
          task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  render() {
    const filteredTasks = this.getFilteredTasks();

    if (!filteredTasks || filteredTasks.length === 0) {
      return (
        <div className="task-list">
          <div className="row mb-3">
            <div className="col-md-4">
              <select
                className="form-select"
                value={this.state.filterStatus}
                onChange={this.handleStatusChange}
              >
                <option value="all">Tất cả</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="pending">Đang làm</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                placeholder="Lọc theo ngày hết hạn"
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                value={this.state.searchTerm}
                onChange={this.handleSearchChange}
                placeholder="Tìm kiếm công việc..."
              />
            </div>
          </div>
          <div className="task-list-empty">
            <div className="empty-state">
              <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">Không có công việc nào phù hợp</h5>
              <p className="text-muted">Hãy thêm công việc đầu tiên của bạn!</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="task-list">
        <div className="row mb-3">
          <div className="col-md-4">
            <select
              className="form-select"
              value={this.state.filterStatus}
              onChange={this.handleStatusChange}
            >
              <option value="all">ALL</option>
              <option value="completed">Completed</option>
              <option value="pending">Currently working</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
              placeholder="Filter by expiration date"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              value={this.state.searchTerm}
              onChange={this.handleSearchChange}
              placeholder="Searching for a job..."
            />
          </div>
        </div>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={this.handleTaskUpdate}
          />
        ))}
      </div>
    );
  }
}
export default TaskList;

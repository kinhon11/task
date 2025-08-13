import React from "react";
import TaskItem from "./TaskItem";
import "../../styles/tasks/TaskList.css";

class TaskList extends React.Component {
  state = {
    tasks: this.props.tasks || [],
    search: "",
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

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { tasks, search } = this.state;

    // Lọc danh sách công việc theo từ khóa tìm kiếm (theo tiêu đề và mô tả)
    const filteredTasks = tasks.filter(
      (task) =>
        task.title?.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase())
    );

    if (!filteredTasks || filteredTasks.length === 0) {
      return (
        <div className="task-list">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Tìm kiếm công việc..."
            value={search}
            onChange={this.handleSearchChange}
          />
          <div className="task-list-empty">
            <div className="empty-state">
              <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">Chưa có công việc nào</h5>
              <p className="text-muted">Hãy thêm công việc đầu tiên của bạn!</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="task-list">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Tìm kiếm công việc..."
          value={search}
          onChange={this.handleSearchChange}
        />
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

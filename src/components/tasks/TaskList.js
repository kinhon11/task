import React from "react";
import TaskItem from "./TaskItem";
import "../../styles/tasks/TaskList.css";

class TaskList extends React.Component {
  state = {
    tasks: this.props.tasks || [],
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

  render() {
    const { tasks } = this.state;

    if (!tasks || tasks.length === 0) {
      return (
        <div className="task-list-empty">
          <div className="empty-state">
            <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
            <h5 className="text-muted">Chưa có công việc nào</h5>
            <p className="text-muted">Hãy thêm công việc đầu tiên của bạn!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="task-list">
        {tasks.map((task) => (
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

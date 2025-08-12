import React from "react";
import "../../styles/tasks/TaskForm.css";

class TaskForm extends React.Component {
  state = {
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    isExpanded: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, priority, dueDate } = this.state;

    if (title.trim()) {
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      this.addTaskToStorage(newTask);
      this.setState({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        isExpanded: false,
      });
    }
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleExpanded = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  };

  addTaskToStorage = (newTask) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.id) {
      try {
        const userId = parseInt(currentUser.id);
        const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`)) || [];
        tasks.push(newTask);
        localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));

        if (this.props.onRefresh) {
          this.props.onRefresh();
        }
      } catch (error) {
        console.error("Error adding task to storage:", error);
      }
    } else {
      console.error("No current user found");
    }
  };

  render() {
    const { title, description, priority, dueDate, isExpanded } = this.state;

    return (
      <div className="task-form-container">
        <form className="task-form" onSubmit={this.handleSubmit}>
          <div className="task-form-header">
            <input
              type="text"
              className="form-control task-title-input"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              placeholder="Add a new task..."
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={this.toggleExpanded}
            >
              <i className={`fas fa-chevron-${isExpanded ? "up" : "down"}`}></i>
            </button>
          </div>

          {isExpanded && (
            <div className="task-form-details">
              <div className="mb-3">
                <label className="form-label">
                  <i className="fas fa-align-left me-2"></i>
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={this.handleInputChange}
                  placeholder="Task description..."
                  rows="3"
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-flag me-2"></i>
                      Priority
                    </label>
                    <select
                      className="form-control"
                      name="priority"
                      value={priority}
                      onChange={this.handleInputChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-calendar me-2"></i>
                      Due date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="dueDate"
                      value={dueDate}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="task-form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!title.trim()}
            >
              <i className="fas fa-plus me-2"></i>
              Add task
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TaskForm;

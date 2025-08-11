import React from 'react';
import '../../styles/tasks/TaskFilter.css';

class TaskFilter extends React.Component {
  state = {
    filter: 'all',
    totalTasks: 0,
    completedTasks: 0
  };

  componentDidMount() {
    this.loadTaskStats();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tasks !== this.props.tasks) {
      this.loadTaskStats();
    }
  }

  loadTaskStats = () => {
    const { tasks } = this.props;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    
    this.setState({
      totalTasks,
      completedTasks
    });
  };

  handleFilterChange = (newFilter) => {
    this.setState({ filter: newFilter });
    
    // Notify parent about filter change
    if (this.props.onFilterChange) {
      this.props.onFilterChange(newFilter);
    }
  };

  render() {
    const { filter, totalTasks, completedTasks } = this.state;

    return (
      <div className="task-filter">
        <div className="filter-controls">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => this.handleFilterChange('all')}
            >
              <i className="fas fa-list me-1"></i>
              Tất cả ({totalTasks})
            </button>
            <button
              type="button"
              className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => this.handleFilterChange('active')}
            >
              <i className="fas fa-clock me-1"></i>
              Đang làm ({totalTasks - completedTasks})
            </button>
            <button
              type="button"
              className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => this.handleFilterChange('completed')}
            >
              <i className="fas fa-check me-1"></i>
              Hoàn thành ({completedTasks})
            </button>
          </div>
        </div>

        <div className="filter-stats">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%`
              }}
              aria-valuenow={completedTasks}
              aria-valuemin="0"
              aria-valuemax={totalTasks}
            >
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
            </div>
          </div>
          <small className="text-muted">
            Tiến độ hoàn thành: {completedTasks}/{totalTasks}
          </small>
        </div>
      </div>
    );
  }
}

export default TaskFilter; 
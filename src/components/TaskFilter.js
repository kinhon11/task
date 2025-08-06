import React from 'react';
import '../styles/TaskFilter.css';

class TaskFilter extends React.Component {
  state = {
    filterStatus: 'all',
    searchTerm: ''
  };

  componentDidMount() {
    // Initialize with props if provided
    if (this.props.filterStatus) {
      this.setState({ filterStatus: this.props.filterStatus });
    }
    if (this.props.searchTerm) {
      this.setState({ searchTerm: this.props.searchTerm });
    }
  }

  handleFilterChange = (filterStatus) => {
    this.setState({ filterStatus });
    if (this.props.onFilterChange) {
      this.props.onFilterChange(filterStatus);
    }
  }

  handleSearchChange = (searchTerm) => {
    this.setState({ searchTerm });
    if (this.props.onSearchChange) {
      this.props.onSearchChange(searchTerm);
    }
  }

  render() {
    const { filterStatus, searchTerm } = this.state;

    return (
      <div className="task-filter-container">
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
    );
  }
}

export default TaskFilter; 
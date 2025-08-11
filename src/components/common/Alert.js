import React from 'react';

function Alert({ type = 'success', message }) {
  const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
  const iconClass = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';

  return (
    <div className={`alert ${alertClass}`} role="alert">
      <i className={`${iconClass} me-2`}></i>
      {message}
    </div>
  );
}

export default Alert;

import React from 'react';

class Button extends React.Component {
  render() {
    const {
      type = 'button',
      variant = 'primary',
      isLoading = false,
      label,
      loadingLabel,
      icon,
      className = '',
      disabled = false,
      onClick
    } = this.props;

    const classes = `btn btn-${variant} ${className}`.trim();

    return (
      <button type={type} className={classes} disabled={disabled || isLoading} onClick={onClick}>
        {isLoading ? (
          <div className="d-inline-flex align-items-center gap-2">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span>{loadingLabel || 'Processing...'}</span>
          </div>
        ) : (
          <>
            {icon && <i className={`${icon} me-2`}></i>}
            {label}
          </>
        )}
      </button>
    );
  }
}

export default Button;

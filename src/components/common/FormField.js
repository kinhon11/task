import React from 'react';

function FormField({
  label,
  icon,
  type = 'text',
  id,
  name,
  value,
  checked,
  onChange,
  placeholder,
  options = [],
  error,
  required = true,
}) {
  if (type === 'select') {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {icon && <i className={`${icon} me-2`}></i>}
          {label}
        </label>
        <select
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className="mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            className={`form-check-input ${error ? 'is-invalid' : ''}`}
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            required={required}
          />
          <label className="form-check-label" htmlFor={id}>
            {label}
          </label>
        </div>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {icon && <i className={`${icon} me-2`}></i>}
        {label}
      </label>
      <input
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default FormField;

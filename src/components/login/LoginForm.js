import React from 'react';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Alert from '../common/Alert';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    success: '',
    isLoading: false
  };

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
      error: '',
      success: ''
    });
  };

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
      error: '',
      success: ''
    });
  };

  validate = () => {
    const { email, password } = this.state;
    if (!email.trim() || !password.trim()) {
      return 'Vui lòng nhập đầy đủ thông tin!';
    }
    return null;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const error = this.validate();
    
    if (error) {
      this.setState({ error });
      return;
    }

    this.setState({ isLoading: true, error: '', success: '' });

    // Call parent's onSubmit handler
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password
    }, this.handleSuccess, this.handleError);
  };

  handleSuccess = (message) => {
    this.setState({ 
      success: message,
      isLoading: false 
    });
    
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  handleError = (errorMessage) => {
    this.setState({ 
      error: errorMessage,
      isLoading: false 
    });
  };

  render() {
    const { email, password, error, success, isLoading } = this.state;

    return (
      <div className="card-body">
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <form className="login-form" onSubmit={this.handleSubmit}>
          <FormField
            label="Email"
            icon="fas fa-envelope"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChangeEmail}
            placeholder="Nhập email của bạn"
          />

          <FormField
            label="Mật khẩu"
            icon="fas fa-lock"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
            placeholder="Nhập mật khẩu"
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            label="Đăng nhập"
            loadingLabel="Đang đăng nhập..."
            icon="fas fa-sign-in-alt"
          />
        </form>
      </div>
    );
  }
}

export default LoginForm; 
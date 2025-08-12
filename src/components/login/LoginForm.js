import React from 'react';
import Button from '../common/Button';
import Alert from '../common/Alert';
import LoginFields from './LoginFields';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    success: '',
    isLoading: false
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: '', success: '' });
  };

  validate = () => {
    const { email, password } = this.state;
    if (!email.trim() || !password.trim()) {
      return 'Please fill in all required fields!';
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
    const { error, success, isLoading, ...values } = this.state;

    return (
      <div className="card-body">
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <form className="login-form" onSubmit={this.handleSubmit}>
          <LoginFields values={values} onChange={this.handleChange} />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            label="Login"
            loadingLabel="Signing in..."
            icon="fas fa-sign-in-alt"
          />
        </form>
      </div>
    );
  }
}

export default LoginForm; 
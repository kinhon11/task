import React from 'react';
import Button from '../common/Button';
import Alert from '../common/Alert';
import RegisterFields from './RegisterFields';

class RegisterForm extends React.Component {
  state = {
    Fullname: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    gender: "",
    terms: false,
    error: {},
    submit: null,
    isLoading: false,
    success: ""
  };

  handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  validate = () => {
    const errors = {};
    const { Fullname, Email, Password, ConfirmPassword, gender, terms } =
      this.state;
    if (!Fullname.trim()) errors.Fullname = "Fullname is required";
    if (!Email) {
      errors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      errors.Email = "Email not suitable ";
    }
    if (!Password) {
      errors.Password = "Password is required";
    } else if (Password.length < 6) {
      errors.Password = "Password must be at least 6 characters";
    }
    if (!ConfirmPassword) {
      errors.ConfirmPassword = "Confirm Password is required";
    } else if (ConfirmPassword !== Password) {
      errors.ConfirmPassword = "Passwords do not match";
    }

    if (!gender) errors.gender = "Please select gender";
    if (!terms) errors.terms = "Please accept the terms";

    return errors;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.setState({ error: errors, submit: null });
    } else {
      this.setState({
        error: {},
        submit: {
          Fullname: this.state.Fullname,
          Email: this.state.Email,
          Password: this.state.Password,
          gender: this.state.gender,
          terms: this.state.terms,
        },
        isLoading: true,
        success: ""
      });

      this.props.onSubmit({
        Fullname: this.state.Fullname,
        Email: this.state.Email,
        Password: this.state.Password,
        gender: this.state.gender,
        terms: this.state.terms,
      }, this.handleSuccess, this.handleError);
    }
  };

  handleSuccess = (message) => {
    this.setState({ 
      success: message,
      isLoading: false,
      Fullname: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      gender: '',
      terms: false
    });
  };

  handleError = (errorMessage) => {
    this.setState({ 
      error: { Email: errorMessage },
      isLoading: false 
    });
  };

  render() {
    const { error, isLoading, success, ...values } = this.state;

    return (
      <div className="card-body">
        {success && <Alert type="success" message={success} />}

        <form className="register-form" onSubmit={this.handleSubmit}>
          <RegisterFields values={values} errors={error} onChange={this.handleChange} />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            label="Register"
            loadingLabel="Registering..."
            icon="fas fa-user-plus"
          />
        </form>
      </div>
    );
  }
}

export default RegisterForm; 
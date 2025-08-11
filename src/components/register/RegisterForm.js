import React from 'react';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Alert from '../common/Alert';

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

  handleChangeFullname = (event) => {
    this.setState({
      Fullname: event.target.value,
    });
  };

  handleChangeEmail = (event) => {
    this.setState({
      Email: event.target.value,
    });
  };

  handleChangePassword = (event) => {
    this.setState({
      Password: event.target.value,
    });
  };

  handleChangeConfirmPassword = (event) => {
    this.setState({
      ConfirmPassword: event.target.value,
    });
  };

  handleChangeGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  handleChangeTerms = (event) => {
    this.setState({
      terms: event.target.checked,
    });
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

      // Call parent's onSubmit handler
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
    const { Fullname, Email, Password, ConfirmPassword, gender, terms, error, isLoading, success } = this.state;

    return (
      <div className="card-body">
        {success && <Alert type="success" message={success} />}

        <form className="register-form" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <FormField
                label="Họ và tên"
                icon="fas fa-user"
                type="text"
                id="Fullname"
                name="Fullname"
                value={Fullname}
                onChange={this.handleChangeFullname}
                placeholder="Nhập họ và tên"
                error={error.Fullname}
              />
            </div>
            <div className="col-md-6">
              <FormField
                label="Email"
                icon="fas fa-envelope"
                type="email"
                id="Email"
                name="Email"
                value={Email}
                onChange={this.handleChangeEmail}
                placeholder="Nhập email"
                error={error.Email}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormField
                label="Mật khẩu"
                icon="fas fa-lock"
                type="password"
                id="Password"
                name="Password"
                value={Password}
                onChange={this.handleChangePassword}
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                error={error.Password}
              />
            </div>
            <div className="col-md-6">
              <FormField
                label="Xác nhận mật khẩu"
                icon="fas fa-lock"
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                value={ConfirmPassword}
                onChange={this.handleChangeConfirmPassword}
                placeholder="Nhập lại mật khẩu"
                error={error.ConfirmPassword}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormField
                label="Giới tính"
                icon="fas fa-venus-mars"
                type="select"
                id="gender"
                name="gender"
                value={gender}
                onChange={this.handleChangeGender}
                options={[
                  { value: "", label: "Chọn giới tính" },
                  { value: "male", label: "Nam" },
                  { value: "female", label: "Nữ" },
                  { value: "other", label: "Khác" }
                ]}
                error={error.gender}
              />
            </div>
            <div className="col-md-6">
              <FormField
                label="Tôi đồng ý với các điều khoản và điều kiện"
                type="checkbox"
                id="terms"
                name="terms"
                checked={terms}
                onChange={this.handleChangeTerms}
                error={error.terms}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            label="Đăng ký"
            loadingLabel="Đang đăng ký..."
            icon="fas fa-user-plus"
          />
        </form>
      </div>
    );
  }
}

export default RegisterForm; 
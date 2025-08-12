import React from 'react';
import FormField from '../common/FormField';

class RegisterFields extends React.Component {
  render() {
    const { values, errors, onChange } = this.props;
    const { Fullname, Email, Password, ConfirmPassword, gender, terms } = values;

    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <FormField
              label="Full name"
              icon="fas fa-user"
              type="text"
              id="Fullname"
              name="Fullname"
              value={Fullname}
              onChange={onChange}
              placeholder="Enter full name"
              error={errors.Fullname}
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
              onChange={onChange}
              placeholder="Enter email"
              error={errors.Email}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormField
              label="Password"
              icon="fas fa-lock"
              type="password"
              id="Password"
              name="Password"
              value={Password}
              onChange={onChange}
              placeholder="Enter password (at least 6 characters)"
              error={errors.Password}
            />
          </div>
          <div className="col-md-6">
            <FormField
              label="Confirm password"
              icon="fas fa-lock"
              type="password"
              id="ConfirmPassword"
              name="ConfirmPassword"
              value={ConfirmPassword}
              onChange={onChange}
              placeholder="Re-enter password"
              error={errors.ConfirmPassword}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormField
              label="Gender"
              icon="fas fa-venus-mars"
              type="select"
              id="gender"
              name="gender"
              value={gender}
              onChange={onChange}
              options={[
                { value: "", label: "Select gender" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" }
              ]}
              error={errors.gender}
            />
          </div>
          <div className="col-md-6">
            <FormField
              label="I agree to the terms and conditions"
              type="checkbox"
              id="terms"
              name="terms"
              checked={terms}
              onChange={onChange}
              error={errors.terms}
            />
          </div>
        </div>
      </>
    );
  }
}

export default RegisterFields;

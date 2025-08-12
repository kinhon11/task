import React from 'react';
import FormField from '../common/FormField';

class LoginFields extends React.Component {
  render() {
    const { values, onChange } = this.props;
    const { email, password } = values;

    return (
      <>
        <FormField
          label="Email"
          icon="fas fa-envelope"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Enter your email"
        />

        <FormField
          label="Password"
          icon="fas fa-lock"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Enter password"
        />
      </>
    );
  }
}

export default LoginFields;

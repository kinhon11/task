import { checkUserExists, addUser, findUserByEmail, saveUser } from '../utils/storage';

class AuthService {
  async registerUser(userData) {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (checkUserExists(userData.Email)) {
          reject("Email đã được sử dụng! Vui lòng chọn email khác.");
          return;
        }

        const newUser = {
          id: Date.now(),
          name: userData.Fullname.trim(),
          email: userData.Email.trim(),
          password: userData.Password,
          gender: userData.gender,
          createdAt: new Date().toISOString()
        };

        addUser(newUser);
        resolve('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
      }, 1000);
    });
  }

  async loginUser(credentials) {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        const user = findUserByEmail(credentials.email);
        
        if (user && user.password === credentials.password) {
          saveUser(user);
          resolve('Đăng nhập thành công! Đang chuyển hướng...');
        } else {
          reject('Email hoặc mật khẩu không đúng!');
        }
      }, 1000);
    });
  }

  validateUserData(userData) {
    const errors = {};
    const { Fullname, Email, Password, ConfirmPassword, gender, terms } = userData;
    
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
  }
}

export default new AuthService(); 
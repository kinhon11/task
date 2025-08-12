import {
  checkUserExists,
  addUser,
  findUserByEmail,
  saveUser,
} from "../utils/storage";

class AuthService {
  async registerUser(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (checkUserExists(userData.Email)) {
          reject("Email is already in use! Please choose another email.");
          return;
        }

        const newUser = {
          id: Date.now(),
          name: userData.Fullname.trim(),
          email: userData.Email.trim(),
          password: userData.Password,
          gender: userData.gender,
          createdAt: new Date().toISOString(),
        };

        addUser(newUser);
        resolve("Registration successful! You can log in now.");
      }, 1000);
    });
  }

  async loginUser(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = findUserByEmail(credentials.email);

        if (user && user.password === credentials.password) {
          saveUser(user);
          resolve("Login successful! Redirecting...");
        } else {
          reject("Incorrect email or password!");
        }
      }, 1000);
    });
  }
}

const authService = new AuthService();
export default authService;

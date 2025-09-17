export class ValidationService {
  static validateEmail(email) {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
  }

  static validatePassword(password) {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  }

  static validateLoginForm(credentials) {
    const emailError = this.validateEmail(credentials.email);
    if (emailError) return emailError;

    const passwordError = this.validatePassword(credentials.password);
    if (passwordError) return passwordError;

    return null;
  }

  static validateRegistrationForm(userData) {
    const emailError = this.validateEmail(userData.email);
    if (emailError) return emailError;

    const passwordError = this.validatePassword(userData.password);
    if (passwordError) return passwordError;

    if (userData.password !== userData.password_confirmation) {
      return "Passwords do not match";
    }

    if (!userData.name) return "Name is required";

    return null;
  }
}

// //WHY EXPORT AS INSTANCE?
// export const validationService = new ValidationService();

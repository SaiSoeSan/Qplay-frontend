<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            v-model="form.fullName"
            required
            placeholder="Enter your full name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            placeholder="Enter your password"
            minlength="6"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            required
            placeholder="Confirm your password"
          />
        </div>

        <button type="submit" class="register-btn" :disabled="isLoading">
          {{ isLoading ? "Creating Account..." : "Register" }}
        </button>
      </form>

      <div class="form-footer">
        <p>
          Already have an account?
          <router-link to="/login" class="login-link">Login here</router-link>
        </p>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="success" class="success-message">
        {{ success }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";

const router = useRouter();
const { register, isLoading, error, clearError } = useAuth();

const form = ref({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const success = ref("");

const validateForm = () => {
  if (
    !form.value.fullName ||
    !form.value.email ||
    !form.value.password ||
    !form.value.confirmPassword
  ) {
    return "Please fill in all fields";
  }

  if (form.value.password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  if (form.value.password !== form.value.confirmPassword) {
    return "Passwords do not match";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    return "Please enter a valid email address";
  }

  return null;
};

const handleRegister = async () => {
  // Clear previous messages
  success.value = "";
  clearError();

  // Validate form
  const validationError = validateForm();
  if (validationError) {
    // For validation errors, we need to handle them locally since they're not from the auth store
    console.error("Validation error:", validationError);
    return;
  }

  // Use the auth composable to register
  const result = await register({
    fullName: form.value.fullName,
    email: form.value.email,
    password: form.value.password,
  });

  if (result.success) {
    success.value = "Account created successfully! Redirecting to home...";

    // Redirect to home page after successful registration
    setTimeout(() => {
      router.push("/");
    }, 1500);
  }
  // Error is handled by the auth store
};
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.register-form {
  background-color: #e8e8e8;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
}

.register-form h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.register-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.register-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.form-footer {
  text-align: center;
  margin-top: 20px;
}

.form-footer p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.login-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
  border: 1px solid #f5c6cb;
  text-align: center;
  font-size: 14px;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
  border: 1px solid #c3e6cb;
  text-align: center;
  font-size: 14px;
}
</style>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">QPlay</router-link>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/register" class="nav-link">Register</router-link>
        </template>

        <!-- Show user menu when authenticated -->
        <template v-else>
          <span class="user-info">Welcome, {{ userName }}</span>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const { isAuthenticated, userName, logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push("/");
};
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-brand .brand-link {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-brand .brand-link:hover {
  color: #3498db;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
}

.nav-link.router-link-active {
  background-color: #3498db;
}

.user-info {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
    padding: 1rem;
    gap: 1rem;
  }

  .nav-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.5rem;
  }

  .nav-brand .brand-link {
    font-size: 1.25rem;
  }

  .nav-links {
    width: 100%;
    justify-content: space-around;
  }
}
</style>

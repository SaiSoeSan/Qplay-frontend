<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div id="app">
    <NavBar />

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.main-content {
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 60px);
}
</style>

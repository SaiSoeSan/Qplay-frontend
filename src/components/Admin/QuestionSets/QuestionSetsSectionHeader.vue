<template>
  <div
    class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
  >
    <div>
      <h2 class="text-xl font-semibold text-gray-900">Question Sets</h2>
      <p class="text-sm text-gray-500">Manage your quiz question sets</p>
    </div>
    <button
      @click="() => $emit('add-question-set')"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
    >
      <svg
        class="-ml-1 mr-2 h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      Add New Question Set
    </button>
  </div>
</template>
<script setup>
defineEmits(["add-question-set"]);
</script>

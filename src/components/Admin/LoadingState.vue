<template>
  <div class="flex justify-center items-center py-12">
    <div
      class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
    ></div>
    <span class="ml-3 text-gray-600">Loading question sets...</span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

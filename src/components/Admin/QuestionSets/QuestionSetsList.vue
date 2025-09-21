<template>
  <div class="divide-y divide-gray-200">
    <QuestionSetItem
      v-for="questionSet in questionSets"
      :key="questionSet.id"
      :question-set="questionSet"
      @view-details="$emit('view-details', $event)"
      @edit-question-set="$emit('edit-question-set', $event)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import QuestionSetItem from "./QuestionSetItem.vue";

const props = defineProps({
  questionSets: {
    type: Array,
    required: true,
  },
});

defineEmits(["view-details", "edit-question-set"]);
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Section Header -->
    <QuestionSetsSectionHeader @add-question-set="$emit('add-question-set')" />

    <LoadingState v-if="loading" />

    <!-- Empty State -->
    <EmptyState
      v-else-if="questionSets.length === 0"
      @add-question-set="$emit('add-question-set')"
    />

    <QuestionSetsList
      v-else
      :question-sets="questionSets"
      @view-details="$emit('view-details', $event)"
      @edit-question-set="$emit('edit-question-set', $event)"
    />
  </div>
</template>

<script setup>
import QuestionSetsSectionHeader from "./QuestionSetsSectionHeader.vue";
import LoadingState from "../LoadingState.vue";
import EmptyState from "./EmptyState.vue";
import QuestionSetsList from "./QuestionSetsList.vue";

//props
defineProps({
  questionSets: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["add-question-set", "view-details", "edit-question-set"]);
</script>

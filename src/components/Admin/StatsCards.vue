<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <StatsCard
      title="Total Question Sets"
      :value="questionSetsCount"
      :iconType="1"
    />
    <StatsCard title="Total Questions" :value="totalQuestions" :iconType="2" />
    <StatsCard title="Total Students" :value="totalStudents" :iconType="3" />
    <StatsCard title="Total Attempts" :value="totalAttempts" :iconType="4" />
  </div>
</template>

<script setup>
import StatsCard from "@/components/Admin/StatCardItem.vue";

defineProps({
  questionSetsCount: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  totalStudents: {
    type: Number,
    required: true,
  },
  totalAttempts: {
    type: Number,
    required: true,
  },
});
</script>

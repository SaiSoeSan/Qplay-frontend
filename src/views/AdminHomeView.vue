<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <AdminHeader />

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <StatsCards
        :question-sets-count="questionSets.length"
        :total-questions="totalQuestions"
        :total-students="totalStudents"
        :total-attempts="totalAttempts"
      />

      <QuestionSetsSection
        :question-sets="questionSets"
        :loading="loading"
        @add-question-set="handleAddQuestionSet"
        @view-details="handleViewDetails"
        @edit-question-set="handleEditQuestionSet"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";

// Components
import AdminHeader from "@/components/Admin/Header.vue";
import StatsCards from "@/components/Admin/StatsCards.vue";
import QuestionSetsSection from "@/components/Admin/QuestionSets/QuestionSetsSection.vue";
import { httpClient } from "@/services/httpClient";

const router = useRouter();

// Reactive data
const loading = ref(true);
const questionSets = ref([]);
const totalQuestions = ref(0);
const totalStudents = ref(0);
const totalAttempts = ref(0);

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const handleAddQuestionSet = () => {
  console.log("Add new question set");
  // Navigate to question set creation page
  router.push("/admin/question-sets/create");
};

const handleViewDetails = (questionSet) => {
  console.log("View details for:", questionSet.title);
  // Navigate to question set details page
  router.push(`/admin/question-sets/${questionSet.id}`);
};

const handleEditQuestionSet = (questionSet) => {
  console.log("Edit question set:", questionSet.title);
  // Navigate to question set edit page
  router.push(`/admin/question-sets/${questionSet.id}/edit`);
};

const fetchDashboardData = async () => {
  try {
    const response = await httpClient.get("/admin/dashboard");
    if (response.success && response.data) {
      totalQuestions.value = response.data.total_questions;
      totalStudents.value = response.data.total_students;
      totalAttempts.value = response.data.total_attempts;
      questionSets.value = response.data.question_sets;
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>

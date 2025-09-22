<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-96">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
        <span class="ml-3 text-gray-600 text-lg">Loading question set...</span>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-md p-4"
      >
        <div class="flex">
          <svg
            class="h-5 w-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div class="ml-3">
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="questionSet" class="space-y-8">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button
              @click="goBack"
              class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </button>
          </div>
          <div class="flex space-x-3">
            <button
              @click="handleEdit"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Question Set
            </button>
            <button
              @click="handleDelete"
              class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>

        <!-- Question Set Info -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold text-gray-900">
                {{ questionSet.title }}
              </h1>
            </div>
          </div>

          <div class="p-6">
            <!-- Description -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-2">
                Description
              </h3>
              <p class="text-gray-900">{{ questionSet.description }}</p>
            </div>

            <!-- YouTube Link -->
            <div v-if="questionSet.youtube_link" class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-2">
                YouTube Resource
              </h3>
              <a
                :href="questionSet.youtube_link"
                target="_blank"
                class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {{ questionSet.youtube_link }}
              </a>
            </div>

            <!-- Created/Updated Info -->
            <div class="mt-6 flex items-center text-sm text-gray-500 space-x-6">
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h-8z M8 7v10a1 1 0 001 1h6a1 1 0 001-1V7M8 7H6a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00-1-1h-2"
                  />
                </svg>
                Created: {{ formatDate(questionSet.created_at) }}
              </div>
              <div
                v-if="questionSet.updated_at !== questionSet.created_at"
                class="flex items-center"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Updated: {{ formatDate(questionSet.updated_at) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Questions List -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Questions</h2>
            <p class="text-sm text-gray-500">
              {{ questionSet.questions?.length || 0 }} questions in this set
            </p>
          </div>

          <div class="divide-y divide-gray-200">
            <div
              v-for="(question, index) in questionSet.questions"
              :key="question.id"
              class="p-6"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <!-- Question Header -->
                  <div class="flex items-center space-x-3 mb-3">
                    <span
                      class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
                    >
                      {{ index + 1 }}
                    </span>
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        question.type === 'multiple_choice'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800',
                      ]"
                    >
                      {{
                        question.type === "multiple_choice"
                          ? "Multiple Choice"
                          : "True/False"
                      }}
                    </span>
                  </div>

                  <!-- Question Text -->
                  <h3 class="text-lg font-medium text-gray-900 mb-4">
                    {{ question.question_text }}
                  </h3>

                  <div class="space-y-2">
                    <!-- Multiple Choice Options -->
                    <div
                      v-if="question.type === 'multiple_choice'"
                      class="space-y-2"
                    >
                      <div
                        v-for="option in question.options"
                        :key="option.id"
                        :class="[
                          'flex items-center p-3 rounded-md border',
                          question.correct_option_id === option.id
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200',
                        ]"
                      >
                        <div class="flex items-center">
                          <div
                            :class="[
                              'w-4 h-4 rounded-full mr-3 flex items-center justify-center',
                              question.correct_option_id === option.id
                                ? 'bg-green-500'
                                : 'bg-gray-300',
                            ]"
                          >
                            <svg
                              v-if="question.correct_option_id === option.id"
                              class="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                          </div>
                          <span class="text-gray-900">{{
                            option.option_text
                          }}</span>
                        </div>
                        <div
                          v-if="question.correct_option_id === option.id"
                          class="ml-auto"
                        >
                          <svg
                            class="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- True/False Options -->
                    <div v-else class="flex space-x-4">
                      <div
                        :class="[
                          'flex items-center p-3 rounded-md border flex-1',
                          question.true_false_answer === 1
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200',
                        ]"
                      >
                        <div class="flex items-center">
                          <div
                            :class="[
                              'w-4 h-4 rounded-full mr-3 flex items-center justify-center',
                              question.true_false_answer === 1
                                ? 'bg-green-500'
                                : 'bg-gray-300',
                            ]"
                          >
                            <svg
                              v-if="question.correct_answer === 'true'"
                              class="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                          </div>
                          <span class="text-gray-900">True</span>
                        </div>
                        <div
                          v-if="question.true_false_answer === 1"
                          class="ml-auto"
                        >
                          <svg
                            class="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        :class="[
                          'flex items-center p-3 rounded-md border flex-1',
                          question.true_false_answer === 0
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200',
                        ]"
                      >
                        <div class="flex items-center">
                          <div
                            :class="[
                              'w-4 h-4 rounded-full mr-3 flex items-center justify-center',
                              question.true_false_answer === 0
                                ? 'bg-green-500'
                                : 'bg-gray-300',
                            ]"
                          >
                            <svg
                              v-if="question.true_false_answer === 0"
                              class="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                          </div>
                          <span class="text-gray-900">False</span>
                        </div>
                        <div
                          v-if="question.true_false_answer === 0"
                          class="ml-auto"
                        >
                          <svg
                            class="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Questions State -->
            <div
              v-if="
                !questionSet.questions || questionSet.questions.length === 0
              "
              class="p-12 text-center"
            >
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">
                No questions
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                This question set doesn't have any questions yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <div class="mt-3 text-center">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
          >
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">
            Delete Question Set
          </h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete "{{ questionSet?.title }}"? This
              action cannot be undone.
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="confirmDelete"
              :disabled="deleting"
              class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:bg-gray-400"
            >
              {{ deleting ? "Deleting..." : "Delete" }}
            </button>
            <button
              @click="showDeleteModal = false"
              :disabled="deleting"
              class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { httpClient } from "@/services/httpClient";

const route = useRoute();
const router = useRouter();

// Reactive data
const loading = ref(false);
const error = ref("");
const questionSet = ref(null);
const showDeleteModal = ref(false);
const deleting = ref(false);

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const fetchQuestionSet = async () => {
  try {
    loading.value = true;
    error.value = "";

    const questionSetId = route.params.id;

    // API call to fetch question set details (fallback)
    const response = await httpClient.get(`/question-sets/${questionSetId}`);

    if (response.success && response.data) {
      questionSet.value = response.data;
    } else {
      error.value = "Question set not found";
    }
  } catch (err) {
    console.error("Error fetching question set:", err);
    error.value = err.message || "Failed to load question set details";
  } finally {
    loading.value = false;
  }
};

const handleEdit = () => {
  // Pass current question set data to edit page to avoid another API call
  router.push({
    path: `/admin/question-sets/${route.params.id}/edit`,
    state: { questionSetData: questionSet.value },
  });
};

const handleDelete = () => {
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  try {
    deleting.value = true;

    const questionSetId = route.params.id;
    console.log("Deleting question set:", questionSetId);

    // API call to delete question set
    await httpClient.delete(`/admin/question-sets/${questionSetId}`);

    // Redirect to dashboard with success message
    router.push({
      path: "/admin/dashboard",
      query: { success: "true", message: "Question set deleted successfully" },
    });
  } catch (err) {
    console.error("Error deleting question set:", err);
    error.value = err.message || "Failed to delete question set";
    showDeleteModal.value = false;
  } finally {
    deleting.value = false;
  }
};

const goBack = () => {
  router.push("/admin/dashboard");
};

defineProps({
  questionSetData: {
    type: Object,
    default: null,
  },
});

// Lifecycle
onMounted(() => {
  fetchQuestionSet();
});
</script>

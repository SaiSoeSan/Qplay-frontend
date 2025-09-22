<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-96">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
        <span class="ml-3 text-gray-600 text-lg">Loading question set...</span>
      </div>

      <!-- Error State -->
      <div
        v-else-if="loadError"
        class="bg-red-50 border border-red-200 rounded-md p-4 mb-8"
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
            <p class="text-sm text-red-800">{{ loadError }}</p>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center space-x-4">
            <button
              @click="goBack"
              class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
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
              Back to Question Set
            </button>
          </div>
          <h1 class="mt-2 text-3xl font-bold text-gray-900">
            Edit Question Set
          </h1>
          <p class="text-gray-600">
            Update your quiz information and questions
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Question Set Information -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">
                Question Set Information
              </h2>
              <p class="text-sm text-gray-500">
                Update basic information about your quiz
              </p>
            </div>

            <div class="p-6 space-y-6">
              <!-- Title -->
              <div>
                <label
                  for="title"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title <span class="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter question set title"
                />
              </div>

              <!-- Description -->
              <div>
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="3"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what this quiz covers"
                ></textarea>
              </div>

              <!-- YouTube Link -->
              <div>
                <label
                  for="youtube_link"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  YouTube Link (Optional)
                </label>
                <input
                  id="youtube_link"
                  v-model="form.youtube_link"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Status <span class="text-red-500">*</span>
                </label>
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input
                      v-model="form.status"
                      type="radio"
                      value="active"
                      class="form-radio text-blue-600"
                    />
                    <span class="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      v-model="form.status"
                      type="radio"
                      value="draft"
                      class="form-radio text-blue-600"
                    />
                    <span class="ml-2 text-sm text-gray-700">Draft</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      v-model="form.status"
                      type="radio"
                      value="archived"
                      class="form-radio text-blue-600"
                    />
                    <span class="ml-2 text-sm text-gray-700">Archived</span>
                  </label>
                </div>
              </div>

              <!-- Duration -->
              <div>
                <label
                  for="duration"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Duration (minutes)
                </label>
                <input
                  id="duration"
                  v-model.number="form.duration"
                  type="number"
                  min="1"
                  max="180"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Quiz duration in minutes"
                />
              </div>
            </div>
          </div>

          <!-- Questions Section -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div
              class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
            >
              <div>
                <h2 class="text-lg font-semibold text-gray-900">Questions</h2>
                <p class="text-sm text-gray-500">Update your quiz questions</p>
              </div>
              <button
                type="button"
                @click="addQuestion"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Question
              </button>
            </div>

            <div class="p-6">
              <!-- No Questions State -->
              <div v-if="form.questions.length === 0" class="text-center py-12">
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
                  No questions yet
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Add questions to your quiz.
                </p>
              </div>

              <!-- Questions List -->
              <div v-else class="space-y-6">
                <div
                  v-for="(question, index) in form.questions"
                  :key="question.id || question.temp_id"
                  class="border border-gray-200 rounded-lg p-6"
                >
                  <!-- Question Header -->
                  <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-medium text-gray-900">
                      Question {{ index + 1 }}
                    </h3>
                    <button
                      type="button"
                      @click="removeQuestion(index)"
                      class="text-red-600 hover:text-red-800 text-sm"
                    >
                      <svg
                        class="w-4 h-4"
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
                    </button>
                  </div>

                  <!-- Question Text -->
                  <div class="mb-4">
                    <label
                      :for="`question_text_${index}`"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Question Text <span class="text-red-500">*</span>
                    </label>
                    <textarea
                      :id="`question_text_${index}`"
                      v-model="question.text"
                      rows="2"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your question here"
                    ></textarea>
                  </div>

                  <!-- Question Type -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Question Type <span class="text-red-500">*</span>
                    </label>
                    <div class="flex space-x-4">
                      <label class="inline-flex items-center">
                        <input
                          v-model="question.type"
                          type="radio"
                          value="multiple_choice"
                          @change="updateQuestionType(index, 'multiple_choice')"
                          class="form-radio text-blue-600"
                        />
                        <span class="ml-2 text-sm text-gray-700"
                          >Multiple Choice</span
                        >
                      </label>
                      <label class="inline-flex items-center">
                        <input
                          v-model="question.type"
                          type="radio"
                          value="true_false"
                          @change="updateQuestionType(index, 'true_false')"
                          class="form-radio text-blue-600"
                        />
                        <span class="ml-2 text-sm text-gray-700"
                          >True/False</span
                        >
                      </label>
                    </div>
                  </div>

                  <!-- Multiple Choice Options -->
                  <div
                    v-if="question.type === 'multiple_choice'"
                    class="space-y-3"
                  >
                    <label class="block text-sm font-medium text-gray-700">
                      Answer Options <span class="text-red-500">*</span>
                    </label>
                    <div
                      v-for="(option, optionIndex) in question.options"
                      :key="optionIndex"
                      class="flex items-center space-x-3"
                    >
                      <input
                        v-model="question.correct_answer"
                        :value="optionIndex"
                        type="radio"
                        :name="`correct_${question.id || question.temp_id}`"
                        class="form-radio text-green-600"
                      />
                      <input
                        v-model="question.options[optionIndex]"
                        type="text"
                        required
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        :placeholder="`Option ${optionIndex + 1}`"
                      />
                    </div>
                  </div>

                  <!-- True/False Options -->
                  <div v-if="question.type === 'true_false'" class="space-y-3">
                    <label class="block text-sm font-medium text-gray-700">
                      Correct Answer <span class="text-red-500">*</span>
                    </label>
                    <div class="flex space-x-4">
                      <label class="inline-flex items-center">
                        <input
                          v-model="question.correct_answer"
                          type="radio"
                          value="true"
                          class="form-radio text-green-600"
                        />
                        <span class="ml-2 text-sm text-gray-700">True</span>
                      </label>
                      <label class="inline-flex items-center">
                        <input
                          v-model="question.correct_answer"
                          type="radio"
                          value="false"
                          class="form-radio text-green-600"
                        />
                        <span class="ml-2 text-sm text-gray-700">False</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Error Display -->
          <div
            v-if="submitError"
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
                <p class="text-sm text-red-800">{{ submitError }}</p>
              </div>
            </div>
          </div>

          <!-- Submit Actions -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="goBack"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <svg
                v-if="saving"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ saving ? "Updating..." : "Update Question Set" }}
            </button>
          </div>
        </form>
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
const loading = ref(true);
const saving = ref(false);
const loadError = ref("");
const submitError = ref("");

// Form data
const form = ref({
  title: "",
  description: "",
  youtube_link: "",
  status: "draft",
  duration: null,
  questions: [],
});

// Original data for comparison
const originalData = ref(null);

// Generate unique ID for new questions
let questionCounter = 0;
const generateQuestionId = () => `temp_${++questionCounter}`;

// Create new question template
const createNewQuestion = () => ({
  temp_id: generateQuestionId(),
  text: "",
  type: "multiple_choice",
  options: ["", "", ""],
  correct_answer: null,
});

// Methods
const fetchQuestionSet = async () => {
  try {
    loading.value = true;
    loadError.value = "";

    const questionSetId = route.params.id;

    // Check if we have data passed from previous route (e.g., detail view)
    const passedData = history.state?.questionSetData;

    if (passedData && passedData.id == questionSetId) {
      // Use passed data instead of making API call
      console.log("Using passed question set data for editing:", passedData);

      // Populate form with existing data
      form.value = {
        title: passedData.title || "",
        description: passedData.description || "",
        youtube_link: passedData.youtube_link || "",
        status: passedData.status || "draft",
        duration: passedData.duration || null,
        questions:
          passedData.questions?.map((q) => ({
            id: q.id,
            text: q.text,
            type: q.type,
            options: q.options || [],
            correct_answer: q.correct_answer,
          })) || [],
      };

      // Store original data for comparison
      originalData.value = JSON.parse(JSON.stringify(form.value));
      loading.value = false;
      return;
    }

    console.log("Fetching question set for editing, ID:", questionSetId);

    // API call to fetch question set details (fallback)
    const response = await httpClient.get(
      `/admin/question-sets/${questionSetId}`
    );

    if (response.success && response.data) {
      const data = response.data;

      // Populate form with existing data
      form.value = {
        title: data.title || "",
        description: data.description || "",
        youtube_link: data.youtube_link || "",
        status: data.status || "draft",
        duration: data.duration || null,
        questions:
          data.questions?.map((q) => ({
            id: q.id,
            text: q.text,
            type: q.type,
            options: q.options || [],
            correct_answer: q.correct_answer,
          })) || [],
      };

      // Store original data for comparison
      originalData.value = JSON.parse(JSON.stringify(form.value));

      console.log("Question set loaded for editing:", form.value);
    } else {
      loadError.value = "Question set not found";
    }
  } catch (err) {
    console.error("Error fetching question set:", err);
    loadError.value = err.message || "Failed to load question set";
  } finally {
    loading.value = false;
  }
};

const addQuestion = () => {
  form.value.questions.push(createNewQuestion());
};

const removeQuestion = (index) => {
  form.value.questions.splice(index, 1);
};

const updateQuestionType = (index, type) => {
  const question = form.value.questions[index];
  question.type = type;

  if (type === "multiple_choice") {
    question.options = ["", "", ""];
    question.correct_answer = null;
  } else {
    question.options = [];
    question.correct_answer = null;
  }
};

const validateForm = () => {
  if (!form.value.title.trim()) {
    return "Title is required";
  }

  if (!form.value.description.trim()) {
    return "Description is required";
  }

  if (!form.value.status) {
    return "Status is required";
  }

  // Validate each question
  for (let i = 0; i < form.value.questions.length; i++) {
    const question = form.value.questions[i];

    if (!question.text.trim()) {
      return `Question ${i + 1}: Question text is required`;
    }

    if (!question.type) {
      return `Question ${i + 1}: Question type is required`;
    }

    if (question.type === "multiple_choice") {
      if (question.options.some((option) => !option.trim())) {
        return `Question ${i + 1}: All answer options must be filled`;
      }

      if (
        question.correct_answer === null ||
        question.correct_answer === undefined
      ) {
        return `Question ${i + 1}: Please select the correct answer`;
      }
    }

    if (question.type === "true_false") {
      if (
        question.correct_answer === null ||
        question.correct_answer === undefined
      ) {
        return `Question ${
          i + 1
        }: Please select the correct answer (True or False)`;
      }
    }
  }

  return null;
};

const handleSubmit = async () => {
  submitError.value = "";

  const validationError = validateForm();
  if (validationError) {
    submitError.value = validationError;
    return;
  }

  saving.value = true;

  try {
    const questionSetId = route.params.id;

    // Prepare data for API
    const updateData = {
      title: form.value.title.trim(),
      description: form.value.description.trim(),
      youtube_link: form.value.youtube_link.trim() || null,
      status: form.value.status,
      duration: form.value.duration || null,
      questions: form.value.questions.map((question) => ({
        id: question.id || null, // null for new questions
        text: question.text.trim(),
        type: question.type,
        options: question.type === "multiple_choice" ? question.options : [],
        correct_answer: question.correct_answer,
      })),
    };

    console.log("Updating question set:", updateData);

    // API call to update question set
    const response = await httpClient.put(
      `/admin/question-sets/${questionSetId}`,
      updateData
    );

    if (response.success) {
      // Redirect to detail view with success message
      router.push({
        path: `/admin/question-sets/${questionSetId}`,
        query: {
          success: "true",
          message: "Question set updated successfully",
        },
      });
    } else {
      submitError.value = response.message || "Failed to update question set";
    }
  } catch (err) {
    console.error("Error updating question set:", err);
    submitError.value =
      err.message || "Failed to update question set. Please try again.";
  } finally {
    saving.value = false;
  }
};

const goBack = () => {
  const questionSetId = route.params.id;
  router.push(`/admin/question-sets/${questionSetId}`);
};

// Lifecycle
onMounted(() => {
  //   fetchQuestionSet();
});
</script>

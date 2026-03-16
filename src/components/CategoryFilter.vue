<template>
  <div class="mb-8">
    <select
      v-model="selectedCategory"
      @change="emitFilter"
      class="w-full md:w-80 px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none text-lg"
    >
      <option value="">All Categories</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
        {{ cat.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  categories: Array,
});

const selectedCategory = ref("");
const emit = defineEmits(["filter"]);

const emitFilter = () => emit("filter", selectedCategory.value);
</script>

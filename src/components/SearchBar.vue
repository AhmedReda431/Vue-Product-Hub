<template>
  <div class="mb-6 search-holder">
    <input
      v-model="searchTerm"
      @input="emitSearch"
      type="text"
      placeholder="Search products by title..."
      class="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 text-lg"
    />
    <span class="remove-text" v-if="searchTerm" @click.stop="removeSearch"
      ><i class="material-icons" style="font-size: 36px">cancel</i></span
    >
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const searchTerm = ref("");
const emit = defineEmits(["search"]);

const emitSearch = () => emit("search", searchTerm.value);
const removeSearch = () => {
  searchTerm.value = null;
  emit("search", searchTerm.value);
};
// Optional debounce (uncomment if you want smoother search)
// let timeout;
// watch(searchTerm, () => {
//   clearTimeout(timeout);
//   timeout = setTimeout(() => emit("search", searchTerm.value), 300);
// });
</script>
<style scoped>
.search-holder {
  position: relative;
}
.remove-text {
  position: absolute;
  top: 3px;
  right: 35px;
  border-radius: 50%;
  padding: 10px;
  width: 20px;
  height: 20px;
  z-index: 2;
  cursor: pointer;
}
</style>

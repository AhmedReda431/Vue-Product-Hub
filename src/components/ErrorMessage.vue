<template>
  <div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center">
    {{ message || 'Something went wrong. Please try again.' }}
  </div>
</template>

<script setup>
defineProps({
  message: String
})
</script>
<template>
  <div 
    @click="$emit('click')"
    class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
  >
    <div class="aspect-square overflow-hidden">
      <img 
        :src="product.images[0]" 
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-lg line-clamp-2 h-12">{{ product.title }}</h3>
      <p class="text-sm text-gray-500 mt-1 product-category-name">{{ product.category.name }}</p>
      <div class="mt-3 flex items-center justify-between">
        <span class="text-2xl font-bold text-gray-900">${{ product.price }}</span>
        <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">In stock</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>
<style scoped>
.product-category-name{
  max-width: 200ch;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
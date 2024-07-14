<script setup lang="ts">
definePageMeta({
  name: 'home',
})
const divs = Array.from({ length: 500 })
</script>

<template>
  <div class="flex flex-wrap">
    <div v-for="(_, index) in divs" :key="index" class="w-16 h-16 border" />
  </div>
</template>

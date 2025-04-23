<script setup lang="ts">
definePageMeta({
  name: 'draw',
  middleware: 'auth',
})
</script>

<template>
  <section class="h-full flex flex-col">
    <h1 class="text-2xl w-full text-left font-bold mb-4">
      Draw Side
    </h1>
    <CanvasArea />
  </section>
</template>

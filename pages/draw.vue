<script setup lang="ts">
definePageMeta({
  name: 'draw',
  middleware: 'auth',
})
</script>

<template>
  <section class="w-full flex justify-center">
    <div class="h-full max-w-3xl flex flex-col overflow-auto">
      <h1 class="text-2xl text-left font-bold mb-4">
        Draw Side
      </h1>
      <CanvasArea />
    </div>
  </section>
</template>

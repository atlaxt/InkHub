<script setup lang="ts">
definePageMeta({
  name: 'draw',
  middleware: 'auth',
})
</script>

<template>
  <section id="canvas" class="w-full flex justify-center">
    <div class="h-full max-w-3xl md:flex hidden flex-col overflow-auto">
      <h1 class="text-2xl text-left font-bold mb-4">
        Draw Side
      </h1>
      <CanvasArea />
    </div>
    <div class="md:hidden flex text-center text-gray-500 p-4">
      Drawing is currently supported on desktop devices only. Please switch to a computer to start drawing.
    </div>
  </section>
</template>

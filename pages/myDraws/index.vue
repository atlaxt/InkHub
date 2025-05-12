<script setup lang="ts">
definePageMeta({
  name: 'myDraws',
  middleware: 'auth',
})

const drawingsStore = useDrawingsStore()
const authStore = useAuthStore()

onMounted(async () => {
  drawingsStore.drawings = []
  const uid = authStore.user?.uid
  if (!uid)
    return
  await drawingsStore.fetchDrawingsByUid(uid)
})
</script>

<template>
  <div class="flex flex-wrap gap-4 w-6xl mx-auto h-full">
    <DrawingCard
      v-for="drawing in drawingsStore.drawings"
      :key="drawing.id"
      class="flex-1"
      :drawing="drawing"
      delete-button
    />
  </div>
</template>

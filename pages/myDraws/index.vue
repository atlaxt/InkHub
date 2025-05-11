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
  <div class="flex flex-wrap gap-4 pb-2 overflow-y-auto">
    <DrawingCard
      v-for="drawing in drawingsStore.drawings"
      :key="drawing.id"
      class="lg:flex-1"
      :drawing="drawing"
    />
    <p v-if="!drawingsStore.drawings.length" class="text-center w-full text-sm text-gray-400">
      No Draw.
    </p>
  </div>
</template>

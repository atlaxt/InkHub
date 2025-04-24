<script setup lang="ts">
definePageMeta({
  name: 'myDraws',
  middleware: 'auth',
})

const drawingsStore = useDrawingsStore()
const authStore = useAuthStore()

async function loadMyDrawings() {
  const uid = authStore.user?.uid
  if (uid) {
    drawingsStore.resetDrawings()
    await drawingsStore.fetchMyDrawings(uid)
  }
}

onMounted(() => {
  loadMyDrawings()
})

watch(() => authStore.user?.uid, () => {
  loadMyDrawings()
})
</script>

<template>
  <div class="flex flex-wrap gap-4 pb-2 overflow-y-auto">
    <DrawingCard
      v-for="drawing in drawingsStore.myDrawings"
      :key="drawing.id"
      class="lg:flex-1"
      :drawing="drawing"
    />
    <p v-if="!drawingsStore.myDrawings.length" class="text-center w-full text-sm text-gray-400">
      No Draw.
    </p>
  </div>
</template>

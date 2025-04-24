<script setup lang="ts">
definePageMeta({
  name: 'home',
  path: '/',
})

const drawingsStore = useDrawingsStore()

async function loadMore() {
  await drawingsStore.fetchDrawings()
}

onMounted(async () => {
  drawingsStore.resetDrawings()
  await drawingsStore.fetchDrawings()
  loadMore()
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'home',
  path: '/',
})
const sentinel = ref<HTMLElement | null>(null)
const drawingsStore = useDrawingsStore()

let observer: IntersectionObserver

async function loadMore() {
  await drawingsStore.fetchDrawings()
}

onMounted(async () => {
  drawingsStore.resetDrawings()
  await drawingsStore.fetchDrawings()

  observer = new IntersectionObserver(async ([entry]) => {
    if (entry.isIntersecting) {
      await loadMore()
    }
  })

  if (sentinel.value instanceof HTMLElement) {
    observer.observe(sentinel.value)
  }
})

onBeforeUnmount(() => {
  observer.disconnect()
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
    <div ref="sentinel" class="w-full h-10" />
  </div>
</template>

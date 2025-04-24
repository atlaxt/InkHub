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
  <div class="justify-center h-full flex items-center flex-col gap-4">
    <div class="grid lg:grid-cols-2 grid-cols-1 w-full h-full gap-4 overflow-y-auto">
      <DrawingCard
        v-for="drawing in drawingsStore.drawings"
        :key="drawing.id"
        class="max-h-[360px] min-h-[360px] flex-1"
        :drawing="drawing"
      />
    </div>
  </div>
</template>

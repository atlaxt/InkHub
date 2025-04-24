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
    <div class="grid grid-cols-2 w-full h-full overflow-auto">
      <DrawingCard
        v-for="drawing in drawingsStore.drawings"
        :key="drawing.id"
        class="max-h-[360px] min-h-[360px]"
        :drawing="drawing"
      />
    </div>
    <UButton color="neutral" label="Daha fazla yükle" :disabled="drawingsStore.loading" @click="loadMore" />
  </div>
</template>

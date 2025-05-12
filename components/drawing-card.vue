<script setup lang="ts">
import type { DrawingMeta } from '~/types'
import { USkeleton } from '#components'
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage'

const props = defineProps<{ drawing: DrawingMeta, deleteButton?: boolean }>()
const drawingStore = useDrawingsStore()
const imageUrl = ref<string>('')
const loadingImage = ref(true)

const drawing = ref({ ...props.drawing })

onMounted(async () => {
  try {
    const storage = getStorage()
    const imageRef = storageRef(storage, props.drawing.imagePath)
    imageUrl.value = await getDownloadURL(imageRef)
  }
  catch (err) {
    console.warn('Error:', err)
  }
  finally {
    loadingImage.value = false
  }
})
</script>

<template>
  <div
    v-if="!loadingImage && imageUrl"
    class="md:min-w-64 min-w-64 md:max-w-64 max-h-74 p-2 gap-2 flex flex-col rounded-lg overflow-hidden shadow-md border dark:border-zinc-700 border-zinc-200 bg-white dark:bg-zinc-900"
  >
    <img
      :src="imageUrl"
      class="object-cover rounded h-full"
      alt="drawing"
    >

    <div class="flex items-center justify-between gap-2">
      <UButton
        v-if="props.deleteButton"
        icon="lucide:trash" color="error" variant="link" @click="async () => {
          await drawingStore.deleteDrawing(props.drawing.id, props.drawing.imagePath)
          drawingStore.resetDrawings()
          await drawingStore.fetchDrawingsByUid(useAuthStore().user?.uid as string)
        }"
      />
      <div v-else />
      <div class="flex items-center flex-row gap-2">
        <p class="text-sm font-medium">
          {{ drawing.displayName ?? 'Anonymous' }}
        </p>
        <img
          v-if="drawing.photoURL"
          :src="drawing.photoURL"
          class="w-6 h-6 rounded-full"
          alt="user"
        >
      </div>
    </div>
  </div>

  <USkeleton v-else class="min-w-64 max-w-64 h-[250px] rounded-lg" />
</template>

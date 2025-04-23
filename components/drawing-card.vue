<script setup lang="ts">
import type { DrawingMeta } from '~/types'
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage'

// Props ve store
const props = defineProps<{ drawing: DrawingMeta }>()
const auth = useAuthStore()
const drawingsStore = useDrawingsStore()

// Görsel URL'si
const imageUrl = ref<string | null>(null)
onMounted(async () => {
  const storage = getStorage()
  const imageRef = storageRef(storage, props.drawing.imagePath)
  imageUrl.value = await getDownloadURL(imageRef)
})

// Local reaktif state (mutation yapılabilir versiyon)
const drawing = ref({ ...props.drawing })

// Oy durumu
const voteKey = computed(() => `vote_${auth.user?.uid}_${drawing.value.id}`)
const userVote = ref<'like' | 'dislike' | null>(null)

// LocalStorage'dan daha önceki oy varsa oku
onMounted(() => {
  const saved = localStorage.getItem(voteKey.value)
  if (saved === 'like' || saved === 'dislike')
    userVote.value = saved
})

// Oy işlemi
function toggleVote(type: 'like' | 'dislike') {
  if (!auth.user || !drawing.value.id)
    return

  const id = drawing.value.id

  if (userVote.value === type) {
    // Aynı oya tekrar basıldıysa kaldır
    localStorage.removeItem(voteKey.value)
    userVote.value = null
    if (type === 'like')
      drawing.value.likes--
    else drawing.value.dislikes--
  }
  else {
    // Önce önceki oyu kaldır
    if (userVote.value === 'like')
      drawing.value.likes--
    if (userVote.value === 'dislike')
      drawing.value.dislikes--

    // Yeni oyu ekle
    localStorage.setItem(voteKey.value, type)
    userVote.value = type
    if (type === 'like') {
      drawing.value.likes++
      drawingsStore.likeDrawing(id)
    }
    else {
      drawing.value.dislikes++
      drawingsStore.dislikeDrawing(id)
    }
  }
}
</script>

<template>
  <div class="rounded-lg overflow-hidden shadow-md border dark:border-zinc-700 border-zinc-200 bg-white dark:bg-zinc-900 w-full">
    <!-- Görsel -->
    <img
      v-if="imageUrl"
      :src="imageUrl"
      class="w-full h-64 object-cover"
      alt="drawing"
    >

    <!-- İçerik -->
    <div class="p-4 space-y-3">
      <!-- Kullanıcı bilgisi -->
      <div class="flex items-center gap-2">
        <img
          v-if="drawing.photoURL"
          :src="drawing.photoURL"
          class="w-8 h-8 rounded-full"
          alt="user"
        >
        <p class="text-sm font-medium">
          {{ drawing.displayName ?? 'Anonymous' }}
        </p>
      </div>

      <!-- Beğeni / Beğenmeme -->
      <div class="flex justify-between text-sm text-zinc-500">
        <!-- Like -->
        <button
          class="flex items-center gap-1"
          :class="userVote === 'like' ? 'text-green-500 font-bold' : 'hover:text-green-500'"
          @click="toggleVote('like')"
        >
          <Icon name="lucide:thumbs-up" class="w-4 h-4" />
          {{ drawing.likes }}
        </button>

        <!-- Dislike -->
        <button
          class="flex items-center gap-1"
          :class="userVote === 'dislike' ? 'text-red-500 font-bold' : 'hover:text-red-500'"
          @click="toggleVote('dislike')"
        >
          <Icon name="lucide:thumbs-down" class="w-4 h-4" />
          {{ drawing.dislikes }}
        </button>
      </div>
    </div>
  </div>
</template>

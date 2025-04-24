<script setup lang="ts">
import type { DrawingMeta } from '~/types'
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage'

const props = defineProps<{ drawing: DrawingMeta }>()
const auth = useAuthStore()
// const drawingsStore = useDrawingsStore()

const imageUrl = ref<string | null>(null)

const drawing = ref({ ...props.drawing })

const voteKey = computed(() => `vote_${auth.user?.uid}_${drawing.value.id}`)
const userVote = ref<'like' | 'dislike' | null>(null)

// async function toggleVote(type: 'like' | 'dislike') {
//   if (!auth.user || !drawing.value.id)
//     return

//   const id = drawing.value.id

//   if (userVote.value === type) {
//     // Oyu kaldır
//     localStorage.removeItem(voteKey.value)
//     userVote.value = null

//     // Optional: İstersen burada firestore'dan 1 eksiltme fonksiyonu yazarsın
//   }
//   else {
//     // Eğer daha önce farklı bir oy verdiyse onu geri al
//     if (userVote.value === 'like')
//       drawing.value.likes--
//     if (userVote.value === 'dislike')
//       drawing.value.dislikes--

//     // Yeni oyu işle
//     userVote.value = type
//     localStorage.setItem(voteKey.value, type)

//     if (type === 'like') {
//       await drawingsStore.likeDrawing(id)
//       drawing.value.likes++
//     }
//     else {
//       await drawingsStore.dislikeDrawing(id)
//       drawing.value.dislikes++
//     }
//   }
// }

onMounted(async () => {
  const storage = getStorage()
  const imageRef = storageRef(storage, props.drawing.imagePath)
  imageUrl.value = await getDownloadURL(imageRef)

  const saved = localStorage.getItem(voteKey.value)
  if (saved === 'like' || saved === 'dislike')
    userVote.value = saved
})
</script>

<template>
  <div class="min-w-64 p-2 gap-2 flex flex-col rounded-lg overflow-hidden shadow-md border dark:border-zinc-700 border-zinc-200 bg-white dark:bg-zinc-900">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      class="object-cover rounded"
      alt="drawing"
    >

    <div class="flex items-center justify-end gap-2">
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

    <!-- <div class="flex justify-between text-sm text-zinc-500">
        <UButton
          :disabled="!auth.user || drawingsStore.loading"
          variant="link"
          class="flex items-center gap-1"
          :class="userVote === 'like' ? 'text-green-500 font-bold' : 'hover:text-green-500'"
          @click="toggleVote('like')"
        >
          <Icon name="lucide:thumbs-up" class="w-4 h-4" />
          {{ drawing.likes }}
        </UButton>

        <UButton
          :disabled="!auth.user || drawingsStore.loading"
          variant="link"
          class="flex items-center gap-1"
          :class="userVote === 'dislike' ? 'text-red-500 font-bold' : 'hover:text-red-500'"
          @click="toggleVote('dislike')"
        >
          <Icon name="lucide:thumbs-down" class="w-4 h-4" />
          {{ drawing.dislikes }}
        </UButton>
      </div> -->
  </div>
</template>

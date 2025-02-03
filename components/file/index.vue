<script setup lang="ts">
const isHover = ref<boolean>(false)
const isClick = ref<boolean>(false)
const containerRef = ref<HTMLElement | null>(null)

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isClick.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="containerRef"
    class="flex flex-col items-center py-1 rounded-lg w-[76px] cursor-pointer"
    :class="{ 'bg-gray-800/50': isHover || isClick }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click="isClick = true"
  >
    <UIcon
      name="heroicons:folder-solid"
      class="text-5xl"
    />
    <p>File</p>
  </div>
</template>

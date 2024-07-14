<script setup lang="ts">
definePageMeta({
  name: 'home',
})

const osStore = useOsStore()
const divs = Array.from({ length: 30 })

const desktopPosition = computed(() => {
  return osStore.osBarUi.position.align.value === 'bottom' ? 'marginBottom' : 'marginTop'
})
</script>

<template>
  <div class="h-full w-full p-5">
    <div
      :style="{ [desktopPosition]: '70px' }"
      class="flex h-full w-full flex-wrap gap-3"
      style="align-content: start;"
    >
      <div
        v-for="(_, index) in divs"
        :key="index"
        class="min-h-16 max-h-36"
        :style="`width: ${osStore.desktopUi.folder.size.value}px;`"
      >
        <FileIconDesktop />
      </div>
    </div>
  </div>
</template>

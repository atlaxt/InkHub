<script setup lang="ts">
import { useMouse, useWindowScroll } from '@vueuse/core'

definePageMeta({
  name: 'home',
})




const osStore = useOsStore()
const fileStore = useFileStore()

const desktopPosition = computed(() => {
  return osStore.osBarUi.position.align.value === 'bottom' ? 'marginBottom' : 'marginTop'
})

const { x, y } = useMouse()
const { y: windowY } = useWindowScroll()

const isOpen = ref(false)
const virtualElement = ref({ getBoundingClientRect: () => ({}) })

function onContextMenu() {
  const top = unref(y) - unref(windowY)
  const left = unref(x)

  virtualElement.value.getBoundingClientRect = () => ({
    width: 0,
    height: 0,
    top,
    left,
  })






  isOpen.value = true
}
</script>

<template>
  <div class="h-full w-full p-5" @contextmenu.prevent="onContextMenu">
    <div
      v-if="osStore.showDesktop"
      :style="{ [desktopPosition]: '80px' }"
      class="flex h-full w-full flex-wrap flex-col gap-3"
      style="align-content: start;"
    >
      <div
        v-for="(_, index) in fileStore.files"
        :key="index"
        class="min-h-16 max-h-36"
        :style="`width: ${fileStore.fileUi.folder.size.value}px;`"
      >
        <FileIconDesktop />
      </div>
    </div>

    <UContextMenu v-model="isOpen" :virtual-element="virtualElement">
      <OsContext @click="isOpen = false" />
    </UContextMenu>
  </div>
</template>

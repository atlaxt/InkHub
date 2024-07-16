<script setup lang="ts">
import { useMouse, useWindowScroll } from '@vueuse/core'

const { x, y } = useMouse()
const { y: windowY } = useWindowScroll()

const fileStore = useFileStore()

const fileFontSize = computed(() => fileStore.fileUi.folder.size.value / 5)

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
  <div
    class="relative rounded-lg select-none"
    @contextmenu.prevent="onContextMenu"
  >
    <div class="w-full px-2 flex flex-col overflow-hidden rounded-lg hover:bg-gray-800/25">
      <img
        class="w-full"
        :src="fileStore.fileUi.folder.icon.value"
      >
      <article class="text-center drop">
        <p
          :style="`font-size: ${fileFontSize}px;`"
          class="text-white"
        >
          Test Folder
        </p>
      </article>
    </div>

    <UContextMenu
      v-model="isOpen"
      :virtual-element="virtualElement"
    >
      <FileContext />
    </UContextMenu>
  </div>
</template>

<style scoped>
p {
  text-shadow: 2px 2px 3px #000000;
}
</style>

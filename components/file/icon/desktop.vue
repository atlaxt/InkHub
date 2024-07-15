<script setup lang="ts">
import { useMouse, useWindowScroll } from '@vueuse/core'

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
  <div
    class="relative hover:border rounded-lg hover:bg-gray-700 select-none"
    @contextmenu.prevent="onContextMenu"
  >
    <div class="w-full px-2 flex flex-col overflow-hidden">
      <img class="w-full" src="../../../assets/icons/file/default.svg">
      <article class="text-pretty text-center drop">
        <p class="font-shadow">
          Test Folder
        </p>
      </article>
    </div>

    <UContextMenu v-model="isOpen" :virtual-element="virtualElement">
      <FileContext />
    </UContextMenu>
  </div>
</template>

<style scoped>
p {
  text-shadow: 2px 2px 4px #000000;
}
</style>

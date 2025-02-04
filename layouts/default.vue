<script setup lang="ts">
import { useMouse, useWindowScroll } from '@vueuse/core'

const osStore = useOsStore()

const { x, y } = useMouse()
const { y: windowY } = useWindowScroll()

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
  osStore.openContextMenu('desktop')
}

const items = computed(() => {
  const temp = []

  if (osStore.contextMenu.desktop) {
    temp.push([
      [{
        label: 'Refresh',
        icon: 'heroicons:arrow-path',
      }, {
        label: 'New File',
        icon: 'i-heroicons-pencil-square-20-solid',
      }],
      [{
        label: 'Terminal',
        icon: 'heroicons:command-line',
      }],
    ])
  }

  if (osStore.contextMenu.bar) {
    temp.push([
      [{
        label: 'Foxian About',
        icon: 'token:rfox',
        disabled: true,
      }],
      [{
        label: 'Task Bar Settings',
        icon: 'i-heroicons-pencil-square-20-solid',
        shortcuts: ['S'],
        disabled: true,
      }, {
        label: 'Task Manager',
        icon: 'i-heroicons-document-duplicate-20-solid',
        shortcuts: ['M'],
        disabled: true,
      }],
    ])
  }

  if (osStore.contextMenu.file) {
    temp.push([
      [{
        label: 'Open',
        icon: 'heroicons:folder-open',
        disabled: true,
      }],
      [{
        label: 'Rename',
        icon: 'heroicons:pencil-square-20-solid',
        shortcuts: ['S'],
        disabled: true,
      }],
    ])
  }

  return []
})
</script>

<template>
  <div
    :class="{
      'flex-col-reverse': osStore.bar.position === 'top',
      'flex-col': osStore.bar.position === 'bottom',
      'flex-row': osStore.bar.position === 'right',
      'flex-row-reverse': osStore.bar.position === 'left',
    }"
    class="flex animation-all duration-100 delay-100 fixed top-0 left-0 w-screen h-screen"
    @contextmenu.prevent="onContextMenu"
  >
    <img class="-z-10 brightness-75 absolute left-0 top-0 w-full h-full" :src="osStore.wallpaper">
    <div
      class="w-full h-full"
    >
      <slot />
    </div>
    <Bar />

    <UContextMenu v-model="osStore.contextMenu.desktop" :virtual-element="virtualElement">
      <UDropdown v-model:open="osStore.contextMenu.desktop" :items="items" :popper="{ placement: 'bottom-start' }">
        <div class="max-w-[0px] max-h-[0px] overflow-hidden" />
      </UDropdown>
    </UContextMenu>
  </div>
</template>

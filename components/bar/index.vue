<script setup lang="ts">
import { useMouse, useWindowScroll } from '@vueuse/core'

const colorMode = useColorMode()
const osStore = useOsStore()

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

const items = [
  [{
    label: 'Fox Os About',
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
]
</script>

<template>
  <div
    :class="{
      'm-2': osStore.bar.mode === 'hover',
    }"
  >
    <div
      :class="{
        'w-full flex-row': osStore.bar.position === 'top' || osStore.bar.position === 'bottom',
        'h-full flex-col': osStore.bar.position === 'right' || osStore.bar.position === 'left',
        'rounded-lg': osStore.bar.mode === 'hover',
      }"
      class="flex items-center gap-4 px-4 py-1 dark:bg-gray-900 bg-gray-200"
      @contextmenu.prevent="onContextMenu"
    >
      <BarMenu />

      <UButton
        variant="link"
        :icon="colorMode.value === 'dark' ? 'heroicons:sun' : 'heroicons:moon'"
        @click="() => {
          colorMode.value === 'dark'
            ? colorMode.preference = 'light'
            : colorMode.preference = 'dark'
        }"
      />

      <USelectMenu v-model="osStore.bar.position" :options="osStore.barPositionsOptions" />
      <USelectMenu v-model="osStore.bar.mode" :options="osStore.barModeOptions" />

      <UContextMenu v-model="isOpen" :virtual-element="virtualElement">
        <UDropdown v-model:open="isOpen" :items="items" :popper="{ placement: 'bottom-start' }">
          <div class="w-[0px] h-[0px] overflow-hidden" />
        </UDropdown>
      </UContextMenu>
    </div>
  </div>
</template>

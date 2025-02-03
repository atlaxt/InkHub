<script setup lang="ts">
const colorMode = useColorMode()
const osStore = useOsStore()
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
    </div>
  </div>
</template>

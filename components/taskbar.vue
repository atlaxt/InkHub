<script setup lang="ts">
const osStore = useOsStore()
</script>

<template>
  <div
    v-if="osStore.taskBarUi.position.align.value === 'top' || osStore.taskBarUi.position.align.value === 'bottom'"
    :class="`fixed ${osStore.taskBarUi.position.align.value}-0 left-0 flex justify-${osStore.taskBarUi.position.justify.value} w-full`"
  >
    <div
      class="bg-white shadow-2xl dark:bg-gray-900
    divide-y divide-gray-200 dark:divide-gray-800
    ring-gray-200 dark:ring-gray-800"
      :class="
        osStore.taskBarUi.hover ? `my-2 mx-4 rounded${osStore.currentHoverRounded} px-3 py-2 ${osStore.currentOpacity} ${osStore.taskBarUi.minimal ? '' : 'w-full'}` : `py-2 px-3 ${osStore.currentOpacity}  ${osStore.taskBarUi.minimal ? '' : 'w-full'}`"
    >
      <div class="flex items-center gap-4 justify-between">
        <UPopover v-model:open="osStore.osMenuOpen" :popper="{ placement: 'top-start' }">
          <UButton icon="i-heroicons-bug-ant" class="rounded-full" />
          <template #panel>
            <OsMenu />
          </template>
        </UPopover>
      </div>
    </div>
  </div>
</template>

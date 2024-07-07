<script setup lang="ts">
const osStore = useOsStore()

const osBarClass = computed(() => {
  const align = osStore.osBarUi.position.align.value
  const justify = osStore.osBarUi.position.justify.value
  const opacity = osStore.currentOpacity
  return `fixed ${align}-0 left-0 flex justify-${justify} w-full ${opacity}`
})

const osBarInnerClass = computed(() => {
  const hover = osStore.osBarUi.hover
  const currentHoverRounded = osStore.currentHoverRounded
  const minimal = osStore.osBarUi.minimal

  return hover
    ? `my-2 mx-4 rounded${currentHoverRounded} px-3 py-2 ${minimal ? '' : 'w-full'}`
    : `py-2 px-3 ${minimal ? '' : 'w-full'}`
})
</script>

<template>
  <div :class="osBarClass">
    <div
      class="bg-white shadow-2xl dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800 ring-gray-200 dark:ring-gray-800"
      :class="osBarInnerClass"
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

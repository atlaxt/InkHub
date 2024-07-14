<script setup lang="ts">
const osStore = useOsStore()

const osBarClass = computed(() => {
  const align = osStore.osBarUi.position.align.value
  const justify = osStore.osBarUi.position.justify.value
  return `fixed ${align}-0 left-0 flex justify-${justify} w-full`
})

const opacityStyle = computed(() => {
  const opacity = `${Math.abs(osStore.osBarUi.opacity * 5 - 100)}`
  return `opacity: 0.${Number.parseInt(opacity) === 100 ? 99.9 : opacity};`
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
  <div :style="opacityStyle" :class="osBarClass">
    <div
      class="bg-white shadow-2xl dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800 ring-gray-200 dark:ring-gray-800"
      :class="osBarInnerClass"
    >
      <div class="flex items-center gap-4 justify-between">
        <div class="flex items-center gap-4">
          <UPopover v-model:open="osStore.osMenuOpen" :popper="{ placement: 'top-start' }">
            <div class="flex justify-between w-full items-center">
              <UButton icon="i-heroicons-bug-ant" class="rounded-full" />
            </div>
            <template #panel>
              <OsMenu />
            </template>
          </UPopover>
          <!-- taskbar folders -->
        </div>
        <div class="flex gap-4 items-center">
          <OsNotification />
          <OsCalendar />
        </div>
      </div>
    </div>
  </div>
</template>

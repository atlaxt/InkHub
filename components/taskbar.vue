<script setup lang="ts">
import type { TaskBarUi } from '~/types'

const taskBarUi = ref<TaskBarUi>({
  minimal: true,
  position: {
    justify: {
      value: 'center',
      options: ['start', 'center', 'end'],
    },
    align: {
      value: 'bottom',
      options: ['left', 'right', 'bottom', 'top'],
    },
  },
  hover: {
    disable: true,
    rounded: 4,
  },
  opacity: 2,
})

const currentHoverRounded = computed(() => {
  switch (taskBarUi.value.hover.rounded) {
    case 0:
      return '-none'
    case 1:
      return '-sm'
    case 2:
      return ''
    case 3:
      return '-md'
    case 4:
      return '-lg'
    case 5:
      return '-xl'
    case 6:
      return '-2xl'
    case 7:
      return '-3xl'
    case 8:
      return '-full'
    default:
      return '-none'
  }
})

const currentOpacity = computed(() => {
  return `opacity${taskBarUi.value.opacity * 5 - 100}`
})
</script>

<template>
  <div :class="`fixed fixed bottom-0 left-0 flex justify-${taskBarUi.position.justify.value} w-full`">
    <div
      class="bg-white shadow-2xl dark:bg-gray-900
    divide-y divide-gray-200 dark:divide-gray-800
    ring-gray-200 dark:ring-gray-800"
      :class="
        taskBarUi.hover.disable ? `mb-2 mx-2 rounded${currentHoverRounded} px-3 py-2 ${currentOpacity} ${!taskBarUi.minimal ? '' : 'w-full'}` : `py-2 px-3 ${currentOpacity}  ${!taskBarUi.minimal ? '' : 'w-full'}`"
    >
      <div class="flex gap-4 justify-between">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
        />
        <ChangeTheme />
        <USelectMenu v-model="taskBarUi.position.justify.value" :disabled="taskBarUi.minimal" class="w-36" :options="taskBarUi.position.justify.options" />
        <URange v-model="taskBarUi.hover.rounded" class="w-36" :min="0" :max="8" />
        <URange v-model="taskBarUi.opacity" class="w-36" :min="0" :max="12" />
        <UCheckbox label="minimal" @click="taskBarUi.minimal = !taskBarUi.minimal" />
        <UCheckbox label="hover" @click="taskBarUi.hover.disable = !taskBarUi.hover.disable" />
      </div>
    </div>
  </div>
</template>

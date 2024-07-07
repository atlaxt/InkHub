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
      options: ['bottom', 'top'],
    },
  },
  hover: true,
  rounded: 4,
  opacity: 2,
})

const currentHoverRounded = computed(() => {
  switch (taskBarUi.value.rounded) {
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
  <div
    v-if="taskBarUi.position.align.value === 'top' || taskBarUi.position.align.value === 'bottom'"
    :class="`fixed ${taskBarUi.position.align.value}-0 left-0 flex justify-${taskBarUi.position.justify.value} w-full`"
  >
    <div
      class="bg-white shadow-2xl dark:bg-gray-900
    divide-y divide-gray-200 dark:divide-gray-800
    ring-gray-200 dark:ring-gray-800"
      :class="
        taskBarUi.hover ? `m-2 rounded${currentHoverRounded} px-3 py-2 ${currentOpacity} ${taskBarUi.minimal ? '' : 'w-full'}` : `py-2 px-3 ${currentOpacity}  ${taskBarUi.minimal ? '' : 'w-full'}`"
    >
      <div class="flex items-center gap-4 justify-between">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
        />
        <ChangeTheme />
        <div class="flex items-center gap-2">
          <label> Justify: </label>
          <USelectMenu v-model="taskBarUi.position.justify.value" :disabled="taskBarUi.minimal" class="w-36" :options="taskBarUi.position.justify.options" />
        </div>
        <div class="flex items-center gap-2">
          <label> Align: </label>
          <USelectMenu v-model="taskBarUi.position.align.value" class="w-36" :options="taskBarUi.position.align.options" />
        </div>
        <URange v-model="taskBarUi.rounded" class="w-36" :min="0" :max="8" />
        <URange v-model="taskBarUi.opacity" class="w-36" :min="0" :max="12" />
        <UCheckbox v-model="taskBarUi.minimal" label="minimal" @click="taskBarUi.minimal = !taskBarUi.minimal" />
        <UCheckbox v-model="taskBarUi.hover" label="hover" @click="taskBarUi.hover = !taskBarUi.hover" />
      </div>
    </div>
  </div>
</template>

import type { OsMenuSelectedWindow, TaskBarUi } from '~/types'

export const useOsStore = defineStore('os', () => {
  const osMenuOpen = ref<boolean>(false)

  const osMenuSelectedWindow = ref<OsMenuSelectedWindow>('settings')

  const taskBarUi = ref<TaskBarUi>({
    minimal: false,
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

  return {
    osMenuOpen,
    osMenuSelectedWindow,
    taskBarUi,
    currentHoverRounded,
    currentOpacity,
  }
})

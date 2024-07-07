export interface TaskBarUi {
  minimal: boolean
  position: {
    justify: {
      value: 'start' | 'center' | 'end'
      options: ['start', 'center', 'end']
    }
    align: {
      value: 'left' | 'right' | 'bottom' | 'top'
      options: ['bottom', 'top']
      // options: ['left', 'right', 'bottom', 'top']
    }
  }
  hover: boolean
  rounded: number
  opacity: number
}

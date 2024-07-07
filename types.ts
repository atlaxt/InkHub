export interface TaskBarUi {
    minimal: boolean,
    position: {
      justify: {
        value: 'start' | 'center' | 'end',
        options: ['start', 'center', 'end'],
      },
      align: {
        value: 'left' | 'right' | 'bottom' | 'top',
        options: ['left', 'right', 'bottom', 'top'],
      },
    },
    hover: {
      disable: boolean,
      rounded: number,
    },
    opacity: number,
  }
  
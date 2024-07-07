export interface OsBarUi {
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

export interface OsMenuOptions {
  name: string
}

export type OsMenuSelectedWindow = 'settings' | 'theme' | ''

export interface Wallpaper {
  img: string
  id: string
  favorite: boolean
}

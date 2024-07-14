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
    }
  }
  hover: boolean
  rounded: number
  opacity: number
}

export interface FontUi {
  value: {
    name: string,
    style: string,
    weight: number,
    size: string,
  },
  options:{
    name: ['montserrat', 'opansans'],
    style: ['normal','italic'],
    weight: ['100','200','400','500','600','700','800','900'],
    size: ['text-xs','text-sm' , 'text-md', 'text-lg','text-xl','text-2xl','text-3xl']
  }
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

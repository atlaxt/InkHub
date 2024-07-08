import { wallpapersBase64 } from '~/assets/image/wallpapers'
import type { OsMenuSelectedWindow, OsBarUi, Wallpaper } from '~/types'

export const useOsStore = defineStore('os', () => {
  const osMenuOpen = ref<boolean>(false)
  const setId = () => {
    return useId()
  }

  const systemDate = computed(() => new Date())
  const osCurrentDate = ref<Date>(systemDate.value)

  const osMenuSelectedWindow = ref<OsMenuSelectedWindow>('settings')

  const osBarUi = ref<OsBarUi>({
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
    switch (osBarUi.value.rounded) {
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
    return `opacity${osBarUi.value.opacity * 5 - 100}`
  })

  const wallpapers = ref<Wallpaper[]>(
    [
      {
        img: setBase64String(wallpapersBase64[0]),
        favorite: false,
        id: setId(),
      },
      {
        img: setBase64String(wallpapersBase64[1]),
        favorite: false,
        id: setId(),
      },
      {
        img: setBase64String(wallpapersBase64[2]),
        favorite: false,
        id: setId(),
      },
      {
        img: setBase64String(wallpapersBase64[3]),
        favorite: false,
        id: setId(),
      },
    ],
  )
  const currentWallpaper = ref<Wallpaper>(wallpapers.value[0])

  const fontUi = ref({
    value: {
      name: 'montserrat',
      style: 'normal',
      weight: 400,
    },

    options:{
      name: ['montserrat', 'opansans'],
      style: ['normal','italic'],
      weight: ['100','200','400','500','600','700','800','900']
    }
  })

  return {
    systemDate,
    osCurrentDate,
    osMenuOpen,
    osMenuSelectedWindow,
    osBarUi,
    currentHoverRounded,
    currentOpacity,
    wallpapers,
    currentWallpaper,
    fontUi,
  }
})

import wp1 from '../assets/wallpapers/wp1.jpg'

export const useOsStore = defineStore('os', () => {
  const wallpaperOptions = [wp1]
  const wallpaper = wallpaperOptions[0]

  const barPositionsOptions = ['top', 'bottom', 'left', 'right']

  const barModeOptions = ['block', 'hover']

  const bar = ref({
    mode: 'block',
    position: 'bottom',
  })

  const contextMenu = ref<Record<'bar' | 'file' | 'desktop', boolean>>({
    bar: false,
    file: false,
    desktop: false,
  })

  const openContextMenu = (type: 'bar' | 'file' | 'desktop') => {
    Object.keys(contextMenu.value).forEach((key) => {
      contextMenu.value[key as keyof typeof contextMenu.value] = key === type
    })
  }

  return {
    wallpaperOptions,
    wallpaper,

    barPositionsOptions,
    barModeOptions,
    bar,

    contextMenu,
    openContextMenu,
  }
})

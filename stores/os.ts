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

  return {
    wallpaperOptions,
    wallpaper,

    barPositionsOptions,
    barModeOptions,
    bar,
  }
})

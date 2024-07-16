import FileIconDefault from '~/assets/icons/file/default.svg'

export const useFileStore = defineStore('files', () => {
  const fileUi = ref({
    folder: {
      icon: {
        value: FileIconDefault,
        options: [''],
      },
      size: {
        value: 80,
        options: {
          min: 50,
          max: 120,
        },
      },
    },
  })

  const files = Array.from({ length: 15 })
  return {
    files,
    fileUi,
  }
})

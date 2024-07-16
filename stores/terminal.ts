export const useTerminalStore = defineStore('terminal', () => {
  const terminalIsOpen = ref<boolean>(false)

  return {
    terminalIsOpen,
  }
})

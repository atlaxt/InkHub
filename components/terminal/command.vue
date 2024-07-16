<script setup lang="ts">
import TerminalService from 'primevue/terminalservice'
import Terminal from 'primevue/terminal'

onMounted(() => {
  TerminalService.on('command', commandHandler)
})

onBeforeUnmount(() => {
  TerminalService.off('command', commandHandler)
})

const commandHandler = (text: string) => {
  let response
  const argsIndex = text.indexOf(' ')
  const command = argsIndex !== -1 ? text.substring(0, argsIndex) : text

  switch (command) {
    case 'date':
      response = 'Today is ' + new Date().toDateString()
      break

    case 'greet':
      response = 'Hola ' + text.substring(argsIndex + 1)
      break

    case 'random':
      response = Math.floor(Math.random() * 100)
      break

    default:
      response = 'Unknown command: ' + command
  }

  TerminalService.emit('response', response)
}
</script>

<template>
  <UContainer class="w-full h-full bg-primary-400 px-1 py-2 opacity-70 p-5">
    <Terminal
      welcome-message="Welcome to PrimeVue"
      prompt="primevue $"
      aria-label="PrimeVue Terminal Service"
    />
  </UContainer>
</template>

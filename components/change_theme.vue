<template>
  <UToggle
    on-icon="i-heroicons-sun"
    off-icon="i-heroicons-moon"
    :model-value="$colorMode.preference === 'light'"
    @click="() => {
      $colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'
    }"
  />
</template>

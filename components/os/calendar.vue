<script setup lang="ts">
const osStore = useOsStore()
</script>

<template>
  <label> {{ osStore.osCurrentDate }} </label>
</template>

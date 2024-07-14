<script setup lang="ts">
const osStore = useOsStore()
</script>

<template>
  <label> {{ getPlaceHolderDateFormat(osStore.osCurrentDate.toString(), true) }} </label>
</template>

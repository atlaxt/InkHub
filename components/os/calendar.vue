<script setup lang="ts">
const osStore = useOsStore()
</script>

<template>
  <div class="flex flex-col items-end text-sm hover:text-primary-400 cursor-pointer">
    <div> {{ `${formatTwoDigits(osStore.osCurrentDate.getHours())} : ${formatTwoDigits(osStore.osCurrentDate.getMinutes())}` }} </div>
    <div> {{ getPlaceHolderDateFormat(osStore.osCurrentDate.toString(), true) }} </div>
  </div>
</template>

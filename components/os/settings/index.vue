<template>
  <UCard>
    <template #header>
      <div class="flex w-full justify-center items-center gap-2">
        <div class="i-heroicons-cog animate-spin flex text-xl" />
        <label> SETTINGS </label>
      </div>
    </template>
    <div class="flex flex-col gap-3">
      <OsSettingsOsBar />
      <UDivider />
      <OsSettingsFont />
    </div>
  </UCard>
</template>

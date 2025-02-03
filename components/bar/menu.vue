<script setup lang="ts">
</script>

<template>
  <UPopover
    :ui="{
      wrapper: 'relative',
      container: 'z-50 group',
      trigger: 'inline-flex w-full',
      width: 'w-[500px]',
      background: 'bg-white dark:bg-gray-900',
      shadow: 'shadow-lg',
      rounded: 'rounded-md',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
      base: 'h-[600px] overflow-hidden focus:outline-none relative',
      transition: {
        enterActiveClass: 'transition ease-out duration-200',
        enterFromClass: 'opacity-0 translate-y-1',
        enterToClass: 'opacity-100 translate-y-0',
        leaveActiveClass: 'transition ease-in duration-150',
        leaveFromClass: 'opacity-100 translate-y-0',
        leaveToClass: 'opacity-0 translate-y-1',
      },
      overlay: {
        base: 'fixed inset-0 transition-opacity z-50',
        background: 'bg-gray-200/75 dark:bg-gray-800/75',
        transition: {
          enterActiveClass: 'ease-out duration-200',
          enterFromClass: 'opacity-0',
          enterToClass: 'opacity-100',
          leaveActiveClass: 'ease-in duration-150',
          leaveFromClass: 'opacity-100',
          leaveToClass: 'opacity-0',
        },
      },
      popper: {
        strategy: 'fixed',
      },
      default: {
        openDelay: 0,
        closeDelay: 0,
      },
      arrow: {
        base: 'invisible before:visible before:block before:rotate-45 before:z-[-1] before:w-2 before:h-2',
        ring: 'before:ring-1 before:ring-gray-200 dark:before:ring-gray-800',
        rounded: 'before:rounded-sm',
        background: 'before:bg-gray-200 dark:before:bg-gray-800',
        shadow: 'before:shadow',
      },
    }
    "
  >
    <UButton variant="link" class="flex items-center justify-center text-xl">
      <Icon name="token:rfox" class="text-3xl" />
    </UButton>

    <template #panel>
      <div class="w-full h-full flex flex-col">
        <div class="h-full" />
        <UDivider />
        <div class="p-2 w-full flex items-center justify-end gap-2">
          <UButton icon="heroicons:cog" variant="outline" label="Settings" />
        </div>
      </div>
    </template>
  </UPopover>
</template>

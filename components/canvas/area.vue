<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const strokeColor = ref('#000000')
const backgroundColor = ref('#ffffff')
const lineWidth = ref(2)
const tool = ref<'pen' | 'eraser'>('pen')
const bgCanvasRef = ref<HTMLCanvasElement | null>(null)
const undoStack: ImageData[] = []
const redoStack: ImageData[] = []
let ctx: CanvasRenderingContext2D | null = null
let bgCtx: CanvasRenderingContext2D | null = null

function pushToUndoStack() {
  if (ctx && canvasRef.value) {
    const data = ctx.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height)
    undoStack.push(data)
    redoStack.length = 0
  }
}

const cancelQuestion = ref<boolean>(false)

function startDrawing(e: MouseEvent) {
  if (!ctx || !canvasRef.value)
    return
  pushToUndoStack()
  isDrawing.value = true
  ctx.beginPath()
  ctx.moveTo(e.offsetX, e.offsetY)
}

function draw(e: MouseEvent) {
  if (!isDrawing.value || !ctx)
    return
  ctx.strokeStyle = tool.value === 'eraser' ? backgroundColor.value : strokeColor.value
  ctx.lineWidth = lineWidth.value
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
}

function stopDrawing() {
  if (!ctx || !canvasRef.value)
    return
  isDrawing.value = false
  ctx.closePath()
  pushToUndoStack()
}

function undo() {
  if (!ctx || !canvasRef.value || undoStack.length === 0)
    return

  const last = undoStack.pop()!
  const current = ctx.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height)
  redoStack.push(current)

  ctx.putImageData(last, 0, 0)
}

function redo() {
  if (!ctx || !canvasRef.value || redoStack.length === 0)
    return

  const next = redoStack.pop()!
  const current = ctx.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height)
  undoStack.push(current)

  ctx.putImageData(next, 0, 0)
}

function clearCanvas() {
  if (ctx && canvasRef.value) {
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
    pushToUndoStack()
  }
}

function fillBackground() {
  if (!bgCtx || !bgCanvasRef.value)
    return
  bgCtx.fillStyle = backgroundColor.value
  bgCtx.fillRect(0, 0, bgCanvasRef.value.width, bgCanvasRef.value.height)
}
onMounted(() => {
  if (!canvasRef.value || !bgCanvasRef.value)
    return

  ctx = canvasRef.value.getContext('2d')
  bgCtx = bgCanvasRef.value.getContext('2d')

  if (ctx)
    ctx.lineCap = 'round'

  fillBackground()

  pushToUndoStack()

  canvasRef.value.addEventListener('mousedown', startDrawing)
  canvasRef.value.addEventListener('mouseup', stopDrawing)
  canvasRef.value.addEventListener('mouseleave', stopDrawing)
  canvasRef.value.addEventListener('mousemove', draw)
})

defineShortcuts({
  ctrl_z: {
    handler: undo,
    usingInput: true,
  },
  ctrl_y: {
    handler: redo,
    usingInput: true,
  },
})

function mergeCanvases(): HTMLCanvasElement | null {
  if (!canvasRef.value || !bgCanvasRef.value)
    return null

  const merged = document.createElement('canvas')
  merged.width = canvasRef.value.width
  merged.height = canvasRef.value.height

  const ctx = merged.getContext('2d')
  if (!ctx)
    return null

  ctx.drawImage(bgCanvasRef.value as HTMLCanvasElement, 0, 0)

  ctx.drawImage(canvasRef.value as HTMLCanvasElement, 0, 0)

  return merged
}

const approveModalIsOpen = ref(false)
const drawingStore = useDrawingsStore()
const auth = useAuthStore()
async function exportDrawingAsDataURL() {
  const mergedCanvas = mergeCanvases()
  if (!mergedCanvas || !auth.user)
    return

  await drawingStore.createDrawing({
    user: {
      displayName: auth.user.displayName ?? 'Anonymous',
      photoURL: auth.user.photoURL!,
      uid: auth.user.uid!,
    },
    draw: {
      base64: mergedCanvas.toDataURL('image/png'),
      replyTo: null,
    },
  }).then(() => {
    navigateTo({ name: 'home' })
    clearCanvas()
  })
}
</script>

<template>
  <div class="flex flex-col gap-4 w-full h-full overflow-auto ">
    <div class="flex lg:flex-row flex-col gap-4 w-full justify-between rounded-lg p-3 border dark:border-zinc-700 border-zinc-300 shadow dark:bg-zinc-900 bg-zinc-100">
      <div class="flex flex-col justify-between gap-4 w-full">
        <div class="flex flex-col gap-4">
          <UButtonGroup class="w-full">
            <UButton block color="neutral" class="w-full" label="Pencil" :variant="tool === 'pen' ? 'solid' : 'outline'" icon="lucide:brush" @click="tool = 'pen'" />
            <UButton block color="neutral" class="w-full" label="Eraser" :variant="tool === 'eraser' ? 'solid' : 'outline'" icon="lucide:eraser" @click="tool = 'eraser'" />
          </UButtonGroup>

          <USeparator />

          <UPopover>
            <UFormField label="Stroke Color" class="w-full">
              <UButtonGroup class="w-full">
                <UButton color="neutral" icon="lucide:brush" />
                <UButton :style="{ backgroundColor: strokeColor }" class="w-full" color="neutral" variant="outline" />
              </UButtonGroup>
            </UFormField>
            <template #content>
              <UColorPicker v-model="strokeColor" class="p-2" />
            </template>
          </UPopover>

          <UPopover>
            <UFormField label="Background Color" class="w-full">
              <UButtonGroup class="w-full">
                <UButton color="neutral" icon="lucide:paintbrush" />
                <UButton :style="{ backgroundColor }" class="w-full" color="neutral" variant="outline" />
              </UButtonGroup>
            </UFormField>
            <template #content>
              <UColorPicker v-model="backgroundColor" class="p-2" @update:model-value="fillBackground" />
            </template>
          </UPopover>

          <UFormField label="Line Width" class="w-full">
            <USlider v-model="lineWidth" :min="1" :max="20" />
          </UFormField>
        </div>

        <div class="flex flex-col gap-2">
          <UButtonGroup class="w-full">
            <UTooltip
              :content="{
                align: 'center',
                side: 'top',
              }" :delay-duration="0" :ui="{}"
            >
              <template #content>
                {{ "ctrl + z" }}
              </template>
              <UButton class="w-full" variant="outline" block color="neutral" icon="lucide:rotate-ccw" label="Undo" @click="undo" />
            </UTooltip>
            <UTooltip
              :content="{
                align: 'center',
                side: 'top',
              }" :delay-duration="0" :ui="{}"
            >
              <template #content>
                {{ "ctrl + y" }}
              </template>
              <UButton class="w-full" variant="outline" block color="neutral" icon="lucide:rotate-cw" label="Redo" @click="redo" />
            </UTooltip>
          </UButtonGroup>
          <USeparator />
          <UButton v-if="!cancelQuestion" color="error" label="Clear" variant="soft" block icon="lucide:eraser" @click="cancelQuestion = true" />
          <UButtonGroup v-else>
            <UButton color="error" label="Cancel" variant="soft" block icon="lucide:x" @click="cancelQuestion = false" />
            <UButton
              color="success" label="Clear" variant="soft" block icon="lucide:eraser" @click="() => {
                clearCanvas()
                cancelQuestion = false
              }"
            />
          </UButtonGroup>
        </div>
      </div>

      <div class="rounded-lg overflow-hidden relative min-w-[512px] max-w-[512px] min-h-[512px] max-h-[512px]">
        <canvas
          ref="bgCanvasRef" width="512" height="512"
          class="absolute top-0 left-0 z-0"
        />
        <canvas
          ref="canvasRef" width="512" height="512"
          class="absolute top-0 left-0 z-10"
          :class="{
          }"
        />
      </div>
    </div>
    <div class="w-full flex justify-end">
      <UModal
        v-model:open="approveModalIsOpen"
        title="Are you sure you want to submit your drawing?"
        :ui="{ footer: 'justify-end' }"
      >
        <UButton color="neutral" label="Send" icon="lucide:check" @click="approveModalIsOpen = true" />

        <template #body>
          <div class="w-full h-auto">
            <img
              v-if="mergeCanvases()"
              :src="mergeCanvases()?.toDataURL('image/png')"
              alt="Drawing Preview"
              class="w-full rounded border dark:border-zinc-700 border-zinc-300"
            >
          </div>
        </template>

        <template #footer>
          <UButton label="Cancel" color="error" icon="lucide:x" variant="outline" @click="approveModalIsOpen = false" />
          <UButton label="Submit" icon="lucide:check" color="success" @click="exportDrawingAsDataURL" />
        </template>
      </UModal>
    </div>
  </div>
</template>

<style scoped>

</style>

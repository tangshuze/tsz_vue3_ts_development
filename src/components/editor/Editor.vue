<template>
  <div ref="editorRef"></div>
</template>
<script lang="ts" setup>
import Editor from 'wangeditor'
import { initEditor } from './init'

const emit = defineEmits<{ (event: 'update:modelValue', value: string): void }>()
const props = defineProps<{ menus?: string[]; excludeMenu?: string[]; modelValue?: string; config?: any }>()

const editorRef = ref<HTMLDivElement>()
let editor: Editor


onMounted(() => {
  if (editorRef.value) {
    editor = initEditor(editorRef.value, { emit, props })
  }
})
onUnmounted(() => {
  editor.destroy()
})

</script>
<style lang="scss">
@keyframes wordsLoop {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.w-e-text {
  color: #000;

  ul {
    list-style: circle;
  }

  ol {
    list-style: decimal;
  }
}

.w-e-icon-pencil2+.w-e-droplist,
.w-e-icon-paint-brush+.w-e-droplist {
  .w-e-block {
    line-height: 1.6em;

    &>.w-e-item {
      padding: 0 5px !important;
      border: solid 2px #eee;
      box-sizing: border-box;
    }
  }
}
</style>
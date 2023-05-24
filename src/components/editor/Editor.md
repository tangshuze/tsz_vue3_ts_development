# usage

```vue
<template>
  <Editor v-model:value="val"></Editor>
</template>
<script lang="ts" setup>
import Editor from '@/components/editor/Editor.vue'
import { ref, watchEffect } from 'vue'
const val = ref('<p style="animation: 11s ease 0s infinite normal none running wordsLoop;">hello world</p>')
watchEffect(()=>{
  console.log(val.value)
})
</script>
<style lang="scss" scoped>

</style>
```
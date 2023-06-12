<template>
  <Editor :value="val" />
</template>
<script lang="ts" setup>
const val = ref('<p style="animation: 11s ease 0s infinite normal none running wordsLoop;">hello world</p>')
watchEffect(() => {
  console.log(val.value)
})
</script>
<style lang="scss" scoped></style>
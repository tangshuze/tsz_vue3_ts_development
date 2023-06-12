<template>
  <div class="">
    <Edit></Edit>
  </div>
</template>

<script lang="ts" setup>
import Edit from './edit_table.vue'
import { Test } from '@/common/api/index.ts'
Test.test().then(res => {
  console.log('res:', res);
})
</script>

<style lang="scss" scoped></style>
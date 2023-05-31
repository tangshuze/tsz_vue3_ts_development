<template>
  <div>
    <el-button @click="test">test</el-button>
  </div>
</template>

<script lang='ts' setup>
import http from '@/utils/http/request';
function test() {
  http.get('/api/test').then(res=>{
    console.log('res:',res);
  })
}
</script>
<style scoped>
</style>
<template>
  <div class="card">
    <header>
      <div class="animate__animated animate__bounce text-6xl">标题</div>
      <div class="">副标题</div>
    </header>

    <section v-vMove="123">内容</section>
  </div>
  <button v-move="123123">test</button>
</template>

<script lang='ts' setup>
import type { Directive } from 'vue'
const color: Ref<string> = ref('123')
const vMove: Directive = (el, binding) => {
  console.log('el:', el);
  console.log('binding:', binding);
}
</script>
<style scoped lang="scss">
$border: #ccc;

.card {
  border: 1px solid $border;
  width: 400px;
  background-color: v-bind(color);

  header {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid $border;
  }

  section {
    padding: 5px;
    min-height: 300px;
  }
}
</style>
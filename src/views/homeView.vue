<template>
  <div class="card">
    <header>
      <div class="animate__animated animate__bounce text-6xl">标题</div>
      <div class="">副标题</div>
    </header>

      <section>内容</section>
  </div>
</template>

<script lang='ts' setup>
const color = ref('123');
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
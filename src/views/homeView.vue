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
interface Person {
  name: string,
  age: number,
  gender: string
}
class Student {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}
const student = new Student({
  name: 'uuuu',
  age: 20,
  gender: 'male'
})
const test = student.getInfo('name');
console.log(test)


</script>
<style scoped lang="scss"></style>
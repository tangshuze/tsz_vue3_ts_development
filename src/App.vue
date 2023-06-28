<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.fade-enter-from,
.fade-leave-to {
  /*定义进入开始和离开结束的透明度为0*/
  opacity: 1;
}

.fade-leave-to {
  transform: translateY(-100%);
}

.fade-enter-to {
  transform: translateY(0);
}

.fade-enter-to,
.fade-leave-from {
  /*定义进入结束和离开开始的透明度为1*/
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s ease-out;
}

.defa-enter-from,
.defa-leave-to {
  /*定义进入开始和离开结束的透明度为0*/
  opacity: 1;
}

.defa-leave-to {
  transform: translateY(100%);
}

.fade-enter-to {
  transform: translateY(-100%);
}

.defa-enter-to,
.defa-leave-from {
  /*定义进入结束和离开开始的透明度为1*/
  opacity: 1;
}

.defa-leave-active,
.defa-enter-active {
  transition: all 0.5s ease-out;
}
</style>
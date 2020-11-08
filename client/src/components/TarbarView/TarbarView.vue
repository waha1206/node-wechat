<template>
  <div class="tarbar-view">
    <router-link to="/home">首頁</router-link>
    <router-link to="/assort">分類</router-link>
    <router-link to="/search2">搜索</router-link>
    <router-link to="/cart">購物車</router-link>
    <router-link to="/mine">我的</router-link>
  </div>
</template>

<script>
export default {
  name: 'tarbarView'
}
</script>

<style scoped>
.tarbar-view {
  height: 3.125rem;
  position: fixed;
  bottom: 3.4375rem;
  border-top: 0.0625rem solid gray;
  width: 100%;
  z-index: 1;
}
.tarbar-view a {
  display: inline-block;
  width: 20%;
  text-align: center;
  line-height: 3.125rem;
}
</style>

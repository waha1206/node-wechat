<template>
  <div class="home-view">首頁</div>
</template>

<script>
export default {
  name: 'homeView',
  data() {
    return {
      title: '麥毆商城',
      navViewShow: true
    }
  },
  created() {
    this.$emit('onTitle', this.title)
    this.$emit('onNavShow', this.navViewShow)
  }
}
</script>

<style>
@import url('../../../public/css/temp.css');
</style>

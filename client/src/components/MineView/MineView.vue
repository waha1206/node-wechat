<template>
  <div class="mine-view">我的</div>
</template>

<script>
export default {
  name: 'mineView',
  data() {
    return {
      title: '我的',
      navViewShow: true
    }
  },
  created() {
    this.$emit('onTitle', this.title)
    this.$emit('onNavShow', this.navViewShow)
  }
}
</script>

<style lang="scss" scoped></style>

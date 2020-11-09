<template>
  <div class="assort-view">分類</div>
</template>

<script>
export default {
  name: 'assortView',
  data() {
    return {
      title: '分類',
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

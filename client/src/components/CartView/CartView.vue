<template>
  <div class="cart-view">購物車</div>
</template>

<script>
export default {
  name: 'cartView',
  data() {
    return {
      title: '購物車',
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

<template>
  <div class="search-view">搜索</div>
</template>

<script>
export default {
  name: 'searchView',
  data() {
    return {
      navViewShow: false
    }
  },
  created() {
    this.$emit('onNavShow', this.navViewShow)
  }
}
</script>

<style lang="scss" scoped></style>

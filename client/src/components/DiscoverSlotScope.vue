<template>
  <div class="discover-slot-scope">
    <section>
      <h1>
        <slot name="name"></slot>
      </h1>
      <span>
        <slot
          name="price"
          :discount="discount"
          :discountDateLine="discountDateLine"
        ></slot>
      </span>
      <p>
        <slot name="material"></slot>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'discover-slot-scope',
  data() {
    return {
      discount: 0.8,
      discountDateLine: '2020/10/19'
    }
  }
}
</script>

<style scoped>
.discover-slot-scope {
  display: block;
  padding: 7px 0;
  flex: 1;
  text-align: center;
}
</style>

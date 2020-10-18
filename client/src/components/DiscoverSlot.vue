<template>
  <div class="discover-slot">
    <section>
      <h1>
        <slot name="name"></slot>
      </h1>
      <span>
        <slot name="price"></slot>
      </span>
      <p>
        <slot name="material"></slot>
      </p>
      <slot>尚未給 slot 名稱</slot>
      <hr />
      <button type="submit" name="submit">
        <slot>尚未給按鈕提供名稱</slot>
      </button>
      <hr />
    </section>
  </div>
</template>

<script>
export default {
  name: 'discover-slot'
}
</script>

<style scoped>
.discover-slot {
  display: block;
  padding: 7px 0;
  flex: 1;
  text-align: center;
}
</style>

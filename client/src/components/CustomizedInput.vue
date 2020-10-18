<template>
  <div class="customized-input">
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'customized-input',
  props: ['value']
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="customized-input">
    <input
      v-focus
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
  </div>
</template>

<script>
export default {
  name: 'customized-input',
  data() {
    return {
      message: 'hello'
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    },
    demo: {
      bind: function(el, binding, vnode) {
        var s = JSON.stringify
        el.innerHTML =
          'name: ' +
          s(binding.name) +
          '<br>' +
          'value: ' +
          s(binding.value) +
          '<br>' +
          'expression: ' +
          s(binding.expression) +
          '<br>' +
          'argument: ' +
          s(binding.arg) +
          '<br>' +
          'modifiers: ' +
          s(binding.modifiers) +
          '<br>' +
          'vnode keys: ' +
          Object.keys(vnode).join(', ')
      }
    }
  },
  props: ['value']
}
</script>

<style lang="scss" scoped></style>

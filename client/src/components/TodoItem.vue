<template>
  <div>
    <li>{{ title }} <button @click="$emit('remove')">移除這個品項</button></li>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: ['title']
}
</script>

<style scoped></style>

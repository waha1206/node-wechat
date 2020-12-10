<template>
  <div>
    <h2>{{ number }}</h2>
  </div>
</template>

<script>
import { EventBus } from '../../EventBus'

export default {
  data() {
    return {
      number: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    handleAddNumber() {
      EventBus.$on('addNumber', payload => {
        console.log('payload', payload)
        this.number.push(payload)
      })
    }
  },
  created() {
    this.handleAddNumber()
  }
}
</script>

<style scoped></style>

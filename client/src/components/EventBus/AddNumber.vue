<template>
  <div>
    <label for="number"></label>
    <input
      class="inp"
      type="text"
      name="number"
      placeholder="請輸入一個數字"
      v-model="number"
      @keyup.enter="addNumber"
    />
    <br />
    <el-button class="btn" type="primary" @click="addNumber"
      >增加一個數字</el-button
    >
  </div>
</template>

<script>
// 引入 EventBus.js 實體，沒錯他是一個 js 檔案
// import Vue from 'vue'
// export const EventBus = new Vue()
import { EventBus } from '../../EventBus'

export default {
  data() {
    return {
      number: 0
    }
  },
  methods: {
    addNumber() {
      // 我們在其中引入EventBus這個vue實體，並在點擊按鈕時註冊一個addNumber事件給它，同時將this.number作為payload傳進去
      EventBus.$emit('addNumber', parseInt(this.number))
    }
  }
}
</script>

<style scoped>
.inp {
  margin-top: 5px;
}
.btn {
  margin-top: 0.3125rem;
}
</style>

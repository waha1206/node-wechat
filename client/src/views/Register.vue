<template>
  <div class="register">
    <div class="header">
      <button @click="$router.go(-1)">取消</button>
    </div>
    <div class="container">
      <div class="title">註冊帳號</div>
      <div class="content">
        <!-- 表單 --- 要封裝 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  components: {}
}
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 50px;
}

.header button {
  border: none;
  outline: none;
  background-color: transparent;
  font-style: 16px;
  color: #20af0e;
}

.container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.title {
  margin-top: 30px;
  font-size: 22px;
  text-align: center;
}
</style>

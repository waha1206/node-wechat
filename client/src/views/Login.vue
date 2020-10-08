<template>
  <div class="index">
    <div class="title">用戶登錄</div>
    <div class="content">
      <!-- 表單 --- 會經過封裝 -->
    </div>
    <div class="footer_wrap">
      |<button class="register" @click="$router.push('/register')">
        註冊帳號</button
      >|
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {}
}
</script>

<style lang="css" scoped>
.index {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.title {
  margin-top: 80px;
  font-size: 22px;
  text-align: center;
}

.footer_wrap {
  position: absolute;
  left: 0;
  bottom: 16px;
  text-align: center;
  width: 100%;
  color: #888;
}
.footer_wrap .register {
  font-size: 16px;
  outline: none;
  border: none;
  background-color: transparent;
  color: #7bc8a9;
}
</style>

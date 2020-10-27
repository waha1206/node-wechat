<template>
  <div class="index">
    <div class="title">用戶登錄</div>
    <div class="content">
      <!-- 表單 --- 會經過封裝 -->
      <form action="">
        <InputGroup
          label="帳號"
          placeholder="請填寫email"
          v-model="user.email"
        ></InputGroup>
        <InputGroup
          label="密碼"
          placeholder="請填寫密碼"
          v-model="user.password"
          type="password"
        ></InputGroup>
      </form>
      <div class="btn_wrap">
        <YButton :disabled="isDisable" @click="loginClick">登錄</YButton>
      </div>
    </div>
    <div class="footer_wrap">
      |<button class="register" @click="$router.push('/register')">
        註冊帳號</button
      >|
    </div>
  </div>
</template>

<script>
import InputGroup from '../components/InputGroup'
import YButton from '../components/YButton'
import jwt_decode from 'jwt-decode'

export default {
  name: 'login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginClick() {
      var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (!reg.test(this.user.email)) {
        alert('email的格式錯誤！')
        return
      }
      this.$axios.post('/api/user/login', this.user).then(res => {
        // console.log(res);
        // 存儲 token
        // 執行到這邊就是登入成功
        const { token } = res.data
        localStorage.setItem('chatToken', token)

        // 解析 token
        const decode = jwt_decode(token)

        // 存儲到 vuex 中
        this.$store.dispatch('setUser', decode)

        // 頁面跳轉
        this.$router.push('/')
      })
    }
  },
  computed: {
    isDisable() {
      if (this.user.email && this.user.password) return false
      else return true
    }
  },
  components: {
    InputGroup,
    YButton
  }
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

.content,
.btn_wrap {
  margin-top: 30px;
}
</style>

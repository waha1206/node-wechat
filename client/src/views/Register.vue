<template>
  <div class="register">
    <div class="header">
      <button @click="$router.go(-1)">取消</button>
    </div>
    <div class="container">
      <div class="title">註冊帳號</div>
      <div class="content">
        <!-- 表單 --- 要封裝 -->
        <form action="">
          <InputGroup
            label="暱稱"
            placeholder="範例：楊小小"
            v-model="user.name"
          ></InputGroup>
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
          <InputGroup
            label="確認密碼"
            placeholder="請確認密碼"
            v-model="user.password2"
            type="password"
          ></InputGroup>
        </form>
        <div class="btn_wrap">
          <YButton :disabled="isDisable" @click="registerClick">註冊</YButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from '../components/InputGroup';
import YButton from '../components/YButton';

export default {
  name: `register`,
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password2: '',
        identity: ''
      }
    };
  },
  computed: {
    isDisable() {
      if (
        this.user.name &&
        this.user.password2 &&
        this.user.email &&
        this.user.password
      )
        return false;
      else return true;
    }
  },
  methods: {
    registerClick() {
      var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!reg.test(this.user.email)) {
        alert('email的格式錯誤！');
        return;
      }

      if (this.user.password != this.user.password2) {
        alert('兩次密碼不一致');
        return;
      }

      this.user.identity = 'employee';
      this.$axios.post('/api/user/register', this.user).then((res) => {
        alert('註冊成功！');
        this.$router.push('/login');
      });
    }
  },
  components: {
    InputGroup,
    YButton
  }
};
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

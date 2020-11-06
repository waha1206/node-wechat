<template>
  <div class="chat">
    <Header
      v-if="targetUser"
      :is-left="true"
      :title="targetUser.name"
      :path="path"
      btn_icon="ellipsis-h"
    />

    <div class="container">
      <div class="footer_wrap">
        <input type="text" v-model="msgValue" />
        <button :disabled="msgValue == ''" @click="sendMessage">發送</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import WSocket from '../socket.js'

export default {
  name: 'chat',
  data() {
    return {
      targetUser: null,
      path: '',
      msgValue: '',
      messageList: []
    }
  },
  components: {
    Header
  },
  beforeRouteEnter(to, from, next) {
    //  vm = view model 的意思
    next(vm => {
      vm.targetUser = to.params.user
      // 把 to (上一個傳過來的 path 記錄到 vm.path 到時候點前一頁的時候就會返回，這邊設定是 '/information')
      vm.path = to.params.path
      console.log(vm.path)
    })
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  // mounted 頁面渲染之前 會執行的鉤子函數，服務端推送消息給客戶端
  mounted() {
    WSocket.init(
      { user: this.user },
      message => {
        // 收到消息後，將消息存儲到數據中
        this.messageList.push({
          msg: message.msg,
          source: 'other'
        })
      },
      error => {
        console.log(error)
      }
    )
  },

  methods: {
    sendMessage() {
      // console.log(this.msgValue)
      // 需要發送的消息對象
      const msgObj = {
        target: this.targetUser._id,
        current: this.user.id,
        msg: this.msgValue
      }
      WSocket.send(msgObj)

      // 本地客戶端顯示
      this.messageList.push({
        msg: this.msgValue,
        source: 'self'
      })
      // 清空 input
      this.msgValue = ''
    }
  }
}
</script>

<style scoped>
.chat {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100% - 100px);
  box-sizing: border-box;
  background-color: #f1f1f1;
  margin-top: 50px;
  padding: 8px;
  overflow-y: scroll;
}
.footer_wrap {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-top: 1px solid #d9d9d9;
  position: absolute;
  bottom: 0;
  padding: 8px;
  background-color: #fafafa;
}
.footer_wrap input {
  width: 70%;
  height: 30px;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.footer_wrap button {
  width: 20%;
  height: 34px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-left: 8px;
  outline: none;
  background-color: #f1f1f1;
}
.footer_wrap button[disabled] {
  background-color: #d9d9d9;
  cursor: not-allowed;
  pointer-events: none;
}

.left_msg {
  justify-content: flex-start;
}
.right_msg {
  justify-content: flex-end;
}
.left_msg,
.right_msg {
  width: 100%;
  display: flex;
  margin: 5px 0;
}
.content_wrap img {
  width: 3rem;
  height: 3rem;
}
.content_wrap span {
  display: inline-block;
  max-width: 65%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin: 0 5px;
  padding: 8px;
  box-sizing: border-box;
  word-break: break-all;
}
.left_msg span {
  background-color: #fff;
}
.right_msg span {
  background-color: #0fce0d;
}
</style>

<template>
  <div class="circle">
    <Header title="商品搜尋" btn_icon="camera" :isLeft="true"></Header>
    <!-- 內聯定義 class -->
    <div class="container" :class="{ ac: classA, 'a-b': classB }">
      <!-- 定義 class 在 data 裡面 -->
      <div class="search" :class="classObj">
        <input v-model="getMessage" type="text" />
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import CellView from '../components/CellView'
import jwt_decode from 'jwt-decode'
import _ from 'lodash'

export default {
  name: 'search',
  data() {
    return {
      lastMessage: '',
      message: '',
      momentsList: [],
      classA: true,
      classB: false,
      classObj: {
        waha1205: false,
        waha1206: true,
        waha1207: true
      }
    }
  },
  watch: {
    // 監聽 message 是否有改變，有改變就呼叫 this.DB() -- 此函數被設定 1 秒最多被觸發一次
    message: function(newMessage, oldMessage) {
      console.log('watch觸發次數')
      this.DB()
    }
  },
  methods: {
    // 避免過於頻繁的往 server 端發送請求
    axiosSearchData() {
      // 如果有中文字，就發出 axios 請求
      // 另外要增加，如果資料是一樣的，就不要重複輸出到後台
      if (
        /.*[\u4e00-\u9fa5]+.*$/.test(this.message) &&
        this.message != this.lastMessage
      ) {
        console.log(this.message)
        this.lastMessage = this.message
      }
    },
    // 測試用的
    btnClick() {
      console.log('methods')
      this.num += 1
      console.log(this.num)
    },
    getLatestData() {
      this.$axios('/api/chat/latest').then(res => {
        this.momentsList = [...res.data]
        console.log(this.momentsList)
      })
    }
  },
  created() {
    this.DB = _.debounce(this.axiosSearchData, 1000, false)
    this.getLatestData()
  },
  computed: {
    getMessage: {
      get: function() {
        return this.message
      },
      set: function(newValue) {
        this.message = newValue
      }
    },
    user() {
      const token = localStorage.chatToken
      // 解析 token
      const decode = jwt_decode(token)
      return decode
    },
    // 測試用
    msg() {
      console.log('我是computed')
      return this.message
    }
  },
  components: {
    Header,
    CellView
  }
}
</script>

<style scoped>
.search {
  margin: 20px;
  text-align: center;
}

.circle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: calc(100% - 50px);
  padding-top: 50px;
  overflow: auto;
}
.head_wrapper {
  width: 100%;
  position: relative;
  height: 200px;
  background: url(../assets/cricle_bg.png) no-repeat;
  background-size: 100% 100%;
}
.head_wrapper .user_head {
  position: absolute;
  bottom: -30px;
  right: 16px;
}
.user_img {
  width: 60px;
  height: 60px;
  padding: 3px;
  border: 1px solid #c5c5c5;
  box-sizing: border-box;
}
.user_head img {
  width: 100%;
  height: 100%;
}
.user_head span {
  line-height: 30px;
  position: absolute;
  right: 76px;
  width: 200px;
  text-align: right;
  color: white;
}
</style>

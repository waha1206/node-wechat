<template>
  <div class="circle">
    <Header
      title="朋友圈"
      btn_icon="camera"
      :isLeft="true"
      @rightClick="$router.push('/publish')"
    ></Header>
    <div class="container" ref="container">
      <Scroll ref="refresh" @pulldown="loadData" @pullup="loadMore">
        <div class="head_wrapper">
          <div class="user_head">
            <span>{{ user.name }}</span>
            <div class="user_img">
              <img :src="user.avatar" alt="" class="head_img" />
            </div>
          </div>
        </div>
        <div class="content_wrapper">
          <CellView
            v-for="(moment, index) in momentsList"
            :key="index"
            :momentsObj="moment"
          ></CellView>
        </div>
      </Scroll>

      <!-- <div>
        <button @click="btnClick">按我一下</button>
        <input type="text" v-model="message" />
        {{ msg }}
        {{ num }}
      </div> -->
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import CellView from '../components/CellView'
import jwt_decode from 'jwt-decode'
import Scroll from '../components/Scroll'

export default {
  name: 'moments',
  data() {
    return {
      // 測試用
      // message: '請輸入文字',
      // num: Number(0)
      momentsList: [],
      page: 2, // 默認第二頁開始加載
      size: 3, // 每次加載 3 條數據
      loading: false
    }
  },
  mounted() {
    console.log('container', this.$refs.container.offsetHeight)
  },
  updated() {
    // console.log('scroll', this.$refs.scroll.offsetHeight)
  },
  methods: {
    // 測試用的
    btnClick() {
      console.log('methods')
      this.num += 1
      console.log(this.num)
    },
    loadData() {
      this.page = 2
      this.getLatestData()
    },
    loadMore() {
      if (this.loading) return
      this.loading = true
      this.$axios(`/api/chat/${this.page}/${this.size}`).then(res => {
        this.loading = false
        // console.log(res.data)
        const result = [...res.data]
        console.log(result)

        if (result.length > 0) {
          result.forEach(item => {
            this.momentsList.push(item)
          })
          // 自增 page
          this.page++
          console.log('momentsList', this.momentsList)
        }
      })
    },
    getLatestData() {
      if (this.loading) return
      this.loading = true
      this.$axios('/api/chat/latest').then(res => {
        this.loading = false
        this.momentsList = [...res.data]
        console.log(this.momentsList)
        // 註冊事件，解決重置問題
        // this.$refs.refresh.$emit('refreshX')
      })
    }
  },
  created() {
    this.getLatestData()
  },
  computed: {
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
    CellView,
    Scroll
  }
}
</script>

<style scoped>
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

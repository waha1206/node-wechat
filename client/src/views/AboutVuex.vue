<template>
  <div class="circle">
    <Header title="VUEX練習" btn_icon="camera" :isLeft="true"></Header>
    <div class="container">
      <div class="title">
        <button @click="inc">store 加 10</button>
        {{ this.$store.state.count }}
        <p>這個是 computed {{ count }}</p>
        <p></p>
        <p>這個是 getrer</p>
        {{ this.$store.getters.doneTodos }}
        <p>通過方法訪問 getter</p>
        {{ this.$store.getters.getTodoById(2) }}
        <p>通過 mapGetters</p>
        {{ getTodoById(1) }}
        <div>
          <button @click="actionClick">1000毫秒後觸發 加 30</button>
          {{ this.$store.count }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import { mapGetters } from 'vuex'

export default {
  name: 'about-vuex',
  data() {
    return {}
  },
  methods: {
    actionClick() {
      this.$store.dispatch('incrementAsync').then(() => {
        console.log('加載中...', this.$store.state.count)
      })
    },
    inc() {
      this.$store.commit({ type: 'increment', amount: 10 })
    }
  },
  computed: {
    ...mapGetters(['getTodoById']),
    count() {
      return this.$store.state.count
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
.title {
  margin: 20px;
  text-align: center;
}

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

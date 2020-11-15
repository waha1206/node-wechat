<template>
  <!-- ref 是讓我們可以透過 $refs 取得該元素 -->
  <div class="scroll-wrap" ref="wrapper">
    <div>
      <!-- 下拉刷新 -->
      <div class="pulldown" v-show="dragTip.showLoading">
        <div class="clear">
          <div class="fl">
            <img width="16" src="../assets/scroll_load.gif" alt="" />
            <div class="fl">{{ dragTip.text }}</div>
          </div>
        </div>
      </div>

      <slot></slot>

      <!-- 上拉加載 -->
      <div class="pullup">
        <div class="clear" v-if="!isDone">
          <div class="fl">
            <img width="16" src="../assets/scroll_load.gif" alt="" />
            <div class="fl">加載中...</div>
          </div>
        </div>
        <div class="list-donetip" v-else>
          <slot name="doneTip">沒有更多數據</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
  data() {
    return {
      // 默認給一個空的對象
      scroll: {},
      dragTip: {
        text: '下拉刷新',
        showLoading: false
      },
      isDone: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
    }, 1000)
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      console.log('wrapper', this.$refs.wrapper.offsetHeight)
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 1
      })

      console.log(this.scroll)

      // 派發下拉事件
      this.scroll.on('scroll', pos => {
        // 顯示下拉刷新 loading
        this.dragTip.showLoading = true
        if (pos.y > 50) {
          this.dragTip.text = '釋放刷新'
        }
      })
      // 手鬆開事件
      this.scroll.on('touchEnd', pos => {
        if (pos.y > 50) {
          this.dragTip.text = '刷新中...'

          // 註冊下拉事件
          this.$emit('pulldown')
          // this.reset()
          // 重新初始化
          // this.$on('refreshX', this.reset)
          this.isDone = false
          this.dragTip = {
            text: '下拉刷新',
            showLoading: false
          }
        }
      })
      this.scroll.on('scrollEnd', () => {
        // console.log(this.scroll.maxScrollY)
        if (this.scroll.y <= this.scroll.maxScrollY + 50) {
          // 觸發下拉加載事件
          this.$emit('pullup')
        }
      })
    }
  },
  reset() {
    setTimeout(() => {
      this.dragTip = {
        text: '下拉刷新',
        showLoading: false
      }
    }, 600)
  }
}
</script>
<style scoped>
.scroll-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.fl {
  display: inline-block;
}
.fl img {
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
  margin-right: 0.2rem;
}
/* 下拉刷新 */
.pulldown,
.pullup {
  width: 100%;
  height: 3.125rem;
  position: relative;
  color: #888;
}
.clear {
  padding: 0.625rem 0px;
  font-size: 0.28rem;
  position: absolute;
  left: 50%;
  top: 0.3125rem;
  transform: translate(-50%, 0);
}

.list-donetip {
  text-align: center;
  line-height: 3.125rem;
  font-size: 0.28rem;
}
</style>

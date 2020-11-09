<template>
  <div class="container">
    <van-nav-bar fixed :title="title" v-show="navViewShow" />
    <!-- 主體內容 -->
    <!-- 路由規則匹配到的組件 渲染位置 -->
    <router-view @onTitle="getTitle" @onNavShow="getShow"></router-view>

    <!-- 底部通欄 -->
    <!-- <TarbarView /> -->
    <van-tabbar v-model="active" :fixed="false" active-color="red">
      <van-tabbar-item icon="wap-home" to="/home">首頁</van-tabbar-item>
      <van-tabbar-item icon="column" to="/assort">分類</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search2">搜索</van-tabbar-item>
      <van-tabbar-item icon="cart" badge="15" to="/cart"
        >購物車</van-tabbar-item
      >
      <van-tabbar-item icon="manager" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import NavView from '../.././components/NavView/NavView'
// import TarbarView from '../.././components/TarbarView/TarbarView'
import { NavBar, Tabbar, TabbarItem } from 'vant'

export default {
  name: 'shop',
  data() {
    return {
      title: '',
      navViewShow: true,
      active: 0
    }
  },
  components: {
    NavView,
    // TarbarView,
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  methods: {
    getTitle(title) {
      this.title = title
    },
    getShow(temp) {
      this.navViewShow = temp
    }
  }
}
</script>

<style>
img {
  width: 23.4375rem;
}
.van-nav-bar {
  background: red;
  height: 2.8125rem;
  line-height: 2.8125rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
}

.van-nav-bar .van-nav-bar__title {
  color: white;
}
.van-hairline--top-bottom {
  height: 3.125rem;
  position: fixed;
  bottom: 3.4375rem;
  border-top: 0.0625rem solid gray;
  width: 100%;
  z-index: 1;
}
</style>

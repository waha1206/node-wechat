<template>
  <div class="container">
    <NavView />
    <!-- 主體內容 -->
    <router-view></router-view>

    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>

    <!-- 底部通欄 -->
    <TarbarView />
  </div>
</template>

<script>
import NavView from '../.././components/NavView/NavView'
import TarbarView from '../.././components/TarbarView/TarbarView'
import { Button, Tabbar, TabbarItem } from 'vant'

export default {
  name: 'shop',
  data() {
    return {
      active: 0
    }
  },
  components: {
    NavView,
    TarbarView,
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>

<style scoped>
img {
  width: 23.4375rem;
}
</style>

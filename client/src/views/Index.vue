<template>
  <div class="index">
    <router-view></router-view>
    <TabBar :data="tabbarDate" />
  </div>
</template>

<script>
import TabBar from '../components/TabBar';
export default {
  name: 'index',
  data() {
    return {
      tabbarDate: [
        { title: '訊息', icon: 'comment', path: '/chats' },
        { title: '內容', icon: 'address-book', path: '/contacts' },
        { title: '發現', icon: 'compass', path: '/discover' },
        { title: '我', icon: 'user', path: '/me' }
      ]
    };
  },
  components: {
    TabBar
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="circle">
    <Header title="插槽DEMO" btn_icon="camera" :isLeft="true"></Header>
    <div class="container">
      <DiscoverSlot>
        <template v-slot:name>
          提把小物包
        </template>
        <template v-slot:price>
          $350
        </template>
        <template v-slot:material>
          聚酯纖維
        </template>
      </DiscoverSlot>
      <DiscoverSlotScope>
        <!-- 傳遞給子組件 slot name = name -->
        <template #name>
          提把小物包
        </template>
        <!-- 傳遞給子組件 slot price = price -->
        <template #price="slotProps">
          特價：{{ 350 * slotProps.discount }} / 原價：$350
          <br />
          優惠截止日期：{{ slotProps.discountDateLine }}
        </template>
        <!-- 傳遞給子組件 slot name = marerial -->
        <template #material>
          聚酯纖維
        </template>
      </DiscoverSlotScope>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import DiscoverSlot from '../components/DiscoverSlot'
import DiscoverSlotScope from '../components/DiscoverSlotScope'

export default {
  name: 'discover-slot-demo',
  data() {
    return {}
  },
  components: {
    Header,
    DiscoverSlot,
    DiscoverSlotScope
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

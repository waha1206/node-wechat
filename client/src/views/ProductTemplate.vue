<template>
  <div class="product-template">
    <div class="header">
      <Header
        @rightClick=""
        title="公版商品區"
        btn_icon="file-upload"
        :isLeft="true"
      ></Header>
    </div>
    <div class="content">
      <div class="btn-wrap">
        <van-button class="btn" icon="plus" type="primary"
          >添加商品分類</van-button
        >
        <van-button class="btn" icon="plus" type="primary"
          >添加商品分類</van-button
        >
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import { Button } from 'vant'
export default {
  name: 'product-template',
  components: {
    Header,
    [Button.name]: Button
  }
}
</script>

<style scoped>
.product-template {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.content {
  width: 100%;
  height: calc(100% - 3.125rem);
  padding-top: 3.125rem;
  overflow: auto;
}
.btn-wrap {
  padding: 5px;
}

.btn {
  margin: 5px;
}
</style>

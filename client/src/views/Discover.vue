<template>
  <div class="find">
    <Header title="發現"></Header>
    <div class="content">
      <Cell
        :src="cellData.src"
        :title="cellData.title"
        :path="cellData.path"
      ></Cell>
      <Cell
        :src="searchData.src"
        :title="searchData.title"
        :path="searchData.path"
      ></Cell>
      <Cell
        :src="ToDoData.src"
        :title="ToDoData.title"
        :path="ToDoData.path"
      ></Cell>
      <Cell
        :src="DiscoverSlot.src"
        :title="DiscoverSlot.title"
        :path="DiscoverSlot.path"
      ></Cell>
      <Cell
        :src="AboutVuex.src"
        :title="AboutVuex.title"
        :path="AboutVuex.path"
      ></Cell>
      <Cell
        :src="ImgUpload.src"
        :title="ImgUpload.title"
        :path="ImgUpload.path"
      ></Cell>
      <Cell
        :src="CsvUpload.src"
        :title="CsvUpload.title"
        :path="CsvUpload.path"
      ></Cell>
      <Cell
        :src="ProductTemplate.src"
        :title="ProductTemplate.title"
        :path="ProductTemplate.path"
      ></Cell>
      <Cell
        :src="EventBus.src"
        :title="EventBus.title"
        :path="EventBus.path"
      ></Cell>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Cell from '../components/Cell'
export default {
  name: 'discover',
  data() {
    return {
      cellData: {
        src: 'pyq.jpg',
        title: '朋友圈',
        path: '/moments'
      },
      searchData: {
        src: 'search.jpg',
        title: '查詢資料',
        path: '/search'
      },
      ToDoData: {
        src: 'add.png',
        title: '動態新增',
        path: '/todo'
      },
      DiscoverSlot: {
        src: 'slot.png',
        title: '插槽',
        path: '/discover-slot-demo'
      },
      AboutVuex: {
        src: 'vuex.png',
        title: 'Vuex',
        path: '/about-vuex'
      },
      ImgUpload: {
        src: 'imgupload.jpg',
        title: '圖片上傳',
        path: '/img-upload'
      },
      CsvUpload: {
        src: 'csv.jpg',
        title: '開啟CSV檔',
        path: '/csv-upload'
      },
      ProductTemplate: {
        src: 'product.png',
        title: '公版商品',
        path: '/product-template'
      },
      EventBus: {
        src: 'event-bus.png',
        title: 'EventBus',
        path: '/event-bus'
      }
    }
  },
  components: {
    Header,
    Cell
  }
}
</script>

<style scoped>
.find {
  width: 100%;
  height: calc(100% - 55px);
  position: relative;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
}
</style>

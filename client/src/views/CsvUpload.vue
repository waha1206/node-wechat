<template>
  <div class="csv-upload">
    <div class="header">
      <Header
        @rightClick="saveToServer"
        title="圖片上傳"
        btn_icon="file-upload"
        :isLeft="true"
      ></Header>
      <div class="content">
        <div class="text_wrap">
          <p>開啟CSV檔</p>
          <br />
          <van-button type="danger">上傳資料</van-button>
          </van-button>
          <!-- 文件上傳 -->
          <br />
          <br />

          <p>檔案大小： {{ fileSize }}</p>
          <p>檔案名稱： {{ fileName }}</p>
        </div>
      </div>
    </div>
    <!-- <Loading :loading="loading" /> -->
  </div>
</template>

<script>
import Header from '../components/Header'
// import Vue from 'vue'
// import VuePapaParse from 'vue-papa-parse'
// Vue.use(VuePapaParse)
import { Button } from 'vant'

export default {
  name: 'csv-upload',
  data () {
    return {
      fileSize: '',
      fileName: '',
      results: null
    }
  },
  watch: {
    results (current) {
      if (current) {
        console.log(current)
      }
    }
  },
  methods: {
    saveToServer () {
      console.log('存到資料庫裡')
    },
    publish () {
      this.loading = true
      // 發布消息
      if (this.text == '') {
        this.text = ' '
      }
      const postData = {
        name: this.user.name,
        img: this.user.avatar,
        text: this.text,
        imgs: this.imgs.join('|')
      }

      this.$axios.post('/api/chat/add', postData).then(res => {
        this.loading = false
        this.$router.push('/moments')
      })
    },
    getImgs (imgs) {
      // 獲取 base 64
      imgs.forEach(file => {
        this.uploadFile(file)
      })
    },
    uploadFile (file) {
      let reader = new FileReader()
      const _this = this
      reader.onload = function (e) {
        // console.log(e.target.result)
        _this.imgs.push(e.target.result)
      }
      reader.readAsDataURL(file)
      // console.log(reader)
    }
  },
  components: {
    Header,
    [Button.name]: Button,
  }
}
</script>

<style scoped>
.csv-upload {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.content {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
}

.text_wrap textarea {
  width: 100%;
  font-size: 0.875rem;
  min-height: 3.75rem;
  border: 1px solid gray;
  outline: none;
}
.text_wrap {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>

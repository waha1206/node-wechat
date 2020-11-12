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
          <!-- 文件上傳 -->
          <p>開啟CSV檔</p>
          <br />
          <van-button type="danger">上傳資料</van-button>
          <br />
          <br />

          <!-- 點擊置入檔案 -->
          <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            result-type="text"
            max-count="1"
          />
          <p>檔案大小： {{ fileSize }}</p>
          <p>檔案名稱： {{ fileName }}</p>
          <p>檔案類型： {{ fileType }}</p>
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
import { Button, Uploader } from 'vant'

export default {
  name: 'csv-upload',
  data() {
    return {
      fileSize: '',
      fileName: '',
      fileType: '',
      results: null,
      dataJSON: null,
      fileList: [
        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // // Uploader 根据文件后缀来判断是否为图片文件
        // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: 'https://cloud-image', isImage: false }
      ]
    }
  },
  watch: {
    results(current) {
      if (current) {
        console.log(current)
      }
    }
  },
  methods: {
    afterRead(file) {
      // console.log(this.fileList[0].content)
      this.fileName = file.file.name
      this.fileSize = file.file.size
      this.fileType = file.file.type
      this.dataJSON = JSON.parse(this.csvJSON(this.fileList[0].content))
      console.log(this.dataJSON)

      // 這裡可以寫上傳伺服器的代碼

      // console.log(file.file)
    },
    csvJSON(csv) {
      const lines = csv.split('\n')
      const result = []
      const headers = lines[0].split(',')

      // console.log(lines, headers)

      for (var i = 1; i < lines.length; i++) {
        const obj = {}
        const currentline = lines[i].split(',')

        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j]
        }

        result.push(obj)
      }
      return JSON.stringify(result) //JSON
    },

    saveToServer() {
      console.log('存到資料庫裡')
    },
    publish() {
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
    getImgs(imgs) {
      // 獲取 base 64
      imgs.forEach(file => {
        this.uploadFile(file)
      })
    },
    uploadFile(file) {
      let reader = new FileReader()
      const _this = this
      reader.onload = function(e) {
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
    [Uploader.name]: Uploader
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

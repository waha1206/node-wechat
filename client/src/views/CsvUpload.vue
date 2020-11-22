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
          <van-button
            type="danger"
            v-if="maxCustomerNum > 0"
            @click="upLoadData"
            >上傳資料</van-button
          >
          <span>--</span>
          <van-button type="danger" @click="nextCustomer"
            >下一個客戶</van-button
          >
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
          <p v-if="maxCustomerNum > 0">客戶編號： {{ count + 1 }}</p>
          <p v-if="maxCustomerNum > 0">客戶總數： {{ maxCustomerNum }}</p>
          <p v-if="maxCustomerNum > 0">檔案類型： {{ fileClass }}</p>
          <hr />
          <p v-for="(item, index) in this.showCustomerData" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
    <!-- <Loading :loading="loading" /> -->
    <Loading :loading="loading" status="上傳數據中..." />
  </div>
</template>

<script>
import Header from '../components/Header'
// import Vue from 'vue'
// import VuePapaParse from 'vue-papa-parse'
// Vue.use(VuePapaParse)
import { Button, Uploader } from 'vant'
import Loading from '../components/Loading'

export default {
  name: 'csv-upload',
  data() {
    return {
      fileSize: '',
      fileName: '',
      fileType: '',
      fileClass: '',
      loading: false,
      maxCustomerNum: 0,
      count: 0,
      results: null,
      showCustomerData: [],
      allCustomerData: [],
      dataJSON: [],
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
    upLoadData() {
      this.loading = true
      if (this.fileClass == '客戶資料') {
        console.log('暫時不提供上傳 customer 的資料')
        this.loading = false
        return
        // this.$axios.post('/api/customer/upload', this.dataJSON).then(res => {
        //   this.loading = false
        // })
      } else if (this.fileClass == '原物料資料') {
        console.log(this.dataJSON)
        this.loading = false
        return
        // 傳到資料庫並且儲存，目前已經有資料了，所以暫時不開啟
        // this.$axios.post('/api/material/upload', this.dataJSON).then(res => {
        //   this.loading = false
        // })
      } else {
        console.log('資料類型有誤...')
        return
      }
    },

    nextCustomer() {
      this.count += 1
      this.showCustomerData = this.dataJSON[this.count]
      // console.log(this.count)
    },
    afterRead(file) {
      // 當開啟檔案後，會觸發這個 function vant 元件 van-uploader
      this.fileName = file.file.name
      this.fileSize = file.file.size
      this.fileType = file.file.type
      // 將 檔案內容從字串轉換成為 JSON object
      this.dataJSON = JSON.parse(this.csvJSON(this.fileList[0].content))
      // 揭示到畫面上面的第一筆資料
      this.showCustomerData = this.dataJSON[0]
      // console.log(this.showCustomerData)
      // 這裡可以寫上傳伺服器的代碼，但是我使用另外一個按鈕來取代 upLoadData(){}
    },
    csvJSON(csv) {
      const lines = csv.split('\n')
      const result = []
      const headers = lines[0].split(',')

      // 根據檔頭去判斷是哪種 CSV 的資料
      if (headers[0] == 'create_date') {
        this.fileClass = '客戶資料'
      } else if (headers[0] == 'old_serial_numbers') {
        this.fileClass = '原物料資料'
        // console.log(headers)
        // console.log(lines[3])
        // console.log(headers.length)
      } else {
        this.fileClass = ''
        return
      }
      // 處理 lines 一共881條
      // for (let i = 1; i < 100; i++) {
      for (let i = 1; i < lines.length; i++) {
        const obj = {}
        const currentline = lines[i].split(',')

        // 處理 header 一共 17 的欄位
        for (let j = 0; j < headers.length; j++) {
          // 移除特定的欄位會出現 /r 的問題
          if (headers[j].indexOf('postal') != -1) {
            obj['postal'] = currentline[j].replace('\r', '')
          } else if (headers[j].indexOf('create_date') != -1) {
            // 轉換日期，要把原始資料的日期重新設定成 2020/10/22 之類的
            obj[headers[j]] = Date.parse(currentline[j])
          } else if (headers[j].indexOf('product_website') != -1) {
            obj['product_website'] = currentline[j].replace('\r', '')
          } else {
            obj[headers[j]] = currentline[j]
          }
        }
        result.push(obj)
      }
      this.maxCustomerNum = lines.length
      // 查看整理好的資料內容 JSON 的格式
      // console.log(result)
      return JSON.stringify(result) //JSON
    },

    saveToServer() {
      // 右上的按鈕，目前沒有使用到
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
    Loading,
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

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
      <label for="firstname">Firstname</label>
      <input type="text" name="firstname" v-model="firstName" />
      <br />
      <label for="lastname">Lasttname</label>
      <input type="text" name="lastname" v-model="lastName" />
      <h2>{{ fullName }}</h2>
      <h3>{{ firstName }} {{ lastName }}</h3>
      <input type="text" v-model="person.age" />
      <!-- <h3>{{ getFullName() }}</h3> -->
      <div>
        <label for="accoount"
          >即時驗證帳號，只能輸入3-15字，英文，數字，底線</label
        >
        <input type="text" name="account" v-model="number" />
        <p v-if="!verificationResult">請輸入正確格式</p>
      </div>
      <hr />
      <!-- Select 選擇器 -->
      <el-select v-model="value" placeholder="選擇大分類">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{
            item.value
          }}</span>
        </el-option>
      </el-select>
      <p v-for="item in getProduct" :key="item.value">{{ item.value }}</p>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import { Button } from 'vant'
export default {
  name: 'product-template',
  data() {
    return {
      person: {
        name: 'leo',
        age: 46
      },
      firstName: '',
      lastName: '',
      number: '',
      verificationResult: true,
      cities: [
        {
          value: '提袋系列',
          label: 'SS'
        },
        {
          value: 'Shanghai',
          label: '上海'
        },
        {
          value: 'Nanjing',
          label: '南京'
        },
        {
          value: 'Chengdu',
          label: '成都'
        },
        {
          value: 'Shenzhen',
          label: '深圳'
        },
        {
          value: 'Guangzhou',
          label: '广州'
        }
      ],
      value: '',
      SS: [
        {
          value: '提把小物包',
          label: 'SS0001',
          enable: true
        },
        {
          value: '鑰匙包',
          label: 'SS0002',
          enable: false
        },
        {
          value: '零錢包',
          label: 'SS0003',
          enable: true
        }
      ]
    }
  },
  components: {
    Header,
    [Button.name]: Button
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    },
    getProduct() {
      // return this.SS.filter(item => item.enable)
      return this.SS.filter(function(item) {
        if (item.enable) return item
      })
    }
  },
  watch: {
    firstName: function(val, oldVal) {
      console.log('val', val)
      console.log('oldVal', oldVal)
    },
    'firstName.length': function(len) {
      console.log(`firstName的字串長度為 ${len}`)
    },
    'person.age': function(age) {
      console.log(`age的字被改變了 ${age}`)
    },
    fullName: function() {
      console.log('computed 的 fillName 被觸發了！')
    },
    fullName: 'showMessage',
    // 即時驗證輸入帳號的格式是否正確
    number: function(newValue) {
      this.verificationResult = /^[a-z0-9_]{3,15}$/.test(newValue)
    }
  },
  methods: {
    showMessage(val, oldVal) {
      console.log(val, oldVal)
    }
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

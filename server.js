const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

// 引入 users.js router
const users = require('./routes/api/users')

// mongo DB
const db = require('./config/keys').mongoURI

// 使用 body-parser 中間件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// connect mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connect mongoDB'))
  .catch((err) => {
    console.log(err)
  })

app.get('/', (req, res) => {
  res.send('Hello World')
})

// 初始化 passport
app.use(passport.initialize())
require('./config/passport')(passport) // 直接把 passoprt 傳到 passport.js 裡面去寫程式，做到真正的數據分離，代碼抽離

const port = process.env.PORT || 3000

app.use('/api/user', users)

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`)
})

// @login & registerModule
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// 引入 User 才可以做查詢
const User = require('../../models/User')

// $router GET api/users/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  res.json('msg:login works')
})

// $router POST api/users/register
// @desc   返回的請求的 json 數據
// @access public
router.post('/register', (req, res) => {
  // console.log(req.body)

  // 查詢數據庫中是否擁有 email
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json('email已經被註冊')
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity: req.body.identity
      })

      // 加密的東東 bcrypt
      bcrypt.genSalt(saltRounds, function (_err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) {
            throw err
          }
          newUser.password = hash

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
        })
      })
    }
  })
})

// $router POST api/users/login
// @desc   返回 token jwt passport
// @access public

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  console.log(password)
  User.findOne({ email }).then((user) => {
    if (!user || password === undefined) {
      return res.status(404).json('用戶不存在！')
    } else {
      // 用戶存在，所以準備使用雜湊加密法 bcrypt 反解析 使用者的密碼，然後進行資料庫與使用者的密碼比對
      bcrypt
        .compare(password, user.password)
        // 使用 promise 方式 .then  (本來是使用 ()=> )
        .then((isMatch) => {
          if (isMatch) {
            // jwt.sign("規則","加密名字","過期時間","箭頭函數")
            const rule = {
              name: user.name,
              id: user.id,
              emai: user.email,
              avatar: user.avatar,
              identity: user.identity
            }
            jwt.sign(
              rule,
              keys.secretOrKey,
              // token 的保存時間
              { expiresIn: 36000 },
              (err, token) => {
                if (err) throw err
                // res.json 返回給 瀏覽器 他的資料在瀏覽器裡面會看到是一個 data 對象
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            )
          } else {
            return res.status(400).json('密碼錯誤')
          }
        })
    }
  })
})

// $router POST api/users/current
// @desc   return current user
// @access Private

// router.get("/current", "驗證token",(req, res)=>{
// res.json({msg:"success"})
// })
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // res.json(req.user) // 不需要把整個 user 資訊返回
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.identity
    })
  }
)

module.exports = router

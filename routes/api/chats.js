// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 引入 Chat 才可以做查詢
const Chat = require('../../models/Chat')

// $router GET api/chat/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  res.json('msg:chats works')
})

// $router POST api/chat/add
// @desc   創建朋友圈訊息
// @access private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const chatFileds = {}
    if (req.body.img) chatFileds.img = req.body.img
    if (req.body.name) chatFileds.name = req.body.name
    if (req.body.text) chatFileds.text = req.body.text

    // 多張圖片
    if (req.body.imgs) {
      chatFileds.imgs = req.body.imgs.split('|')
    }

    // 儲存數據
    new Chat(chatFileds).save().then((chat) => {
      res.json(chat)
    })
  }
)

module.exports = router

const express = require('express')
const mongoose = require('mongoose')
const app = express()

// mongo DB
const db = require('./config/keys').mongoURI

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

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`)
})

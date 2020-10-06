const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

const port = process.env.PORT || 5050

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`)
})

export default {
  // 封裝的目的保證整個項目只有一個 socket 實例
  ws: null, // Websocket 實例

  // onMessage 這個是自己寫的
  init(config, onMessage, onError) {
    if (!this.ws) {
      // 實例化 socket 對象
      console.log(config)
      this.ws = new WebSocket(`ws://localhost:3000/${config.user.id}`)
    }

    // 客戶端接受消息  onmessage 這個是系統 - socket提供的
    this.ws.message = event => {
      let message = JSON.parse(event.data)
      onMessage && onMessage(message) // 接受到消息觸發的回調
    }

    // 出錯
    this.ws.onerror = error => {
      onError && onError(error)
    }

    this.ws.onclose = () => {
      this.ws = null
    }
  },
  send(msgObj) {
    // 發送消息的時候觸發

    this.ws.send(JSON.stringify(msgObj))
  }
}

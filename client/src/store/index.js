import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_USER: 'SET_USER', // 用戶訊息
  SET_ABOUT_VUEX: 'SET_ABOUT_VUEX', // 練習 Vuex
  SET_TARGET_USER: 'SET_TARGET_USER'
}

const state = {
  user: {},
  targetUser: {},
  count: 0,
  todos: [
    {
      id: 1,
      text: '...',
      done: true
    },
    {
      id: 2,
      text: '...',
      done: false
    }
  ]
}

// 簡單的認知一下於 vue 中 computed 作用於 data
// 在 vuex 中 就是 gatter 作用於 state 最後很重要的，就是要使用 retuen

const getters = {
  user: state => state.user,
  targetUser: state => state.targetUser,
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  getTodoById: state => id => {
    return state.todos.find(todo => todo.id === id)
  }
}

// action 會發出一個 dispatch
// 在 vuex 中如果要改變 state 的狀態，一定要經過下面的流程
// 1. 發出一個 action (dispath a action)
// 2. 接收到 action 後，執行相對應的 mutation (commit mutation)
// 3. 透過 mutation 更改 state
// 每一個 nutation 包含兩個參數
// 1. state 你可以自由取用或更動 state 的值
// 2. payload 這個是從 action 傳來的參數

const mutations = {
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user
    } else {
      user = {}
    }
  },
  // 這一段就是純粹的測試 異步 timeout
  [types.SET_ABOUT_VUEX](state, payload) {
    state.count += payload.amount
  },
  [types.SET_TARGET_USER](state, targetUser) {
    if (targetUser) {
      state.targetUser = targetUser
    } else {
      targetUser = {}
    }
  }
}

// App.vue 在 created 的時候會檢查 localstorge 的 token 有沒有過期
// 如果過期的話會刪除 token 然後跳轉到 login 的畫面
// 如果沒過期的話，就會取出後 this.$store.dispatch('setUser', decode)
// ---注意事項---
// 1. action 可以是非同步函數
// 2. 一個 action 可以觸發多個 mutation

const actions = {
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  setTargetUser: ({ commit }, targetUser) => {
    commit(types.SET_TARGET_USER, targetUser)
  },
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit(types.SET_ABOUT_VUEX, { amount: 30 })
      console.log('加載結束！', this.state.count)
    }, 1000)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
  // modules: {}
})

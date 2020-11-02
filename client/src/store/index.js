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

const mutations = {
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user
    } else {
      user = {}
    }
  },
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

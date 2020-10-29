import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_USER: 'SET_USER' // 用戶訊息
}

const state = {
  user: {},
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
  increment(state, payload) {
    state.count += payload.amount
  }
}

const actions = {
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit('increment', { amount: 30 })
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

import Vue from 'vue'
import Vuex from 'vuex'
const shuffle = require('lodash/shuffle')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formUrls: shuffle([
      '1FAIpQLSfDldBWjk7XD8aR94GK8SqvjvkL1EuUksTFgEfKwG9CkrMqog',
      '1FAIpQLSdDmCbkD7xem1a9MUl1ZBIvzovd8TF6Dm8IrHoqnbeTiifdNg',
      '1FAIpQLSfJf_y2pTZvN0XVdwg45yzuXU8fVjxC1uncXzNpjDPoAAktSw',
      '1FAIpQLSe7tPsu5YfC7S1noMW9ES_GT_X9Mhbaa3kfFUTQENxR1YKdpw',
      '1FAIpQLSesy-kK8VLt6dicske_edSLWZc2x7M3G-qruaZpok97qq3qgg',
      '1FAIpQLSeor3BZ487lkZdS9jVGmjXj0FbtXkRSghuVYfPki67C-rfeRA',
      '1FAIpQLSfw_UJcSmFzpmCNDEsZeS9Rl0lbKHBCuq5kAjS-Mos6ewvDmg',
    ]),
    formIndex: -1,
  },
  getters: {
    currentForm(state) {
      return state.formUrls[state.formIndex]
    },
    completionPercentage(state) {
      return Math.max(
        0,
        Math.min(100, (state.formIndex / state.formUrls.length) * 100)
      )
    },
  },
  mutations: {
    setFormIndex(store, index) {
      store.formIndex = index
    },
  },
  actions: {},
  modules: {},
})

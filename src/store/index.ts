import Vue from 'vue'
import Vuex from 'vuex'
const shuffle = require('lodash/shuffle')
const random = require('lodash/random')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: '',
    formIndex: random(0, 5),
    enForms: shuffle([
      '1FAIpQLScu97bhlZGXZ5xiEfJBI_3ERUnZI_qLqeO8aUDZuvSQHjdaVw',
      '1FAIpQLSeM7_eTXYlMHCr_nFzxcjQZjfYlC-AP9m0Ej2ayHKWtxiCgpQ',
      '1FAIpQLSfF3l2PkhTy8ZOcQNZZxQNURHZDw3UwfXKNfOLF2yhzaoE0SQ',
      '1FAIpQLSe8iJ0pSByaPPlI_XfloSgeu5E9XmXsRDTgy7B0_Q58h9uHuw',
      '1FAIpQLScIil6PWvE7VeCjH-tN_VVpCKfweVK828pN_iDFfsdePIwxHw',
    ]),
    esForms: shuffle([]),
  },
  getters: {
    currentForm(state) {
      if (!state.language) return null
      return state.language === 'es'
        ? state.esForms[state.formIndex]
        : state.enForms[state.formIndex]
    },
  },
  mutations: {
    setLanguage(store, language) {
      store.language = language
    },
  },
})

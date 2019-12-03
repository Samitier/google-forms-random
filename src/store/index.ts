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
      '1FAIpQLScIil6PWvE7VeCjH-tN_VVpCKfweVK828pN_iDFfsdePIwxHw',
      '1FAIpQLSfPnfRrzXGt7kOaIywoSXpualb4Votjf6g_u3Wc0EvWHlbvOQ',
      '1FAIpQLSfPUDtBv4soDLI6HoKU9LoSZRtKxUEO-jxMAE9kzMhH1q5gPQ',
      '1FAIpQLSerZK50xY9RoL8IAytv5BedQxt0h4ljXbNsyIPYEKZVddvc0w',
      '1FAIpQLSc-IrvY9Vi0UMzjJ-SlJ1-ZcLrU3IsWn3osvY9RW0JAx6XXTg',
    ]),
    esForms: shuffle([
      '1FAIpQLScRYAhuTjxwDRBK1oWBOC-uLFUgaq0qmhlQxtQDqVTsXhaE0A',
      '1FAIpQLSdX5Ul2LoZwrNQMd6wXloMLLZxEHgBP2DmLETfmBDt3Ie9x6w',
      '1FAIpQLSfwq0IC4wiGyJ-5D16rHBOc3uZeIil-f3Iz484jhis3P3rNOg',
      '1FAIpQLSeNnDN1tIRycgZaD7u-G8zauFBpPR0KHzC-pucrjn-NDTbevA',
      '1FAIpQLScfwY1kuyWhcYr78dTNN47rghPbqmfG5K7oRDYWPv-Pynx0pQ',
    ]),
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

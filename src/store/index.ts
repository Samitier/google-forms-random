import Vue from 'vue'
import Vuex from 'vuex'
import { parseCSV } from '@/utils/parse-csv'
import { parseRawData } from '@/utils/parse-raw-data'
import { ParsedData } from '@/models/ParsedData'
import { round } from '@/utils/round'
import { pearsonCorrelation } from '@/utils/pearson-correlation'
const shuffle = require('lodash/shuffle')
const random = require('lodash/random')

Vue.use(Vuex)

function getGraphData(state: any, getters: any, variable: string) {
  let sortedData = [...getters.filteredData].sort(
    (a, b) => a[variable] - b[variable]
  )
  const labels = sortedData.map(s => round(s[variable], 4))
  const series = [sortedData.map((d: any) => d[state.dimension])]
  return {
    labels,
    series,
    pearson: round(pearsonCorrelation(labels, series[0]), 4),
  }
}

export default new Vuex.Store({
  state: {
    parsedData: [] as ParsedData[],
    dimension: 'wellBeing',
    filter: {
      prop: '',
      value: 0,
    },
  },
  getters: {
    graphDataHw: (state, getters) =>
      getGraphData(state, getters, 'pHaveWhatTheyWant'),
    graphDataWh: (state, getters) =>
      getGraphData(state, getters, 'pWantWhatTheyHave'),
    graphDataWeightedHw: (state, getters) =>
      getGraphData(state, getters, 'pWeightedHaveWhatTheyWant'),
    graphDataWeightedWh: (state, getters) =>
      getGraphData(state, getters, 'pWeightedWantWhatTheyHave'),
    graphDataHavingPosessions: (state, getters) =>
      getGraphData(state, getters, 'pHavingPosessions'),
    graphDataWantingPosessions: (state, getters) =>
      getGraphData(state, getters, 'pWantingPosessions'),
    filteredData(state) {
      if (state.filter.prop && state.filter.value >= 0) {
        return state.parsedData.filter(
          (s: any) => s[state.filter.prop] === state.filter.value + 1
        )
      }
      return state.parsedData
    },
  },
  mutations: {
    setParsedData(state, parsedData = []) {
      state.parsedData = parsedData
    },
    setDimension(state, dimension) {
      state.dimension = dimension
    },
    setFilterProp(state, prop) {
      state.filter.prop = prop
    },
    setFilterValue(state, value) {
      state.filter.value = value
    },
  },
  actions: {
    async loadAnswers({ commit }) {
      const resp = await fetch('/data.csv')
      const text = await resp.text()
      const rawData: [] = parseCSV(text)
      rawData.shift()
      commit('setParsedData', parseRawData(rawData))
    },
  },
})

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

function getGraphData(state: any, variable: string) {
  let sortedData = [...state.parsedData].sort(
    (a, b) => a[variable] - b[variable]
  )
  if (state.filter.prop)
    sortedData = sortedData.filter(
      s => s[state.filter.prop] === state.filter.value
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
      value: '',
    },
  },
  getters: {
    graphDataHw: state => getGraphData(state, 'pHaveWhatTheyWant'),
    graphDataWh: state => getGraphData(state, 'pWantWhatTheyHave'),
    graphDataWeightedHw: state =>
      getGraphData(state, 'pWeightedHaveWhatTheyWant'),
    graphDataWeightedWh: state =>
      getGraphData(state, 'pWeightedWantWhatTheyHave'),
  },
  mutations: {
    setParsedData(state, parsedData = []) {
      state.parsedData = parsedData
    },
    setDimension(state, dimension) {
      state.dimension = dimension
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

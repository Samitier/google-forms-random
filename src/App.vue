<template>
  <div class="home">
    <h1>What makes us happy?</h1>
    <div class="graph-cont">
      <graph
        id="graph1"
        storeGetter="graphDataHw"
        xAxisTitle="p of having what they want"
        :yAxisTitle="selectedDimension"
      />
      <graph
        id="graph2"
        storeGetter="graphDataWh"
        xAxisTitle="p of wanting what they have"
        :yAxisTitle="selectedDimension"
      />
    </div>
    <div class="graph-cont">
      <graph
        id="graph3"
        storeGetter="graphDataWeightedHw"
        xAxisTitle="weighted p of having what they want"
        :yAxisTitle="selectedDimension"
      />
      <graph
        id="graph4"
        storeGetter="graphDataWeightedWh"
        xAxisTitle="weighted p of wanting what they have"
        :yAxisTitle="selectedDimension"
      />
    </div>
    <select v-model="selectedDimension">
      <option
        v-for="dimension in dimensions"
        :key="dimension"
        v-text="dimension"
        :value="dimension"
      />
    </select>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  onMounted,
  reactive,
  computed,
} from '@vue/composition-api'
import 'chartist/dist/chartist.css'
const Chartist = require('chartist')
import Graph from './components/graph.vue'

export default createComponent({
  name: 'App',
  components: { Graph },
  setup(_, { root }) {
    const state = reactive({
      dimensions: [
        'gratitude',
        'growth',
        'wellBeing',
        'satisfaction',
        'maximizers',
      ],
    })
    onMounted(() => root.$store.dispatch('loadAnswers'))
    const selectedDimension = computed({
      get: () => root.$store.state.dimension,
      set: dimension => root.$store.commit('setDimension', dimension),
    })
    return { ...state, selectedDimension }
  },
})
</script>

<style lang="stylus">
html, body
  height 100%
  width 100%
  margin 0
  overflow hidden
.home
  display flex
  flex-direction column
  max-width 800px
  height 100%
  margin auto
  overflow auto
h1
  text-align center
  margin 2em
.graph-cont
  display flex
  padding-bottom 2em
select
  margin 1em
  max-width 200px
</style>

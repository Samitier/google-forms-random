<template>
  <div class="home">
    <h1>What makes us happy?</h1>
    <div class="graph-cont center">
      <label>Observe by:</label>
      <select v-model="selectedDimension">
        <option
          v-for="dimension in dimensions"
          :key="dimension"
          v-text="dimension"
          :value="dimension"
        />
      </select>
      <label class="p-l">Filter by:</label>
      <select v-model="selectedFilterProp">
        <option
          v-for="filter in filters"
          :key="filter.prop"
          v-text="filter.prop"
          :value="filter.prop"
        />
        <option value="">-</option>
      </select>
      <select v-model="selectedFilterValue" v-if="selectedFilterValues.length">
        <option
          v-for="(value, i) in selectedFilterValues"
          :key="value"
          v-text="value"
          :value="i"
        />
      </select>
      <label class="p-l">n = {{ sampleSize }}</label>
    </div>
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
    <div class="graph-cont">
      <graph
        id="graph5"
        storeGetter="graphDataHavingPosessions"
        xAxisTitle="p of having posessions"
        :yAxisTitle="selectedDimension"
      />
      <graph
        id="graph6"
        storeGetter="graphDataWantingPosessions"
        xAxisTitle="p of wanting posessions"
        :yAxisTitle="selectedDimension"
      />
    </div>
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
      filters: [
        {
          prop: 'age',
          values: [
            'Less than 30 years old',
            '30 - 39 years old',
            '39 - 60 years old',
            '60 years old or more',
          ],
        },
        {
          prop: 'gender',
          values: ['man', 'woman', 'other'],
        },
        {
          prop: 'educationLevel',
          values: [
            'Lower than Secondary Education',
            'High School / Secondary Education degree',
            'Completed part of a university degree, but not finished it.',
            'Vocational Program degree',
            "Bachelor's Degree",
            "Mastr's Degree",
            'PhD',
          ],
        },
        {
          prop: 'studyField',
          values: [
            'Arts and humanities',
            'Health Sciences',
            'Experimental or Exact Sciences',
            'Social Sciences and Law',
            'Engineering and Arquitecture',
            'Others',
            'Prefer not to answer',
          ],
        },
        {
          prop: 'income',
          values: [
            'Less than 1000€',
            'From 1000€ to 3000€',
            'From 3000€ to 5000€',
            'More than 5000€',
          ],
        },
      ],
    })
    onMounted(() => root.$store.dispatch('loadAnswers'))
    const selectedDimension = computed({
      get: () => root.$store.state.dimension,
      set: dimension => root.$store.commit('setDimension', dimension),
    })
    const selectedFilterProp = computed({
      get: () => root.$store.state.filter.prop,
      set: prop => {
        root.$store.commit('setFilterProp', prop)
        selectedFilterValue.value = 0
      },
    })
    const selectedFilterValue = computed({
      get: () => root.$store.state.filter.value,
      set: v => root.$store.commit('setFilterValue', v),
    })
    const selectedFilterValues = computed(() => {
      const filter = state.filters.find(
        f => f.prop === selectedFilterProp.value
      )
      return filter ? filter.values : []
    })
    const sampleSize = computed(() => root.$store.getters.filteredData.length)
    return {
      ...state,
      selectedDimension,
      selectedFilterProp,
      selectedFilterValue,
      selectedFilterValues,
      sampleSize,
    }
  },
})
</script>

<style lang="stylus">
html, body
  height 100%
  width 100%
  margin 0
  overflow hidden
  background #F9F9FF
.home
  display flex
  flex-direction column
  max-width 800px
  height 100%
  margin auto
  overflow auto
  background white
h1
  text-align center
  margin 1.5em
.graph-cont
  display flex
  padding 1em
  border-bottom .5em solid #F9F9FF
  &.center
    justify-content center
    align-items center
.p-l
  padding-left 3em
label
  margin 0 .5em
select
  margin 1em .5em
  max-width 200px
</style>

<template>
  <div class="container">
    <div :id="id" class="graph" />
    <div class="pvalue">&rho;: {{ pearsonCorrelation }}</div>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  onMounted,
  watch,
  computed,
} from '@vue/composition-api'
const Chartist = require('chartist')
const Axistitle = require('chartist-plugin-axistitle')

export default createComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    storeGetter: {
      type: String,
      required: true,
    },
    xAxisTitle: {
      type: String,
      required: true,
    },
    yAxisTitle: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    watch(() => {
      const data = root.$store.getters[props.storeGetter]
      const options = {
        showLine: false,
        axisX: {
          labelInterpolationFnc(value: string, index: number) {
            return index % 13 === 0 ? value : null
          },
        },
        plugins: [
          Axistitle({
            axisX: {
              axisTitle: props.xAxisTitle,
              offset: {
                x: 0,
                y: 32,
              },
            },
            axisY: {
              axisTitle: props.yAxisTitle,
              offset: {
                x: 0,
                y: 12,
              },
              flipTitle: true,
            },
          }),
        ],
      }
      new Chartist.Line('#' + props.id, data, options, [[]])
    })
    const pearsonCorrelation = computed(
      () => root.$store.getters[props.storeGetter].pearson
    )
    return { pearsonCorrelation }
  },
})
</script>

<style lang="stylus" scoped>
.graph
  height 350px
.container
  padding 0 1em
  flex 1
.pvalue
  padding 1em
</style>

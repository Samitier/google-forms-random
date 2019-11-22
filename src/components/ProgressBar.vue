<template>
  <div>
    <div class="bar-container">
      <div
        class="bar-progress"
        data-testid="progressBar"
        :style="{ width: percentageString }"
      ></div>
    </div>
    <div class="text" v-text="percentageString"></div>
  </div>
</template>

<script>
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    percentage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    percentageString() {
      const percentage = Math.max(0, Math.min(this.percentage, 100))
      return `${percentage}%`
    },
  },
})
</script>

<style lang="stylus" scoped>
.bar-container
  position relative
  background-color transparentify(main-blue, 0.15)
  width 100%
  height 4px

.bar-progress
  position absolute
  top 0
  bottom 0
  left 0
  background-color main-blue

.bar-container,
.bar-progress
  border-radius 2.5px

.text
  margin 0.5em
  color get-color('dark-hot-pink')
  font-size 0.8rem
</style>

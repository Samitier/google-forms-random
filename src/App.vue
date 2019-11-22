<template>
  <div class="home">
    <md-card v-if="!currentForm" class="card">
      <template v-if="!percentage">
        <md-card-header>
          <div class="md-title">Welcome to this experiment</div>
        </md-card-header>
        <md-card-content>
          <p>
            First of all, thank you for your participation. Your help means a
            lot to us.
          </p>
          <p>
            Below you will see multiple questionnaires being shown. Please make
            sure <b>all the answers are completed</b> before going to the next
            one by pressing "next form".
          </p>
        </md-card-content>
      </template>
      <template v-if="percentage === 100">
        <md-card-header>
          <div class="md-title">Experiment finished!</div>
        </md-card-header>
        <md-card-content>
          <p>
            Thank you very much for your participation!
          </p>
        </md-card-content>
      </template>
    </md-card>
    <EmbedGForm v-if="currentForm" :src="currentForm" />
    <md-card class="card" v-if="percentage !== 100">
      <md-card-content>
        Please make sure you've finished the current form before pressing next
        form.
      </md-card-content>
      <md-card-actions>
        <!-- <md-progress-bar md-mode="determinate" :md-value="percentage"></md-progress-bar> -->
        <md-button @click="goToNext">Next form</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import EmbedGForm from '@/components/EmbedGForm.vue'

export default createComponent({
  name: 'App',
  components: { EmbedGForm },
  setup(_, { root }) {
    const currentForm = computed(() => root.$store.getters.currentForm)
    const percentage = computed(() => root.$store.getters.completionPercentage)
    const goToNext = () => root.$store.dispatch('goToNext')
    return { currentForm, percentage, goToNext }
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
  max-width 700px
  height 100%
  margin auto
.card
    margin 1em 1.5em
.md-card
  border-radius .45em
.md-progress-bar-fill
  background-color #448aff
.md-progress-bar
  background-color rgba(68,138,255,.38)
  width: 200px
</style>

<template>
  <div class="home">
    <md-card v-if="!currentForm" class="card">
      <md-card-header>
        <div class="md-title">
          What makes us happy - Lo que nos hace felices
        </div>
      </md-card-header>
      <md-card-content>
        <p>
          Hello. Please select the language you want to use for this experiment.
        </p>
        <p>
          Hola. Por favor selecciona el idioma en el que quieres llevar a cabo
          este experimento.
        </p>
        <md-card-actions>
          <md-button @click="selectLanguage('en')">English</md-button>
          <md-button @click="selectLanguage('es')">Español</md-button>
        </md-card-actions>
      </md-card-content>
    </md-card>
    <EmbedGForm v-if="currentForm" :src="currentForm" />
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
    const selectLanguage = (language: string) =>
      root.$store.commit('setLanguage', language)
    return { currentForm, selectLanguage }
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
</style>

<template>
  <div class="home">
    <ProgressBar class="progress" :percentage="percentage" />
    <EmbedGForm v-if="currentForm" :src="currentForm" />
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import EmbedGForm from '@/components/EmbedGForm.vue'
import ProgressBar from '@/components/ProgressBar.vue'

export default createComponent({
  name: 'home',
  components: { EmbedGForm, ProgressBar },
  setup(_, { root }) {
    const currentForm = computed(() => root.$store.getters.currentForm)
    const percentage = computed(() => root.$store.getters.completionPercentage)
    return { currentForm, percentage }
  },
})
</script>
<style scoped lang="stylus">
.home
  width 700px
  height 100%
  margin auto
.progress
  width 300px
  margin auto
</style>

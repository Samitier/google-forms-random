<template>
  <iframe
    :src="`https://docs.google.com/forms/d/e/${src}/viewform?embedded=true`"
    width="700"
    height="100%"
    style="height: 100%"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
    >Loading...</iframe
  >
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
})
</script>


<template>
  <a v-if="doIsExternal(url)" :href="url" target="_blank">
    <slot/>
  </a>
  <router-link v-else :to="url" replace>
    <slot/>
  </router-link>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  name: 'Linker',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    doIsExternal(url) {
      return isExternal(url)
    }
  }
}
</script>

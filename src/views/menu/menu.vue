<template>
  <div>
    <keep-alive :include="cachedViews" include="[InfoInput]">
      <router-view :key="$route.name"/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'Menu',
  computed: {
    cachedViews() {
      return this.$store.getters.cachedViews
    }
  }
}
</script>

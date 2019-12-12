<template>
  <div class="app-wrapper">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="$route.name"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.getters.cachedViews
    }
  }
}
</script>

<style lang="scss">
.el-main{
  padding:0;
}
.app-wrapper{
  padding:20px;
  margin-top:100px;
  overflow: hidden;
}
.el-header{
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1500;
}
</style>

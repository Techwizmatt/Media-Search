<template>
  <div class="app" id="app">
    <vue-headful title="" />
    <navbar />

    <transition name="fade" mode="out-in">
      <router-view class="container" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    navbar: require('@/app/components/navbar').default
  }
}
</script>

<style lang="scss">
</style>

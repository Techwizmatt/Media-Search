<template>
  <section>
    <img class="poster" :alt="title" :src="url"/>
    <b-tag type="is-success" size="">Medium</b-tag>
  </section>
</template>

<script>
export default {
  name: 'poster',
  props: {
    title: String,
    url: String
  }
}
</script>

<style scoped>

</style>

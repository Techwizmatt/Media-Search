<template>
  <section>
    <div class="columns is-hidden-touch" v-for="contentRow in desktopContent" :key="contentRow">
      <div class="column is-2" v-for="content in contentRow" :key="content">
        <b-image :src="content.poster" max-width></b-image>
      </div>
    </div>
    <div class="columns is-mobile is-hidden-desktop m-1" v-for="contentRow in tabletContent" :key="contentRow">
      <div class="column is-4" v-for="content in contentRow" :key="content">
        <b-image :src="content.poster" max-width></b-image>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    content: Array
  },
  computed: {
    desktopContent () {
      this.content.map(content => {
        content.images.forEach(image => {
          if (image.coverType === 'poster') {
            content.poster = image.remoteUrl
          }
        })

        return content
      })

      return this.$chunk(this.content, 6)
    },
    tabletContent () {
      this.content.map(content => {
        content.images.forEach(image => {
          if (image.coverType === 'poster') {
            content.poster = image.remoteUrl
          }
        })

        return content
      })

      return this.$chunk(this.content, 3)
    }
  }
}
</script>

<style scoped>

</style>

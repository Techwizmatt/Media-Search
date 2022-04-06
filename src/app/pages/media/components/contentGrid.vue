<template>
  <section>
    <div class="columns is-hidden-touch" v-for="(contentRow, index) in desktopContent" :key="index">
      <div class="column is-2 has-text-centered" v-for="content in contentRow" :key="content.id">
        <b-image :src="content.poster" max-width></b-image>
        <div class="columns my-1">
          <div class="column">
            <b-button expanded @click="doShowOptions(content)">Options</b-button>
          </div>
          <div class="column">
            <b-button expanded type="is-primary" disabled="true"><b-icon icon="play" class="mr-2"></b-icon>Play</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-mobile is-hidden-desktop m-1" v-for="(contentRow, index) in tabletContent" :key="index">
      <div class="column is-4" v-for="content in contentRow" :key="content.id">
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
  methods: {
    doShowOptions (content) {
      this.$services.search.doShareMedia(content.path).then(data => {
        console.log(data)
      }).catch(error => {
        console.log(error)
      })
    }
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

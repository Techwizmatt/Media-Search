<template>
  <section>
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
    <b-tabs class="mt-3" v-model="active" expanded>
      <b-tab-item label="TV Shows">
        <content-grid :content="series"></content-grid>
      </b-tab-item>
      <b-tab-item label="Movies">
        <content-grid :content="movies"></content-grid>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import ContentGrid from '@/app/pages/media/components/contentGrid'
export default {
  components: { ContentGrid },
  data: () => ({
    isLoading: false,
    active: 0,
    series: [],
    movies: []
  }),
  methods: {
    doLoadMedia () {
      this.isLoading = true
      const media = [this.$services.series.doGetAll(), this.$services.movie.doGetAll()]

      Promise.all(media).then(data => {
        this.series = data[0]
        this.movies = data[1]
      }).catch(_ => {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Failed to load resources',
          duration: 3000
        })
      }).finally(_ => {
        this.isLoading = false
      })
    }
  },
  mounted () {
    this.doLoadMedia()
  }
}
</script>

<style scoped>

</style>

<template>
  <section>
    <search @doSearch="doSearch" :isLoading="isLoading"/>
    <b-tabs class="mt-3" v-model="active" expanded>
      <b-tab-item label="TV Shows">
        <results :results="results.series" :currentQuery="currentQuery" :isLoading="isLoading" @doReloadResults="doReloadResults"/>
      </b-tab-item>
      <b-tab-item label="Movies">
        <results :results="results.movies" :currentQuery="currentQuery" :isLoading="isLoading" @doReloadResults="doReloadResults"/>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import Search from '@/app/pages/search/components/search'
import Results from '@/app/pages/search/components/results'

export default {
  components: { Results, Search },
  data: () => ({
    isLoading: false,
    active: 0,
    currentQuery: String(),
    results: {
      series: [],
      movies: []
    }
  }),
  methods: {
    doSearch: function (query) {
      if (query.length >= 1) {
        this.currentQuery = query
        this.isLoading = true

        this.$services.search.doGetQuery(query).then(data => {
          this.results = data
        }).catch(_ => {
          this.$buefy.toast.open({
            message: 'Unable to search for content',
            type: 'is-danger',
            duration: 3000
          })
        }).finally(_ => {
          this.isLoading = false
        })
      } else {
        this.$buefy.toast.open({
          message: 'You gotta input something in the search field',
          type: 'is-danger',
          duration: 3000
        })
      }
    },
    doReloadResults: function () {
      this.doSearch(this.currentQuery)
    }
  }
}
</script>

<style scoped>

</style>

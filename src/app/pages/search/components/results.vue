<template>
  <section>
    <b-loading :is-full-page="true" v-model="isLoadingAdded" :can-cancel="false"></b-loading>
    <ul>
      <span v-if="!isLoading">
        <li v-for="result in results" :key="result.id" class="media-content">
        <div class="card mt-3">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <img class="poster" :alt="result.title" :src="result.poster"/>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ result.title }}</p>
                <p class="subtitle is-6">{{ result.year }}</p>
                <p class="overview">{{ result.overview | ellipses }}</p>
                <b-button v-if="!result.onDrive" class="add-content" type="is-success" :disabled="result.onDrive" @click="doClickAdd(result.title, result.id, result.type)" >Add</b-button>
                <b-button v-if="result.onDrive" class="add-content" type="is-info" :disabled="result.onDrive">Added</b-button>
              </div>
            </div>
          </div>
        </div>
      </li>
        <div v-if="results.length === 0 && currentQuery.length >= 1">
          <h4>No results - Sorry about that</h4>
          <h6>Tips:</h6>
          <ul>
            <li>Check your spelling?</li>
            <li>Did you include the year?</li>
          </ul>
          <br>
          <h6>Still can't find it? Reach out to
            <b-tooltip label="Matthew Maggio" position="is-top">
              <i style="cursor: pointer;">The Owner</i>
            </b-tooltip>
          </h6>
        </div>
        <div v-else-if="results.length === 0">
          <h4>Search for anything!</h4>
        </div>
      </span>
      <span v-if="isLoading">
        <li v-for="index in 3" :key="index">
          <div class="card mt-3">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <p class="image">
                <b-skeleton width="10em" height="15em"></b-skeleton>
              </p>
                </div>
                <div class="media-content">
                  <b-skeleton height="3em" width="20em"></b-skeleton>
                  <div class="columns mt-1">
                    <div class="column is-1 is-2-tablet">
                      <b-skeleton width="5em"></b-skeleton>
                    </div>
                    <div class="column is-3">
                      <div class="rating">
                        <span class="icon is-small" style="float:left;">
                          <b-skeleton></b-skeleton>
                        </span>
                        <span class="icon is-small ml-1" style="float:left;">
                          <b-skeleton></b-skeleton>
                        </span>
                        <span class="icon is-small ml-1" style="float:left;">
                          <b-skeleton></b-skeleton>
                        </span>
                        <span class="icon is-small ml-1" style="float:left;">
                          <b-skeleton></b-skeleton>
                        </span>
                        <span class="icon is-small ml-1" style="float:left;">
                          <b-skeleton></b-skeleton>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </li>
      </span>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'results',
  props: {
    currentQuery: String,
    isLoading: Boolean,
    results: Array
  },
  data: () => ({
    isLoadingAdded: false
  }),
  methods: {
    doClickAdd: function (title, id, type) {
      this.$buefy.dialog.confirm({
        title: `Add ${title} ?`,
        message: `Are you sure you want to add this ${type}, Once added the content will be searched for and downloaded. You will be notified when process has completed.`,
        confirmText: 'Add',
        type: 'is-success',
        trapFocus: true,
        onConfirm: () => {
          this.isLoadingAdded = true
          if (type === 'series') {
            this.$services.series.doAdd(id).then(data => {
              this.$buefy.toast.open({
                message: 'Added successfully',
                type: 'is-success'
              })

              console.log(data)
            }).catch(error => {
              this.$buefy.toast.open({
                message: error,
                type: 'is-danger'
              })
            }).finally(_ => {
              this.isLoadingAdded = false
              this.$emit('doReloadResults')
            })
          } else if (type === 'movie') {
            this.$services.movie.doAdd(id).then(data => {
              this.$buefy.toast.open({
                message: 'Added successfully',
                type: 'is-success'
              })

              console.log(data)
            }).catch(error => {
              this.$buefy.toast.open({
                message: error,
                type: 'is-danger'
              })
            }).finally(_ => {
              this.isLoadingAdded = false
              this.$emit('doReloadResults')
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.media-content { }
.add-content { position: absolute; bottom: 1em; right: 1em; }
.poster { width: 10em !important; border: 0 solid; border-radius: 10px !important; }
.rating { margin-top: 0.3em !important; }
.overview { overflow: hidden; max-height: 6em !important; }
</style>

<template>
  <section>
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
    <notice ref="notice">
      <p>If you just added a TV Show or Movie it can take a moment for it to show up, I'm working on the logic for it.</p>
      <br>
      <p>Please note tracking this data is extremely difficult, Media may show that is not actually in the queue and failed. Oops.</p>
    </notice>
    <b-tabs class="mt-3" v-model="active" expanded>
      <b-tab-item label="TV Shows">
        <results :data="data.series"/>
      </b-tab-item>
      <b-tab-item label="Movies">
        <results :data="data.movies"/>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import Results from '@/app/pages/queue/components/results'
import Notice from '@/app/components/notice'
export default {
  components: { Notice, Results },
  data: () => ({
    active: 0,
    data: {},
    isLoading: false
  }),
  methods: {
    doStartQueueCheck () {
      this.isLoading = true
      this.$services.status.doGetDownloads().then(data => {
        this.data = data

        this.timeout = setTimeout(() => {
          this.doStartQueueCheck()
        }, 10000)
      }).catch(error => {
        console.log(error)
      }).finally(_ => {
        this.isLoading = false
      })
    }
  },
  mounted () {
    this.doStartQueueCheck()
    this.$refs.notice.doOpen()
  },
  destroyed () {
    try {
      clearTimeout(this.timeout)
    } catch (error) {
      console.log('Error clearing interval')
    }
  }

}
</script>

<style scoped>

</style>

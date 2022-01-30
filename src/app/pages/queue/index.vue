<template>
  <section>
    <results :data="data.series" />
    <p class="mt-5">This page does not currently show movies</p>
  </section>
</template>

<script>
import Results from '@/app/pages/queue/components/results'
export default {
  components: { Results },
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

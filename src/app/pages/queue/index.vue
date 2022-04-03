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
    <h3>This page has been disabled, please redirect.</h3>
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
    queueBeta: [],
    isLoading: false
  })
}
</script>

<style scoped>

</style>

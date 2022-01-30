<template>
  <section>
    <form @submit.prevent="doSearch">
      <b-field custom-class="is-medium">
        <b-input v-model="query" placeholder="Search for TV Shows and Movies" size="is-medium" expanded :disabled="isLoading"></b-input>
        <p class="control is-hidden-mobile">
          <b-button native-type="submit" label="Search" type="is-primary" size="is-medium" :loading="isLoading"/>
        </p>
      </b-field>
      <p class="control is-hidden-tablet px-4">
        <b-button native-type="submit" label="Search" type="is-primary" size="is-medium" expanded :loading="isLoading"/>
      </p>
    </form>
  </section>
</template>

<script>
export default {
  name: 'search',
  props: {
    isLoading: Boolean
  },
  data: () => ({
    query: String()
  }),
  methods: {
    doSearch: function () {
      this.$emit('doSearch', this.query)
    }
  }
}
</script>

<style scoped>

</style>

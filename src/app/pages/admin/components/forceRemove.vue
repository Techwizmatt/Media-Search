<template>
  <section>
    <div class="card p-5">
      <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="false"></b-loading>
      <p class="title">Force Remove</p>
      <p class="subtitle is-size-6">Remove media if something broke</p>
      <form @submit.prevent="confirmRemoval">
        <b-field label="Media">
          <b-select placeholder="Media type" icon="photo-film">
            <option value="series" key="series">TV Show</option>
            <option value="movie" key="movie">Movie</option>
          </b-select>
        </b-field>
        <b-field label="Location">
          <b-select placeholder="Content location" icon="hard-drive">
            <option value="queue" key="queue">Queue</option>
            <option value="drive" key="drive">Drive</option>
          </b-select>
        </b-field>
        <b-field label="Media ID">
          <b-input icon="photo-film" v-model="removal.id" placeholder="2035946"></b-input>
        </b-field>
        <b-button native-type="submit" type="is-danger" disabled>Force Remove</b-button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    isLoading: true,
    removal: {
      type: '',
      location: '',
      id: null
    }
  }),
  methods: {
    confirmRemoval () {

    },
    doForceRemove () {

    }
  }
}
</script>

<style scoped>

</style>

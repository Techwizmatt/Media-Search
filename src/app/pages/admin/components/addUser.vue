<template>
  <section>
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
    <div class="card p-5">
      <h4>Create user</h4>
      <form @submit.prevent="doAdd">
        <b-field label="First Name">
          <b-input icon="user-circle" v-model="user.firstName" placeholder="John" maxlength="16"></b-input>
        </b-field>
        <b-field label="Last Name">
          <b-input icon="user-circle" v-model="user.lastName" placeholder="Appleseed" maxlength="16"></b-input>
        </b-field>
        <b-field label="Phone Number">
          <b-input icon="mobile" v-model="user.phone" placeholder="6021119988" maxlength="10"></b-input>
        </b-field>
        <b-field label="Email registered with Plex">
          <b-input icon="envelope" v-model="user.email" placeholder="JohnAppleseed@gmail.com" maxlength="64"></b-input>
        </b-field>
        <b-button native-type="submit" type="is-primary">Create user</b-button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    user: {
      firstName: null,
      lastName: null,
      phone: null,
      email: null
    }
  }),
  methods: {
    doAdd: function () {
      this.isLoading = true
      this.$services.users.doCreate(this.user).then(_ => {
        this.$buefy.toast.open({
          type: 'is-success',
          message: 'Successfully added user',
          duration: 3000
        })
      }).catch(_ => {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Error occurred',
          duration: 3000
        })
      }).finally(_ => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <section>
    <div class="card">
      <div class="card-content">
        <form @submit.prevent="doSubmit">
          <b-field class="mt-5" custom-class="is-medium" v-if="!(codeReady)">
            <b-input v-model="phoneNumber" type="tel" placeholder="Phone Number" size="is-medium" maxlength="10" expanded :disabled="isLoading"></b-input>
            <p class="control is-hidden-mobile">
              <b-button native-type="submit" :hidden="codeReady" :label="codeReady ? 'Sign in' : 'Send Code'" type="is-primary" size="is-medium" :loading="isLoading"/>
            </p>
          </b-field>
          <span v-else>
            <p class="ml-2">Sign in Code was sent to {{ phoneNumber | formatPhoneNumber }} <a @click="doReset" style="vertical-align: super; font-size: 0.8em;" >Edit</a></p>
            <b-field class="mt-3" custom-class="is-medium" >
              <b-input v-model="code" type="code" placeholder="Sign in Code" size="is-medium" maxlength="6" expanded :disabled="isLoading"></b-input>

              <p class="control is-hidden-mobile">
                <b-button native-type="submit" :hidden="codeReady" :label="codeReady ? 'Sign in' : 'Send Code'" type="is-primary" size="is-medium" :loading="isLoading"/>
              </p>
            </b-field>
          </span>

          <p class="control is-hidden-tablet px-4">
            <b-button native-type="submit" :label="codeReady ? 'Sign in' : 'Send Code'" type="is-primary" size="is-medium" expanded :loading="isLoading"/>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import http from '@/middleware/axios'

export default {
  name: 'index',
  data: () => ({
    isLoading: false,
    codeReady: false,
    phoneNumber: null,
    code: null
  }),
  methods: {
    doSubmit () {
      if (!this.codeReady) {
        this.doSendCode()
      } else {
        this.doSignIn()
      }
    },
    doSendCode () {
      this.isLoading = true

      this.$services.auth.doRequestCode(this.phoneNumber).then(_ => {
        this.codeReady = true
      }).catch(_ => {
        this.$buefy.toast.open({
          message: 'An error occurred',
          type: 'is-danger',
          duration: 3000
        })
      }).finally(_ => {
        this.isLoading = false
      })
    },
    doSignIn () {
      this.isLoading = true

      this.$services.auth.doSignIn(this.phoneNumber, this.code).then(data => {
        localStorage.setItem('token', data.token)

        this.$http.defaults.headers.common.Authorization = `Bearer ${data.token}`

        this.$router.push({ path: '/search' })
      }).catch(_ => {
        this.$buefy.toast.open({
          message: 'An error occurred',
          type: 'is-danger',
          duration: 3000
        })
      }).finally(_ => {
        this.isLoading = false
      })
    },
    doReset () {
      this.codeReady = false
    }
  }
}
</script>

<style scoped>

</style>

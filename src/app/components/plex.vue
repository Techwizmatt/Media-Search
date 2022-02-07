<template>
  <section>
    <b-modal trap-focus full-screen :active="isOpen">
      <div class="columns mt-6">
        <div class="column is-half is-offset-one-quarter has-text-centered">
          <img :src="require('@/assets/media/plex.png')" alt="The Plex Logo" class="logo"/>
          <h4>Plex</h4>
          <b-button v-if="canContinue" class="mt-2" @click="doContinue" type="is-primary" expanded>Continue</b-button>
          <b-button v-else class="mt-2" @click="doOpenPlexInvite" type="is-primary" expanded>
            <b-icon :icon="clickedAccept ? 'sync-alt' : 'check-circle'" :custom-class="clickedAccept ? 'fa-spin' : ''" class="mr-2"></b-icon>
            {{ clickedAccept ? 'Waiting...' : 'Accept Plex Invite' }}
          </b-button>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
export default {
  data: () => ({
    isOpen: false,
    clickedAccept: false,
    canContinue: false,
    plexInviteToken: null
  }),
  methods: {
    doOpen () {
      this.isOpen = true
      this.doGetPlexStatus()
    },
    doContinue () {
      this.isOpen = false
    },
    doOpenPlexInvite () {
      if (this.plexInviteToken) {
        this.clickedAccept = true
        window.open(`https://plex.tv/servers/shared_servers/accept?invite_token=${this.plexInviteToken}`)
      } else {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Unable to open invite',
          duration: 3000
        })
      }
    },
    doGetPlexStatus () {
      this.$services.users.doGetPlexStatus().then(data => {
        this.plexInviteToken = data.inviteToken

        if (data.accepted) {
          this.canContinue = true
        } else {
          this.timeout = setTimeout(() => {
            this.doGetPlexStatus()
          }, 3000)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.logo { width: 6em !important; }
</style>

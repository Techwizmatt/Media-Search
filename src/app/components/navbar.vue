<template>
  <section>
    <b-navbar shadow fixed-top :class="visible ? '' : 'hidden'">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/search' }">
          <img src="../../assets/media/kunai.png" alt="Kunai Knife logo">
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{ path: '/search' }">
          Search
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/media' }">
          Media
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/queue' }">
          Queue
        </b-navbar-item>
        <b-navbar-item v-if="status.user.isAdmin" tag="router-link" :to="{ path: '/admin' }">
          Admin
        </b-navbar-item>
      </template>

      <template #center>

      </template>

      <template #end>
        <b-navbar-item tag="div">
          Welcome {{ status.user.firstName }} {{ status.user.lastName }}
        </b-navbar-item>
        <b-navbar-item tag="div" v-if="status">
          <div class="buttons">
            <b-dropdown :triggers="['hover']">
              <template #trigger>
                <b-button outline><b-icon class="mr-2" :icon="status.DownloadPaused ? 'pause' : 'sync-alt'" :custom-class="status.DownloadPaused ? '' : 'fa-spin'"></b-icon>{{ status.DownloadRate | fileSize }} / Sec</b-button>
              </template>

              <b-dropdown-item disabled>{{ (status.RemainingSizeMB * 1000000) | fileSize }} left in Download queue</b-dropdown-item>
              <b-dropdown-item disabled v-if="(status.FreeDiskSpaceMB <= 10000)">{{ (status.FreeDiskSpaceMB * 1000000) | fileSize }} left</b-dropdown-item>

            </b-dropdown>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <plex ref="plex"></plex>
  </section>
</template>

<script>
import Plex from '@/app/components/plex'

export default {
  components: { Plex },
  data: () => ({
    timeout: null,
    visible: true,
    status: {
      user: {
        forceLogout: false
      }
    }
  }),
  methods: {
    doGetCurrentStatus () {
      this.$services.status.doGetCurrent().then(data => {
        this.status = data

        if (this.status.user.forceLogout) {
          localStorage.removeItem('token')
          this.$router.push({ path: '/' })
        }

        this.timeout = setTimeout(() => {
          this.doGetCurrentStatus()
        }, 5000)
      }).catch(error => {
        console.log(error)
      })
    },
    onMount () {
      clearTimeout(this.timeout)

      if (this.visible) {
        this.doGetCurrentStatus()

        this.$services.users.doGetPlexStatus().then(data => {
          if (!data.accepted) {
            this.$refs.plex.doOpen()
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  },
  mounted () {
    this.visible = this.$route.meta.showNav

    this.onMount()
  },
  destroyed () {
    try {
      clearTimeout(this.timeout)
    } catch (error) {
      console.log('Error clearing interval')
    }
  },
  watch: {
    $route: function (to, from) {
      this.visible = to.meta.showNav

      this.onMount()
    }
  }
}
</script>

<style scoped>
.hidden { display: none }
</style>

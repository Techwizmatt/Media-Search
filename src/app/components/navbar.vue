<template>
  <b-navbar shadow fixed-top :class="visable ? '' : 'hidden'">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/search' }">
        <img src="../../assets/media/kunai.png" alt="Kunai Knife logo">
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/search' }">
        Search
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/queue' }">
        Queue
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
</template>

<script>
export default {
  data: () => ({
    timeout: null,
    visable: true,
    status: {
      user: {}
    }
  }),
  methods: {
    doGetCurrentStatus () {
      this.$services.status.doGetCurrent().then(data => {
        this.status = data

        this.timeout = setTimeout(() => {
          this.doGetCurrentStatus()
        }, 5000)
      }).catch(error => {
        console.log(error)
      })
    },
    onMount () {
      clearTimeout(this.timeout)

      if (this.visable) {
        this.doGetCurrentStatus()
      }
    }
  },
  mounted () {
    this.visable = this.$route.meta.requiresAuth

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
      this.visable = to.meta.requiresAuth

      this.onMount()
    }
  }
}
</script>

<style scoped>
.hidden { display: none }
</style>

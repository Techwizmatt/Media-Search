<template>
<!--  <section>-->
<!--    <nav class="navbar">-->
<!--      <div class="navbar-brand">-->
<!--        <router-link class="navbar-item" to="/">-->
<!--          <img alt="Kunai Knife logo" src="../../assets/media/kunai.png">-->
<!--        </router-link>-->
<!--      </div>-->
<!--    </nav>-->
<!--  </section>-->
  <b-navbar shadow fixed-top>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../../assets/media/kunai.png" alt="Kunai Knife logo">
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
    </template>

    <template #end>
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
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data: () => ({
    timeout: null,
    status: null
  }),
  methods: {
    doStartDownloadSpeed () {
      this.$services.status.doGetCurrent().then(data => {
        this.status = data

        this.timeout = setTimeout(() => {
          this.doStartDownloadSpeed()
        }, 5000)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.doStartDownloadSpeed()
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

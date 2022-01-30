<template>
  <section>
    <b-collapse class="card mt-3" animation="slide" v-for="(item, _, index) in data" :key="item.title" :open="isOpen == index" @open="isOpen = index">
      <template #trigger="props">
        <div class="card-header" role="button">
          <div class="card-header-title">
            <p class="title is-3 p-2">{{ item.title }}</p>
          </div>
          <a class="card-header-icon">
            <b-icon
              :icon="props.open ? 'sort-down' : 'sort-up'">
            </b-icon>
          </a>
        </div>
      </template>

      <div class="card-content">
        <div class="content downloads">
          <div class="card" v-for="download in item.downloads" :key="download.title">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <div class="columns is-mobile">
                    <div class="column">
                      <p class="title is-4">{{ download.title }}</p>
                      <p class="subtitle is-6">{{ download.info }}</p>
                    </div>
                    <div class="column">
                      <b-taglist class="download-tags-right" attached>
                        <b-tag type="is-dark">Resolution</b-tag>
                        <b-tag type="is-success">{{ download.resolution }}</b-tag>
                      </b-taglist>
                      <b-taglist v-if="download.status === 'Downloading'" class="download-tags-right" attached>
                        <b-tag type="is-dark">Time left</b-tag>
                        <b-tag type="is-info">{{ download.timeleft | formatTimeFromSeconds }}</b-tag>
                      </b-taglist>
                      <b-taglist v-else class="download-tags-right" attached>
                        <b-tag type="is-dark">Status</b-tag>
                        <b-tag type="is-purple">{{ download.status }}</b-tag>
                      </b-taglist>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
      </footer>
    </b-collapse>
  </section>
</template>

<script>
export default {
  name: 'results',
  props: {
    data: Object
  },
  data: () => ({
    isOpen: 0
  })
}
</script>

<style scoped>
.downloads { max-height: 20em !important; overflow-y:auto; overflow-x: hidden; }
.media-content { overflow: hidden; }
.download-tags-right { justify-content: flex-end; }
.download-tags-right .tag { width: 7em !important; }
</style>

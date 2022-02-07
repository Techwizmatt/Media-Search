<template>
  <section>
    <b-steps v-model="active">
      <b-step-item step="1" label="Welcome" clickable >
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
            <span class="has-text-centered">
              <h3>Hello!</h3>
            </span>
            <p>Welcome to my little side project! When I'm not doing "actual" work, I work on this. 🤷‍</p>
            <br>
            <p>I made this because I like sharing content and like being able to have large datasets of content to watch for my freetime.
              A great example of this would be as I'm typing this out I'm watching Naruto, lol.
              Thank you to the one who recommended the show to me, You know who you are. It's fucking fantastic!</p>
          </div>
        </div>
      </b-step-item>

      <b-step-item step="2" label="How does this work?" clickable>
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
            <br>
            <p>This application is <span class="has-text-weight-bold">NOT</span> used for watching content, This application is used for adding content to a
            streaming service called Plex. We'll get that set up in a moment here if you haven't already!</p>
            <br>
            <p>
              Once you add content, This application will automatically find it on the web using something called news-servers.
              Everything is handle for you! No need for a VPN, Storage, Servers, etc...
            </p>
            <br>
            <p>Downside? <span class="has-text-weight-bold">Yes</span> - Plex is not free on IOS (iPhone, iPad) Devices,
              However for a onetime payment of $4.99 you can get unlimited access. Although it is 100% free on Apple TV.</p>
            <br>
          </div>
        </div>
      </b-step-item>

      <b-step-item step="3" label="How can I watch the content I add?" clickable>
        <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
              <span class="has-text-centered">
                <h3>Plex!</h3>
              </span>
            <p>Have I mentioned it enough? You use the application Plex, Download it on your Apple TV, iPhone, iPad, and even your Mac!</p>
            <br>
            <p>You can find it on the Apple App Store | Google Play Store | or Plex.tv</p>
            <br>
            <p>Thank you for using my Application, It truly brings joy to my heart. I've spent a lot of time and energy on this.</p>
            <br>
          </div>
        </div>
      </b-step-item>
      <template #navigation="{ next }">
        <div class="columns">
          <div class="column is-offset-8 is-one-quarter">
            <b-button v-if="!next.disabled" type="is-success" icon-pack="fas" icon-right="arrow-circle-right" @click.prevent="next.action" expanded>Next</b-button>
            <b-button v-else type="is-success" icon-pack="fas" icon-right="check-circle" @click.prevent="doFinish" expanded>Finish</b-button>
          </div>
        </div>
      </template>
    </b-steps>
  </section>
</template>

<script>
export default {
  data: () => ({
    active: 0
  }),
  methods: {
    doFinish () {
      this.$router.push({ path: '/search' })
    }
  }
}
</script>

<style scoped>
.full-height { position: absolute; bottom: 1em; height: 100%; }
</style>

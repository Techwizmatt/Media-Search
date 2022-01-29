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
export default {}
</script>

<style scoped>

</style>

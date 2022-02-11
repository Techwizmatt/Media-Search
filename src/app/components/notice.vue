<template>
  <section>
    <b-modal trap-focus has-modal-card :can-cancel="false" :active="isOpen">
      <div class="modal-card p-3">
        <section class="modal-card-head">
          <h4 class="p-0">Notice</h4>
        </section>
        <section class="modal-card-body">
          <slot></slot>
        </section>
        <section class="modal-card-foot">
          <b-button @click="doClose()" type="is-success">Okay</b-button>
        </section>
      </div>
    </b-modal>
  </section>
</template>

<script>
export default {
  data: () => ({
    isOpen: false
  }),
  methods: {
    doOpen () {
      this.isOpen = true
    },
    doClose () {
      this.isOpen = false
    }
  }
}
</script>

<style scoped>

</style>

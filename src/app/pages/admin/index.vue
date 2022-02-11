<template>
  <section>
    <div class="columns">
      <add-user class="column is-4"></add-user>
      <force-remove class="column is-4"></force-remove>
    </div>
  </section>
</template>

<script>
import AddUser from '@/app/pages/admin/components/addUser'
import ForceRemove from '@/app/pages/admin/components/forceRemove'

export default {
  components: { ForceRemove, AddUser },
  data: () => ({

  })
}
</script>

<style scoped>

</style>

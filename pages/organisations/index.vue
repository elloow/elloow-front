<template>
  <div>
    <h1>
      Organisations
    </h1>
    <p>{{ organisations }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: ['auth'],
  data () {
    return {
      organisations: []
    }
  },
  async mounted () {
    try {
      const data = (await this.$axios.get('/v1/user/organisations', { progress: false })).data
      this.organisations = data.data
    } catch (error) { }
  }
})
</script>

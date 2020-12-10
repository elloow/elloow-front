<template>
  <div class="container">
    <h1 class="title">
      Organisation name : {{ org_name }}
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: ['auth'],
  data () {
    return {
      org_name: '' as string
    }
  },
  async mounted () {
    try {
      const data = (await this.$axios.get(`/v1/organisations/${this.$route.params.name}`)).data
      this.org_name = data.data.name
    } catch (error) { }
  }
})
</script>

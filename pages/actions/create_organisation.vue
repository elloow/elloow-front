<template>
  <div class="container">
    <h1>Create organisation</h1>
    <h1>Token status: {{ token_status }}</h1>
    <h1>Email : {{ email }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData ({ $axios, route, app }) {
    try {
      const token = route.query.action_token
      const data = (await $axios.post(`v1/check-action-token/organisation-register/${token}`)).data
      return { token_status: true, token, email: data.data.email }
    } catch (error) {
      app.router?.push('/')
    }
  },
  data () {
    return {
      token_status: false as boolean,
      token: '' as string,
      email: '' as string
    }
  }
})
</script>

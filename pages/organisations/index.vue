<template>
  <div class="container input-form">
    <div class="box">
      <h1 class="title">
        Select an organisation
      </h1>
      <br>
      <div v-for="org in organisations" :key="org.name" class="buttons">
        <nuxt-link class="button is-light is-fullwidth is-large" :to="`/organisations/${org.name}`">
          {{ org.name }}
        </nuxt-link>
      </div>
    </div>
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
      if (data.data.length === 1) {
        this.$router.push(`/organisations/${data.data[0].name}`)
      } else {
        this.organisations = data.data
      }
    } catch (error) { }
  }
})
</script>

<style lang="scss">
.input-form {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

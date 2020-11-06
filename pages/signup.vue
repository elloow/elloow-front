<template>
  <div class="container input-form">
    <div>
      <figure class="image container is-128x128 is-centered">
        <img class="is-rounded" src="~/assets/elloow.png">
      </figure>

      <br>

      <div class="box">
        <h5 class="title is-5">
          Sign up for your elloow account
        </h5>

        <ValidationObserver v-slot="{ invalid }">
          <ValidationProvider name="Email" :rules="{ required: true, email: true }">
            <b-input v-model="email" type="text" placeholder="Email" />
          </ValidationProvider>

          <br>

          <button class="button is-primary is-fullwidth" :disabled="invalid" @click="sendEmailForm">
            Create account
          </button>
        </ValidationObserver>
      </div>
      <div class="box">
        <h5 class="title is-5">
          Already have an account?
        </h5>

        <nuxt-link to="/login">
          <a class="button is-primary is-light is-fullwidth">
            <strong>Login</strong>
          </a>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    async sendEmailForm () {

    }
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

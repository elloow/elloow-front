<template>
  <div class="container input-form">
    <div>
      <figure class="image container is-128x128 is-centered">
        <img class="is-rounded" src="~/assets/elloow.png">
      </figure>

      <br>

      <div class="box">
        <h5 class="title is-5">
          Log in to elloow
        </h5>

        <ValidationObserver v-slot="{ invalid }">
          <div class="field">
            <ValidationProvider name="Email" :rules="{ required: true, email: true }">
              <b-input v-model="email" type="text" placeholder="Email" />
            </ValidationProvider>
          </div>

          <div class="field">
            <ValidationProvider name="Password" :rules="{ required: true, min: 8 }">
              <b-input
                v-model="password"
                type="password"
                placeholder="Password"
                password-reveal
              />
            </ValidationProvider>
          </div>

          <b-field v-if="loginFailed" label="Bad credentials" />

          <br>

          <b-button class="button is-primary is-fullwidth" :disabled="invalid" @click="loginSubmit">
            Login
          </b-button>
        </ValidationObserver>
      </div>
      <div class="box">
        <h5 class="title is-5">
          Don't have an account?
        </h5>

        <p>Send your email to your organisation administrator.</p>
        <p>You will then receive a link to create your account.</p>
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
      email: '' as string,
      password: '' as string,
      loginFailed: false as Boolean
    }
  },
  async mounted () {
    try {
      await this.$axios.get('/v1/auth/user', { progress: false })
      await this.$router.push('/organisations')
    } catch (error) { }
  },
  methods: {
    async loginSubmit () {
      try {
        this.loginFailed = false
        await this.$axios.post('/v1/auth/user', { email: this.email, password: this.password })
        await this.$router.push('/organisations')
      } catch (error) {
        this.loginFailed = true
      }
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

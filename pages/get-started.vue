<template>
  <div class="container input-form">
    <div>
      <figure class="image container is-128x128 is-centered">
        <img class="is-rounded" src="~/assets/elloow.png">
      </figure>

      <br>

      <div class="box">
        <h5 class="title is-5">
          Create your organisation
        </h5>
        <ValidationObserver v-slot="{ invalid }">
          <div class="field">
            <ValidationProvider name="Email" :rules="{ required: true, email: true }">
              <b-input v-model="email" type="text" placeholder="Email" />
            </ValidationProvider>
          </div>

          <br>

          <div class="field">
            <ValidationProvider :rules="{ required: { allowFalse: false } }">
              <b-checkbox
                v-model="termsAccepted"
                type="is-success"
              >
                I agree to the <NuxtLink to="/terms" target="_blank">
                  <a>terms and conditions</a>
                </NuxtLink>
              </b-checkbox>
            </ValidationProvider>
          </div>

          <b-button class="button is-primary is-fullwidth" :disabled="invalid" @click="sendEmailForm">
            Create account
          </b-button>
        </ValidationObserver>
      </div>
      <div class="box">
        <h5 class="title is-5">
          Already have an account?
        </h5>

        <div class="field">
          <nuxt-link to="/login">
            <a class="button is-primary is-light is-fullwidth">
              <strong>Login</strong>
            </a>
          </nuxt-link>
        </div>
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
      email: '',
      termsAccepted: false as Boolean
    }
  },
  methods: {
    async sendEmailForm () {
      try {
        await this.$axios.post('/v1/send-organisation-register-link', { email: this.email })
        await this.$router.push('/')
      } catch (error) {
        const responseData = error.response.data
        if (responseData.codeError === 'VALIDATION_FIELDS_FAILED') {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Please verify your email.',
            position: 'is-bottom',
            type: 'is-warning'
          })
        } else {
          this.$buefy.toast.open({
            duration: 10000,
            message: 'Something is wrong. Please try again later.',
            position: 'is-bottom',
            type: 'is-danger'
          })
        }
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

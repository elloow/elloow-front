<template>
  <div class="container input-form">
    <div>
      <figure class="image container is-128x128 is-centered">
        <img class="is-rounded" src="~/assets/elloow.png">
      </figure>

      <br>

      <div class="box">
        <h4 class="title is-4">
          Log in to elloow
        </h4>

        <b-input v-model="username" type="text" placeholder="Email" />

        <br>

        <b-input
          v-model="password"
          type="password"
          placeholder="Password"
          password-reveal
        />

        <br>

        <b-field v-if="isBadCrendentials" label="Bad credentials" />

        <button class="button is-primary is-fullwidth" @click="loginSubmit">
          Login
        </button>
      </div>
      <div class="box">
        <h4 class="title is-4">
          Don't have an account?
        </h4>

        <nuxt-link to="/signup">
          <a class="button is-primary is-light is-fullwidth">
            <strong>Sign Up</strong>
          </a>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    async loginSubmit () {

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

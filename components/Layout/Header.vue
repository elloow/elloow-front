<template>
  <b-navbar type="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="~/assets/elloow.png"
          alt="Elloow"
        >
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <nuxt-link to="/log-in">
            <a class="button is-primary">
              <strong>Log In</strong>
            </a>
          </nuxt-link>
          <nuxt-link to="/sign-up">
            <a class="button is-primary is-light">
              <strong>Sign Up</strong>
            </a>
          </nuxt-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<template>
  <b-navbar type="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="~/assets/elloow.png"
          alt="elloow"
        >
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <nuxt-link to="/login">
            <a class="button is-primary">
              <strong>Log In</strong>
            </a>
          </nuxt-link>
          <nuxt-link to="/get-started">
            <a class="button is-primary is-light">
              <strong>Get started</strong>
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

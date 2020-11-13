<template>
  <div class="container">
    <div>
      <figure class="image container is-128x128 is-centered">
        <img class="is-rounded" src="~/assets/elloow.png">
      </figure>

      <br>

      <div class="box">
        <h5 class="title is-5">
          Create your account
        </h5>
        <b-field label="Email">
          <b-input v-model="user_email" disabled />
        </b-field>
        <b-field label="Password">
          <ValidationProvider v-slot="{ errors }" :rules="{ regex:/^(?=.*[A-Z].*[A-Z])(?=.*[\\\+\-\*\/\+\?\!\]\[\{\}\=\(\)\&\%\¦\°\§].*[\\\+\-\*\/\+\?\!\]\[\{\}\=\(\)\&\%\¦\°\§])(?=.*[0-9].*[0-9]).{8,}$/ }">
            <b-input
              v-model="user_password"
              type="password"
              placeholder="Account password"
              password-reveal
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </b-field>
        <p>Password must contain at least :  </p>
        <div class="content">
          <ul>
            <li>2 Uppercase letters</li>
            <li>2 Symbols</li>
            <li>2 Numbers</li>
            <li>8 characters long</li>
          </ul>
        </div>
        <br>

        <h5 class="title is-5">
          Create organisation
        </h5>
        <div class="field">
          <ValidationProvider name="Name" :rules="{ required: true, min: 5 }">
            <b-input v-model="org_name" type="text" placeholder="Organisation name" />
          </ValidationProvider>
        </div>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider } from 'vee-validate'

export default Vue.extend({
  components: {
    ValidationProvider
  },
  async asyncData ({ $axios, route, app }) {
    try {
      const token = route.query.action_token
      const data = (await $axios.post(`v1/check-action-token/organisation-register/${token}`)).data
      return { token_status: true, token, user_email: data.data.email }
    } catch (error) {
      app.router?.push('/')
    }
  },
  data () {
    return {
      token_status: false as boolean,
      token: '' as string,
      user_email: '' as string,
      user_password: '' as string,
      org_name: '' as string
    }
  }
})
</script>

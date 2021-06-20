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
        <ValidationObserver v-slot="{ invalid }">
          <b-field label="Email">
            <b-input v-model="user_email" disabled />
          </b-field>
          <ValidationProvider
            name="Password"
            :rules="{
              regex:
                /^(?=.*[A-Z].*[A-Z])(?=.*[\\\+\-\*\/\+\?\!\]\[\{\}\=\(\)\&\%\¦\°\§\$].*[\\\+\-\*\/\+\?\!\]\[\{\}\=\(\)\&\%\¦\°\§])(?=.*[0-9].*[0-9]).{8,}$/,
              required: true,
            }"
          >
            <conditional-password-input v-model="user_password" />
          </ValidationProvider>
          <br>

          <div class="title is-5">
            Create organisation
          </div>

          <div class="field">
            <ValidationProvider
              name="Name"
              :rules="{ required: true, min: 5, regex: /^[a-zA-Z\s]*$/ }"
            >
              <b-input
                v-model="org_name"
                type="text"
                placeholder="Organisation name (letters and space only)"
              />
            </ValidationProvider>
          </div>

          <br>

          <b-button
            class="button is-primary is-fullwidth"
            :disabled="invalid"
            @click="formSubmit"
          >
            Start now
          </b-button>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ConditionalPasswordInput from '~/components/Fields/ConditionalPasswordInput.vue'

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver,
    ConditionalPasswordInput
  },
  data () {
    return {
      token_status: false as boolean,
      token: '' as string,
      user_email: '' as string,
      user_password: '' as string,
      org_name: '' as string
    }
  },
  async mounted () {
    try {
      const token = (this.$route.query.action_token as string) || ''
      const response = await this.$axios.post(
        `v1/check-action-token/organisation-register/${token}`
      )
      const data = response.data
      this.token_status = true
      this.token = token
      this.user_email = data.data.email
    } catch (error) {
      await this.$router.push('/')
    }
  },
  methods: {
    async formSubmit () {
      if (!(await this.checkOrganisationExist())) {
        try {
          await this.$axios.post(
            'v1/actions/create-user-organisation',
            {
              user_email: this.user_email,
              user_password: this.user_password,
              org_name: this.org_name
            },
            { params: { action_token: this.token } }
          )
          await this.$router.push('/login')
        } catch (error) {
          this.$buefy.toast.open({
            message: 'Something wrong. Please verify your data.',
            position: 'is-bottom',
            type: 'is-danger'
          })
        }
      } else {
        this.$buefy.toast.open({
          message: 'Organisation name already exist.',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
    async checkOrganisationExist (): Promise<boolean> {
      try {
        await this.$axios.get(
          `v1/organisations/${this.org_name.replace(' ', '-')}`
        )
        return true
      } catch (error) {
        return false
      }
    }
  }
})
</script>

<template>
  <div>
    <b-field label="Password">
      <b-input
        type="password"
        placeholder="Account password"
        password-reveal
        @input="handleInput"
      />
    </b-field>
    <p>Password must contain at least :  </p>
    <div class="content">
      <ul>
        <li>
          <b-tag :type="rule_uppercases ? 'is-success' : 'is-danger'">
            2 Uppercase letters
          </b-tag>
        </li>
        <li>
          <b-tag :type="rule_symbols ? 'is-success' : 'is-danger'">
            2 Symbols
          </b-tag>
        </li>
        <li>
          <b-tag :type="rule_numbers ? 'is-success' : 'is-danger'">
            2 Numbers
          </b-tag>
        </li>
        <li>
          <b-tag :type="rule_length ? 'is-success' : 'is-danger'">
            8 characters long
          </b-tag>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  model: {
    event: 'blur'
  },
  data () {
    return {
      rule_uppercases: false as boolean,
      rule_symbols: false as boolean,
      rule_numbers: false as boolean,
      rule_length: false as boolean
    }
  },
  methods: {
    checkPassword (value: string) {
      const uppRegex = /^(.*?[A-Z]){2,}.*$/
      const symbolsRegex = /^(.*?[\\+\-*/+?!\][{}=()&%¦°§$]){2,}.*$/
      const numRegex = /^(.*?[0-9]){2,}.*$/
      const lenghtRegex = /^.{8,}$/
      this.rule_uppercases = uppRegex.test(value)
      this.rule_symbols = symbolsRegex.test(value)
      this.rule_numbers = numRegex.test(value)
      this.rule_length = lenghtRegex.test(value)
    },
    handleInput (value: string) {
      this.$emit('blur', value)
      this.checkPassword(value)
    }
  }
})
</script>

import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { ValidationRule } from 'vee-validate/dist/types/types'

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation as ValidationRule
  })
}

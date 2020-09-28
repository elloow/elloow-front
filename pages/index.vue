<template>
  <CThemeProvider>
    <CReset />
    <Nuxt />
    <CButton as="nuxt-link" to="/">
      ⚡️ Oh, my Nuxt!
    </CButton>
  </CThemeProvider>
</template>

<script>
import { CThemeProvider, CReset, CButton } from '@chakra-ui/vue'

export default {
  name: 'DefaultLayout',
  components: {
    CThemeProvider,
    CReset,
    CButton
  }
}
</script>

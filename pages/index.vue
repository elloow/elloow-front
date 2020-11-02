<template>
  <div class="container">
    <b-skeleton width="20%" :animated="animated" />
    <b-skeleton width="60%" :animated="animated" />
    <b-skeleton width="40%" :animated="animated" />
    <b-skeleton width="10%" :animated="animated" />
    <b-skeleton width="80%" :animated="animated" />
    <b-skeleton :animated="animated" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'basic'
})
</script>

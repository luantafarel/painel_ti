<template>
  <v-app>

    <core-view />

  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {}
    },
    components: {
      CoreView: () => import('@/components/core/View')
    },
    computed: {
      ...mapState('auth', ['token'])
    },
  }

</script>
<template>
  <v-layout fill-height row wrap>
    <v-flex xs12 sm6 md4>
      <staff-card :primary="primary"/>
    </v-flex>
    <v-flex xs12 sm6 md4>
      <region-card :primary="primary"/>
    </v-flex>
  </v-layout>
</template>

<script>
import spinner from '@/other/Spinner.vue';

export default {
  components: {
    'staff-card': () => ({
      component: import('./StaffCard.vue'),
      loading: spinner,
      delay: 0,
    }),
    'region-card': () => ({
      component: import('./RegionCard.vue'),
      loading: spinner,
      delay: 0,
    }),
  },
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
};
</script>

<style>

</style>

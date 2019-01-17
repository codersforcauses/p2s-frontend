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
import staffCard from './StaffCard.vue';
import regionCard from './RegionCard.vue';

export default {
  components: {
    'staff-card': staffCard,
    'region-card': regionCard,
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

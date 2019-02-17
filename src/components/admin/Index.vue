<template>
  <v-layout fill-height row wrap>
    <v-flex xs12 sm6 md4
            v-for="(card, index) in cards"
            :key="index"
    >
      <component :is="card" :primary="primary"/>
    </v-flex>
  </v-layout>
</template>

<script>
import spinner from '@/other/Spinner.vue';

export default {
  title: 'Admin Dashboard',
  components: {
    'staff-card': () => ({
      component: import('./StaffCard.vue'),
      loading: spinner,
    }),
    'region-card': () => ({
      component: import('./RegionCard.vue'),
      loading: spinner,
    }),
    'program-card': () => ({
      component: import('./ProgramCard.vue'),
      loading: spinner,
    }),
    'activity-card': () => ({
      component: import('./ActivityCard.vue'),
      loading: spinner,
    }),
    'session-card': () => ({
      component: import('./SessionCard.vue'),
      loading: spinner,
    }),
    'student-card': () => ({
      component: import('./StudentCard.vue'),
      loading: spinner,
    }),
    'school-card': () => ({
      component: import('./SchoolCard.vue'),
      loading: spinner,
    }),
  },
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cards: [
        'staff-card',
        'region-card',
        'program-card',
        'activity-card',
        'session-card',
        'student-card',
        'school-card',
      ],
    };
  },
  computed: {
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
};
</script>

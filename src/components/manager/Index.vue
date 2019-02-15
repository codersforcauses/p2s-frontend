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
  title: 'Manager Dashboard',
  components: {
    'coach-card': () => ({
      component: import('./CoachCard.vue'),
      loading: spinner,
    }),
    'school-card': () => ({
      component: import('./SchoolCard.vue'),
      loading: spinner,
    }),
    'session-card': () => ({
      component: import('./SessionCard.vue'),
      loading: spinner,
    }),
    'program-card': () => ({
      component: import('./ProgramCard.vue'),
      loading: spinner,
    }),
    'report-card': () => ({
      component: import('./ReportCard.vue'),
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
        'coach-card',
        'school-card',
        'session-card',
        'program-card',
        'report-card',
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

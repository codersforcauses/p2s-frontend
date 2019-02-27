<template>
  <v-layout fill-height row wrap>
    <v-flex xs12 sm6 md4
            v-for="(card, index) in cards"
            :key="index"
    >
      <component :is="card" :primary="primary"/>
    </v-flex>
    <v-btn color="info" :to="{ name: 'current session' }">session</v-btn>
  </v-layout>
</template>

<script>
import spinner from '@/other/Spinner.vue';

export default {
  title: 'Coach Dashboard',
  components: {
    'student-card': () => ({
      component: import('./StudentCard.vue'),
      loading: spinner,
    }),
    'session-card': () => ({
      component: import('./SessionCard.vue'),
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
        'student-card',
        'session-card',
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

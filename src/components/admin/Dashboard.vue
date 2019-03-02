<template>
  <v-layout fill-height row>
    <v-flex xs12 sm6 md4
            v-for="i in columns" :key="i"
    >
      <v-layout row wrap class="pa-0">
        <v-flex xs12
                v-for="(card, index) in cards" :key="index"
                v-show="index%columns === (i-1)"
        >
          <component :is="card" :primary="primary"/>
        </v-flex>
      </v-layout>
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
    'matrix-card': () => ({
      component: import('./MatrixCard.vue'),
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
        'matrix-card',
      ],
      width: 0,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
    columns() {
      // eslint-disable-next-line
      return this.width < 600 ? 1 : this.width < 960 ? 2 : 3;
    },
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
    },
  },
};
</script>

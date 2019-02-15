<template>
  <v-bottom-nav app
                shift
                mandatory
                :active.sync="bottomNav"
                value=true
  >
    <v-btn  flat
            v-show="coach"
            :color="primary"
            value="Coach Page"
            :to="{ name: 'coach' }"
    >
      <span> Coach </span>
      <v-icon> mdi-football </v-icon>
    </v-btn>

    <v-btn  flat
            v-show="manager"
            :color="primary"
            value="Regional Manager Page"
            :to="{ name: 'manager' }"
    >
      <span> Regional Manager </span>
      <v-icon> mdi-sitemap </v-icon>
    </v-btn>

    <v-btn  flat
            v-show="admin"
            :color="primary"
            value="Admin Page"
            :to="{ name: 'admin' }"
    >
      <span> Administrator </span>
      <v-icon> mdi-shield-account </v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['dark'],
  data() {
    return {
      bottomNav: 'Admin Page',
    };
  },
  computed: {
    ...mapState('auth', { user: 'user' }),
    coach() {
      return this.user.coach.is === true;
    },
    manager() {
      return this.user.manager.is === true;
    },
    admin() {
      return this.user.admin.is === true;
    },
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
};
</script>

<style scoped>
.v-bottom-nav {
  box-shadow: none;
  -webkit-box-shadow: none;
}
.v-bottom-nav.theme--light {
  background-color: #e0e0e0;
}
.v-bottom-nav.theme--dark {
  background-color: #464646;
}
</style>

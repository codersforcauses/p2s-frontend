<template>
  <v-bottom-nav app
                shift
                mandatory
                :active.sync="bottomNav"
                :value="checkPerm"
  >
    <v-btn  flat
            v-show="coach"
            :color="primary"
            value="Coach Page"
    >
      <span> Coach </span>
      <v-icon> mdi-football </v-icon>
    </v-btn>

    <v-btn  flat
            v-show="manager"
            :color="primary"
            value="Regional Manager Page"
    >
      <span> Regional Manager </span>
      <v-icon> mdi-sitemap </v-icon>
    </v-btn>

    <v-btn  flat
            v-show="admin"
            :color="primary"
            value="Admin Page"
    >
      <span> Administrator </span>
      <v-icon> mdi-shield-account </v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>

export default {
  props: ['dark'],
  data() {
    return {
      bottomNav: 'Admin Page',
      coach: true,
      manager: true,
      admin: true,
    };
  },
  computed: {
    checkPerm() {
      if (this.coach && !this.manager && !this.admin) {
        return false;
      }
      if (!this.coach && this.manager && !this.admin) {
        return false;
      }
      if (!this.coach && !this.manager && this.admin) {
        return false;
      }
      return true;
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
  background-color: #e4e4e4;
}
.v-bottom-nav.theme--dark {
  background-color: #464646;
}
</style>

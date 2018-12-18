<template>
  <div>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      fixed
    >
      <v-btn
        color="teal"
        flat
        value="recent"
      >
        <span v-show="$vuetify.breakpoint.mdAndUp">Coaches</span>
        <v-icon>mdi-football</v-icon>
      </v-btn>

      <v-btn
      color="teal"
      flat
      value="favorites"
      >
        <span v-show="$vuetify.breakpoint.mdAndUp">Regional Managers</span>
        <v-icon>mdi-sitemap</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
      >
        <span v-show="$vuetify.breakpoint.mdAndUp">Administrators</span>
        <v-icon>mdi-security-account</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: 'recent',
    };
  },
};
</script>

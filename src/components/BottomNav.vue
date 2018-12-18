<template>
  <div>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="transparent"
    >
      <v-btn
        color="teal"
        flat
        value="recent"
      >
        <span>Coaches</span>
        <v-icon>mdi-football</v-icon>
      </v-btn>

      <v-btn
      color="teal"
      flat
      value="favorites"
      >
        <span>Regional Managers</span>
        <v-icon>mdi-sitemap</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
      >
        <span>Administrators</span>
        <v-icon></v-icon>
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

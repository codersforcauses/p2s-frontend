<template>
  <div>
    <div>Active: {{ bottomNav }} </div>
    <div>Coach: {{ coach }} </div>
    <div>Manager: {{ manager }} </div>
    <div>Admin: {{ admin }} </div>
    <div>Show bar: {{ checkPerm }} </div>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="checkPerm"
      app
    >
      <v-btn
        v-if="coach"
        color="teal"
        flat
        value="Coach Page"
      >
        <span v-show="$vuetify.breakpoint.smAndUp">Coaches</span>
        <v-icon>mdi-football</v-icon>
      </v-btn>

      <v-btn
        v-if="manager"
        color="teal"
        flat
        value="Regional Manager Page"
      >
        <span v-show="$vuetify.breakpoint.smAndUp">Regional Managers</span>
        <v-icon>mdi-sitemap</v-icon>
      </v-btn>

      <v-btn
        v-if="admin"
        color="teal"
        flat
        value="Admin Page"
      >
        <span v-show="$vuetify.breakpoint.smAndUp">Administrators</span>
        <v-icon>mdi-security-account</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>

export default {
  data() {
    return {
      bottomNav: 'none',
      coach: false,
      manager: false,
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
  },
};
</script>

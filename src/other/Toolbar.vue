<template>
  <v-toolbar flat>
    <v-toolbar-title>
      Dashboard
    </v-toolbar-title>
    <v-spacer/>

    <v-toolbar-items>
      <v-btn  :flat="$vuetify.breakpoint.mdAndUp"
              :icon="$vuetify.breakpoint.smAndDown"
              @click="$emit('dark')"
      >
        <v-icon :left="$vuetify.breakpoint.mdAndUp">
          mdi-theme-light-dark
        </v-icon>

        <span v-show="$vuetify.breakpoint.mdAndUp">
          {{ theme }} Theme
        </span>
      </v-btn>

      <v-btn  :flat="$vuetify.breakpoint.mdAndUp"
              :icon="$vuetify.breakpoint.smAndDown"
              @click="logout"
      >
        <span v-show="$vuetify.breakpoint.mdAndUp">
          Logout
        </span>

        <v-icon :right="$vuetify.breakpoint.mdAndUp">
          mdi-logout
        </v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['dark'],
  computed: {
    theme() {
      return this.dark ? 'Light' : 'Dark';
    },
  },
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    logout() {
      this.authLogout()
        .then(() => {
          this.$router.push('/');
        });
    },
  },
};
</script>

<style scoped>

</style>

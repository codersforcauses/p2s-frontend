<template>
  <v-toolbar dark flat app>
      <v-btn  icon
              v-show="$vuetify.breakpoint.mdAndDown"
              @click="$router.back()"
      >
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>

      <v-divider  inset
                  vertical
                  class="mr-3"
                  v-show="$vuetify.breakpoint.mdAndDown"
      />

      <v-toolbar-title class="ml-0">
        Dashboard
      </v-toolbar-title>

    <v-spacer/>

    <v-toolbar-items>
      <v-btn  :flat="$vuetify.breakpoint.mdAndUp"
              :icon="$vuetify.breakpoint.smAndDown"
              @click="setTheme"
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
  props: ['value'],
  computed: {
    dark: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    theme() {
      return this.dark ? 'Light' : 'Dark';
    },
  },
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    ...mapActions('users', { patchTheme: 'patch' }),
    logout() {
      this.authLogout()
        .then(() => {
          this.$router.push('/login');
        });
    },
    async setTheme() {
      const tempDark = !this.dark;
      await this.patchTheme([
        this.$store.state.auth.payload.userId,
        { darktheme: tempDark },
      ]);
      this.dark = tempDark;
    },
  },
};
</script>

<style scoped>

</style>

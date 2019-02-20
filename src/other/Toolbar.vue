<template>
  <v-toolbar flat app height=64>
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

      <v-toolbar-title class="mt-2 ml-0 headline">
        {{ heading }}
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
    heading() {
      const head = this.$route.name.split(' ');
      return head.reduce((acc, cur) => acc.concat(cur.charAt(0).toUpperCase(), cur.slice(1), ' '), '');
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

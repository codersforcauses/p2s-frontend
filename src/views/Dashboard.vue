<template>
  <v-app :dark="dark">
    <toolbar @dark="setTheme" v-bind="{ dark }" />
    <v-content>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import toolbar from '@/other/Toolbar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'dashboard',
  components: {
    toolbar,
  },
  mounted() {
    this.dark = this.auth.user.darktheme;
  },
  data() {
    return {
      auth: this.$store.state.auth,
      dark: false,
    };
  },
  methods: {
    ...mapActions('users', { patchTheme: 'patch' }),
    setTheme() {
      this.dark = !this.dark;
      this.patchTheme([
        this.auth.payload.userId,
        { darktheme: this.dark },
      ]);
    },
  },
};
</script>

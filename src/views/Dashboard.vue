<template>
  <v-app :dark="dark">
    <toolbar @dark="setTheme" v-bind="{ dark }" />
    <v-content>
      <v-sheet  tile
                min-height="100vh"
                color="#2F2F2F"
      >
        <v-container fill-height fluid grid-list-lg>
          <v-layout fill-height row wrap>
            <router-view/>
          </v-layout>
        </v-container>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import toolbar from '@/other/Toolbar.vue';

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

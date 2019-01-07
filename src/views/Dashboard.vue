<template>
  <v-app :dark="dark">
    <toolbar v-model="dark" />
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
import toolbar from '@/other/Toolbar.vue';

export default {
  name: 'dashboard',
  components: {
    toolbar,
  },
  mounted() {
    this.dark = this.$store.state.auth.user.darktheme;
  },
  data() {
    return {
      dark: false,
    };
  },
};
</script>

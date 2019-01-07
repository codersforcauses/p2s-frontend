<template>
  <v-app :dark="dark">
    <toolbar v-model="dark" />
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

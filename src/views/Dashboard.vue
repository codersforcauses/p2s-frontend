<template>
  <v-app :dark="dark">
    <toolbar v-model="dark" />
    <v-content>
      <v-sheet  tile
                min-height="100%"
                :color="primary"
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
  data() {
    return {
      dark: false,
    };
  },
  mounted() {
    this.dark = this.$store.state.auth.user.darktheme;
  },
  computed: {
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
};
</script>

<style scoped>
.v-sheet {
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
}
</style>

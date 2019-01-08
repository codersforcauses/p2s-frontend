<template>
<<<<<<< Bottom-Navigation
  <div>
    <BottomNav/>
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue';
=======
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
>>>>>>> dev

export default {
  name: 'dashboard',
  components: {
<<<<<<< Bottom-Navigation
    BottomNav,
=======
    toolbar,
  },
  mounted() {
    this.dark = this.$store.state.auth.user.darktheme;
  },
  data() {
    return {
      dark: false,
    };
>>>>>>> dev
  },
};
</script>

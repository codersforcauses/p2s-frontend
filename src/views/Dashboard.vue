<template>
  <v-app :dark="dark">
    <toolbar v-model="dark" />
    <v-content>
      <v-sheet  tile
                min-height="100%"
                :color="sheet"
      >
        <v-container fluid grid-list-lg>
          <router-view :dark="dark"/>
        </v-container>
      </v-sheet>
    </v-content>
    <fab v-bind="{ dark }" />
    <bottomnav v-bind="{ dark }" />
  </v-app>
</template>

<script>
import toolbar from '@/other/Toolbar.vue';
import bottomnav from '@/other/BottomNav.vue';
import fab from '@/other/FAB.vue';

export default {
  name: 'dashboard',
  components: {
    fab,
    toolbar,
    bottomnav,
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
    sheet() {
      return this.dark ? '#272727' : '#ebebeb';
    },
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
};
</script>

<style scoped>
.v-sheet {
  border-radius: var(--thiccness);
}

.container {
  padding: var(--thiccness);
}
.container.grid-list-lg .layout:only-child {
  margin: calc(-1 * var(--thiccness) - 8px);
}
</style>

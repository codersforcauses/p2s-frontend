<template>
  <v-app :dark="dark">
    <toolbar v-model="dark" />
    <v-content>
      <v-sheet  tile
                min-height="100%"
                :color="sheet"
      >
        <v-container fluid grid-list-lg>
          <router-view v-bind="{ dark }" />
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
  },
};
</script>

<style scoped>
.v-sheet {
  border-radius: var(--thiccness);
}

@media only screen and (max-width: 600px) {
  .container {
    padding: var(--thiccness);
  }
}
@media only screen and (min-width: 600px) {
  .container {
    padding: calc(var(--thiccness) * 1.8);
  }
}
.container.grid-list-lg .layout:only-child {
  margin: calc(-1.5 * var(--thiccness));
}
</style>

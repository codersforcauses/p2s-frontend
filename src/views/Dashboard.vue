<template>
  <v-app :dark="dark">
    <toolbar @dark="dark = !dark;" v-bind="{ dark }" />
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
  data() {
    return {
      dark: false,
    };
  },
};
</script>

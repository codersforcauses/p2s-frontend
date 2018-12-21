<template>
  <v-toolbar flat>
    <v-toolbar-title>
      Dashboard
    </v-toolbar-title>
    <v-spacer/>

    <v-toolbar-items>
      <v-btn flat>
        Link One
      </v-btn>

      <v-btn icon>
        <v-icon> mdi-theme-light-dark </v-icon>
      </v-btn>

      <v-menu :nudge-bottom="64">
        <v-btn flat slot="activator">
          Forms
          <v-icon> mdi-menu-down </v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="item in 5"
            :key="item"
            @click="item"
          >
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn flat>
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {

};
</script>

<style scoped>

</style>

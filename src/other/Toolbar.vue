<template>
  <v-toolbar flat>
    <v-toolbar-title>
      Dashboard
    </v-toolbar-title>
    <v-spacer/>

    <v-toolbar-items>
      <v-btn  :flat="$vuetify.breakpoint.mdAndUp"
              :icon="$vuetify.breakpoint.smAndDown"
              @click="$emit('dark')"
      >
        <v-icon :left="$vuetify.breakpoint.mdAndUp"> mdi-theme-light-dark </v-icon>
        <span v-show="$vuetify.breakpoint.mdAndUp"> {{ theme }} Theme </span>
      </v-btn>

      <v-btn  :flat="$vuetify.breakpoint.mdAndUp"
              :icon="$vuetify.breakpoint.smAndDown"
      >
        <span v-show="$vuetify.breakpoint.mdAndUp"> Logout </span>
        <v-icon :right="$vuetify.breakpoint.mdAndUp"> mdi-logout </v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: ['dark'],
  computed: {
    theme() {
      return this.dark ? 'Light' : 'Dark';
    },
  },
};
</script>

<style scoped>

</style>

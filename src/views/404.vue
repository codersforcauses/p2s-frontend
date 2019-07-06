<template>
  <v-app :dark="dark">
    <v-content>
      <v-toolbar flat app color="transparent">
        <v-btn  flat
                round
                name="back"
                :dark="dark"
                @click="$router.back()"
        >
          <v-icon> mdi-arrow-left </v-icon>
          <span class="ml-1"> Go Back </span>
        </v-btn>
      </v-toolbar>

      <v-container grid-list-lg fluid fill-height>
        <v-layout align-center justify-center row wrap fill-height>
          <v-card tile flat color="transparent" class="text-xs-center">
            <v-flex xs12 tag="h1" class="display-4">
              404
            </v-flex>

            <v-flex xs12 tag="h2" class="display-2">
              Page Not Found
            </v-flex>
          </v-card>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'error',
  title: 'Error: 404',
  data() {
    return {
      dark: false,
    };
  },
  mounted() {
    this.dark = this.$store.state.auth.user.darktheme || false;
  },
};
</script>

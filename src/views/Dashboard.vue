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
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  aspect-ratio="2.75"
                ></v-img>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>
                      Located two hours south of Sydney in the
                      <br>
                      Southern Highlands of New South Wales, ...
                    </div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
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

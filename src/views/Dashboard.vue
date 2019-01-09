<template>
  <v-app :dark="dark">
    <toolbar v-model="dark" />
    <v-content>
      <v-sheet  tile
                min-height="100%"
                :color="sheet"
      >
        <v-container fluid grid-list-lg>
          <v-layout fill-height row wrap>
            <v-flex xs12 sm6 md4 v-for="i in 12" :key="i">
              <v-card flat>
                <v-sparkline
                  :value="values"
                  :color="primary"
                  smooth="16"
                  line-width="2"
                  auto-draw
                ></v-sparkline>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0"
                    :class="`${primary}--text`">Kangaroo Valley Safari</h3>
                    <div>
                      Located two hours south of Sydney in the
                      <br>
                      Southern Highlands of New South Wales, ...
                    </div>
                  </div>
                </v-card-title>

                <v-card-actions class="pa-0">
                  <v-btn
                    flat
                    round
                  >Share</v-btn>
                  <v-btn
                    flat
                    round
                  >Explore</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <router-view/>
          </v-layout>
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
      values: [0, 5, 2, 7, 8, 2, 7, 5, 3, 7, 9, 1, 7, 2, 4],
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

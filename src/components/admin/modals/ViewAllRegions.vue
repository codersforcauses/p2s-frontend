<template>
  <v-dialog
    scrollable
    max-width="520"
    v-model="showDialog"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card flat tile>
      <v-toolbar flat>
        <h1 class="headline">All Regions</h1>
        <v-spacer />
        <v-btn flat icon @click="$emit('input')">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
      <v-list rounded v-for="region in listRegions" :key="region">
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-map-marker-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{region.name}}</v-list-item-title>
              <ul>
                  <li><b>State:</b> {{region.state}}</li>
                  <span v-for="(x,index) in region.users" :key="index">
                      <span v-if="index === Object.keys(region.users).length - 1">
                          <b>Number of students:</b> {{index}}
                      </span>
                  </span>
              </ul>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ViewAllRegions',
  props: ['value', 'dark'],
  data() {
    return {
      numOfStudents: [],
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
    },
    ...mapGetters('regions', { listRegions: 'list' }),
  },
};
</script>
<style>
.v-card {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.list {
  padding: calc(0.5 * var(--thiccness)) var(--thiccness);
}

ul {
  list-style-type: none;
}
</style>

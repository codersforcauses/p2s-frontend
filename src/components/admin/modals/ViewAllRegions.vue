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
        <v-list two-line>
          <template v-for="region in listRegions">
            <v-list-tile :key="region">
              <v-list-tile-content>
                <v-list-tile-title>{{ `${region.name}, ${region.state }` }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
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
      set(value) {
        this.$emit('input', value);
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

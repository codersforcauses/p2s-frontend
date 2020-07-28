<template>
  <v-dialog scrollable
            max-width=520
            v-model="showDialog"
            transition="dialog-transition"
            :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card flat tile>
      <v-toolbar flat>
        <h1 class="headline">View Schools </h1>
        <v-spacer/>
        <v-btn flat icon @click="$emit('input')">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>
        <v-expansion-panel>
          <v-expansion-panel-content
          v-for='school in sortedSchools'
          :key=school._id
          >
            <template v-slot:header>
              {{ school.name }}
            </template>
            <v-card
              class='pa-2 ma-3'
            >
              <v-card-content>
                <p>
                  Address: {{ formatAddress(school.address) }}
                </p>
                <p>
                  Phone number: {{ school.phoneNumber }}
                </p>
                <p>
                  Region: {{ regions[school.region].name }}
                </p>
              </v-card-content>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['value', 'dark'],
  data() {
    return {
      schools: [],
      regions: {},
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
    isDark() {
      return this.dark === 'dark';
    },
    primary() {
      return this.isDark ? 'darkPrimary' : 'lightPrimary';
    },
    button() {
      return this.isDark ? '#272727' : '#ebebeb';
    },
    sortedSchools() {
      const sorted = this.schools;
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
      return sorted;
    },
  },
  methods: {
    ...mapActions('schools', { findSchools: 'find' }),
    ...mapActions('regions', { findRegions: 'find' }),
    formatAddress(address) {
      return `${address.street}, ${address.suburb}, ${address.postcode}, ${address.state}`;
    },
  },
  async mounted() {
    const schoolData = await this.findSchools();
    const regionData = await this.findRegions();

    this.schools = schoolData.data;
    this.regions = regionData.data.reduce((acc, region) => {
      // eslint-disable-next-line
      acc[region._id] = region;
      return acc;
    }, {});
  },
};
</script>

<style scoped>
.alert {
  border: 0;
  border-radius: 30px;
  font-size: 12pt;
  margin: 0.5rem 0 1rem;
  min-width: calc(100% - 20vw);
  z-index: auto;
}
.v-card {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.list {
  padding: calc( 0.5 * var(--thiccness)) var(--thiccness);
}
</style>

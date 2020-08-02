<template>
  <div>
    <v-container
    fluid>
      <v-layout
      row
      justify-center
      >
      <v-flex
      lg4
      >
        <v-card>
          <v-card-title
          class='headline ma-0'
          >
            Schools on File
          </v-card-title>
          <v-subheader>
            Click a school to see its details
          </v-subheader>
          <v-card-text>
            <v-list>
              <v-list-item
              v-for='school in schools'
              :key='school._id'
              >
                <v-list-tile-content>
                  <v-btn flat
                         round
                         @click='selectSchool(school)'
                  >
                    {{ school.name }}
                  </v-btn>
                </v-list-tile-content>
              </v-list-item>
            </v-list>
            <v-pagination
            v-model='pagination.currentPage'
            :length='pagination.pageCount'
            :total-visible='pagination.maxButtons'
            @input='handlePageChange'
            >
            </v-pagination>
          </v-card-text>
        </v-card>
      </v-flex>
      </v-layout>
      <v-navigation-drawer
      v-model='drawer'
      absolute
      temporary
      right
      >
        <v-toolbar>
          <v-btn
          icon
          >
            <v-icon
            @click='drawer=false'
            >
              mdi-close
            </v-icon>
          </v-btn>
          <v-spacer/>
          {{ currentSchool.name }}
        </v-toolbar>
        <v-divider></v-divider>
        <v-img
        src='http://www.jeremiahpinto.com/img/jerry.jpg'
        >
        </v-img>
        <v-list>
          <v-list-tile>
            <v-icon
            left
            class='material-icons'
            >
              mdi-map-marker
            </v-icon>
            Address: {{ formatAddress(currentSchool.address) }}
          </v-list-tile>
          <v-list-tile>
            <v-icon
            left
            class='material-icons'
            >
              mdi-phone
            </v-icon>
            Phone number: {{ currentSchool.phoneNumber }}
          </v-list-tile>
          <v-list-tile>
            <v-icon
            left
            >
              mdi-sitemap
            </v-icon>
            Region: {{ regions[currentSchool.region].name }}
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  title: 'Schools Dashboard',
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },
  data() {
    return {
      pagination: {
        itemsPerPage: 0,
        currentPage: 1,
        total: 0,
        pageCount: 0,
        skip: 0,
        maxButtons: 5,
      },
      schools: [],
      currentSchool: null,
      drawer: false,
      regions: {},
    };
  },
  computed: {
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
  methods: {
    ...mapActions('schools', { findSchools: 'find' }),
    ...mapActions('regions', { findRegions: 'find' }),
    async fetchSchools() {
      const schoolData = await this.findSchools({
        query: {
          $skip: this.pagination.skip,
        },
      });
      this.schools = schoolData.data;
      this.pagination.total = schoolData.total;
      this.pagination.itemsPerPage = schoolData.limit;
      this.pagination.pageCount = Math.round(
        this.pagination.total / this.pagination.itemsPerPage,
      );
      [this.currentSchool] = this.schools;
    },
    handlePageChange() {
      this.pagination.skip = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
      this.fetchSchools();
    },
    formatAddress(address) {
      return `${address.street}, ${address.suburb}, ${address.postcode}, ${address.state}`;
    },
    selectSchool(school) {
      this.currentSchool = school;
      this.drawer = true;
    },
  },
  async mounted() {
    const regionData = await this.findRegions();
    this.fetchSchools();
    this.regions = regionData.data.reduce((acc, region) => {
      // eslint-disable-next-line
      acc[region._id] = region;
      return acc;
    }, {});
  },
};
</script>

<style>
 .material-icons, .icon-text {
      vertical-align: middle;
    }
</style>

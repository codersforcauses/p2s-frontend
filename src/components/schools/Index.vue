<template>
  <div>
    <v-container
    fluid>
      <v-layout
      row
      >
      <v-flex xs12>
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
                  <v-list-tile-title
                  v-text='school.name'
                  class="text--primary"
                  >
                  </v-list-tile-title>
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
      >
        Hello world
      </v-navigation-drawer>
      <v-btn @click='drawer=!drawer'>Toggle</v-btn>
    </v-container>
    <!-- <v-navigation-drawer
      v-model='drawer'
      >
        {{ currentSchool.name }}
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
            </v-list>
      </v-navigation-drawer> -->
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
    };
  },
  computed: {
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
  methods: {
    ...mapActions('schools', { findSchools: 'find' }),
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
  },
  mounted() {
    this.fetchSchools();
  },
};
</script>

<style>
 .material-icons, .icon-text {
      vertical-align: middle;
    }
</style>

<template>
  <v-card>
    <v-layout>
      <v-flex xs5>
        <v-card flat>
          <v-card-title class="headline">Regions</v-card-title>
          <v-list two-line subheader>
            <v-list-tile  v-for="region in regions[pagination.currentPage - 1]"
                          :key="region._id"
                          @click="getRegion(region._id)"
            >
              {{ `${region.name}` }}
            </v-list-tile>
          </v-list>
          <div>
            <!-- <v-btn @click="showRegions()">Next</v-btn> -->
            <v-pagination
              v-model="pagination.currentPage"
              :length="pages"
              :total-visible="pagination.visible"
              @input="onPageChange"
              :dark="dark"
              :light="!dark"
              :color="primary"
            ></v-pagination>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs7 >
        <v-card flat>
          <v-container justify-center
                       align-center
                       fill-height
                       v-if="!regionSelected"
          >
            Select a Region
          </v-container>
          <v-card
            v-if="regionSelected"
            flat
          >
            <v-card-title class="headline">
              {{ `${this.active[0].name},  ${this.active[0].state}` }}
            </v-card-title>

            <v-list> Users
              <v-list-tile v-for="user in users[0]"
                           :key="user._id"
              >
                {{ `${user.name.first} ${user.name.last}` }}
              </v-list-tile>
            </v-list>

            <v-list> Schools
              <v-list-tile v-for="school in schools[0]"
                           :key="school._id"
              >
              {{ `${school.name}` }}
              </v-list-tile>
            </v-list>

          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>
regions
<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { mapGetters, mapActions } from 'vuex';

export default {

  data: () => ({
    active: [],
    regionSelected: false,
    regions: ['', '', '', ''], // fix this
    users: [],
    schools: [],
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  }),

  mounted() {
    this.showRegions();
  },

  computed: {
    ...mapGetters('regions', { listRegions: 'list' }),
    ...mapGetters('users', { getUser: 'get' }),
    ...mapGetters('schools', { getSchool: 'get' }),

    pages() {
      // this.getTotalItems();
      if (this.pagination.itemsPerPage == null || this.pagination.totalItems == null) {
        return 0;
      }
      return Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
    },
    dark() {
      return this.$store.getters['users/current'].darktheme;
    },
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },

  methods: {
    ...mapActions('regions', { findRegions: 'find' }),
    ...mapActions('users', { findUsers: 'find' }),
    ...mapActions('schools', { findSchools: 'find' }),

    getRegion(id) {
      this.regionSelected = false;
      const currentRegion = this.listRegions.find(regions => regions._id === id);
      if (currentRegion === this.active[0]) {
        this.active.splice(0);
        this.regionSelected = false;
      } else {
        this.active.splice(0, 1, currentRegion);
        this.regionSelected = true;
        this.showUsers();
        this.showSchools();
      }
    },

    showRegions() {
      this.findRegions({
        query: {
          $sort: {
            name: 1,
          },
          $limit: this.pagination.itemsPerPage,
          $skip: this.skip(),
        },
      }).then((response) => {
        this.regions.splice((this.pagination.currentPage - 1), 1,
          response.data.map(region => region));
        this.pagination.totalItems = response.total;
      });
    },

    showUsers() {
      this.findUsers({
        query: {
          _id: {
            $in: this.active[0].users,
          },
          $select: [
            'name',
            'region',
            'email',
            'coach',
            'admin',
            'manager',
          ],
        },
      }).then((response) => {
        this.users.splice(0, 1, response.data.map(user => user));
      });
    },

    showSchools() {
      this.findSchools({
        query: {
          _id: {
            $in: this.active[0].schools,
          },
        },
      }).then((response) => {
        this.schools.splice(0, 1, response.data.map(school => school));
      });
    },

    skip() {
      return (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    },

    onPageChange(newPage) {
      this.currentPage = newPage;
      this.showRegions();
    },
  },
};
</script>

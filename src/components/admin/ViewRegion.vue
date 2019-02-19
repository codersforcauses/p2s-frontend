<template>
  <v-card>
    <v-layout>
      <v-flex xs4>
        <v-card flat>
          <v-card-title class="headline">Regions</v-card-title>
          <v-list two-line subheader>
            <v-list-tile  v-for="region in regions[regionPagination.currentPage - 1]"
                          :key="region._id"
                          @click="getRegion(region._id)"
            >
              {{ `${region.name}` }}
            </v-list-tile>
          </v-list>
            <v-pagination
              v-if="pages(regionPagination) > 1"
              v-model="regionPagination.currentPage"
              :length="pages(regionPagination)"
              :total-visible="4"
              @input="onRegionPageChange"
              :dark="dark"
              :light="!dark"
              :color="primary"
            ></v-pagination>
        </v-card>
      </v-flex>
      <v-flex xs8>
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
            <v-list>
              <div class="title">Staff</div>
              <v-list-tile v-for="user in users[userPagination.currentPage - 1]"
                          :key="user._id"
              >
                <v-list-tile-content>
                  {{ `${user.name.first} ${user.name.last}` }}
                </v-list-tile-content>
                <v-list-tile-action>
                  <div>
                    <v-icon :color="user.coach.is ? primary :
                      'grey'"> mdi-football-australian </v-icon>
                    <v-icon :color="user.manager.is ? primary :
                      'grey'"> mdi-account-tie </v-icon>
                    <v-icon :color="user.admin.is ? primary :
                      'grey'"> mdi-shield-account </v-icon>
                  </div>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-pagination
              v-if="pages(userPagination) > 1"
              v-model="userPagination.currentPage"
              :length="pages(userPagination)"
              :total-visible="4"
              @input="onUserPageChange"
              :dark="dark"
              :light="!dark"
              :color="primary"
            ></v-pagination>
            <v-list>
              <div class="title">Schools</div>
              <v-list-tile v-for="school in schools[schoolPagination.currentPage - 1]"
                          :key="school._id"
              >
              {{ `${school.name}` }}
              </v-list-tile>
            </v-list>
            <v-pagination
              v-if="pages(schoolPagination) > 1"
              v-model="schoolPagination.currentPage"
              :length="pages(schoolPagination)"
              :total-visible="4"
              @input="onSchoolPageChange"
              :dark="dark"
              :light="!dark"
              :color="primary"
            ></v-pagination>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { mapGetters, mapActions } from 'vuex';

export default {

  data: () => ({
    active: [],
    regionSelected: false,
    regions: [],
    users: [],
    schools: [],
    regionPagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
    userPagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
    schoolPagination: {
      currentPage: 1,
      itemsPerPage: 5,
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

    dark() {
      return this.$store.getters['users/current'].darktheme;
    },

    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },

  watch: {
    regions: {
      handler() {
        if (this.regions.length === 1) {
          for (let i = 1; i < this.pages(this.regionPagination); i += 1) {
            this.regions[i] = ''; // initialising the region array for pagination.
          }
        }
      },
    },
    users: {
      handler() {
        if (this.users.length === 1) {
          for (let i = 1; i < this.pages(this.userPagination); i += 1) {
            this.users[i] = ''; // initialising the region array for pagination.
          }
        }
      },
    },
    schools: {
      handler() {
        if (this.schools.length === 1) {
          for (let i = 1; i < this.pages(this.schoolPagination); i += 1) {
            this.schools[i] = ''; // initialising the region array for pagination.
          }
        }
      },
    },
  },

  methods: {
    ...mapActions('regions', { findRegions: 'find' }),
    ...mapActions('users', { findUsers: 'find' }),
    ...mapActions('schools', { findSchools: 'find' }),

    pages(type) {
      if (type.itemsPerPage == null || type.totalItems == null) {
        return 0;
      }
      return Math.ceil(type.totalItems / type.itemsPerPage);
    },

    getRegion(id) {
      this.regionSelected = false;
      const currentRegion = this.listRegions.find(regions => regions._id === id);
      if (currentRegion === this.active[0]) {
        this.active.splice(0);
        this.regionSelected = false;
      } else {
        this.active.splice(0, 1, currentRegion);
        this.regionSelected = true;
        this.userPagination.currentPage = 1; // resets current page when selecting a new region
        this.schoolPagination.currentPage = 1; // resets current page when selecting a new region
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
          $limit: this.regionPagination.itemsPerPage,
          $skip: this.skip(this.regionPagination),
        },
      }).then((response) => {
        this.regions.splice((this.regionPagination.currentPage - 1), 1,
          response.data.map(region => region));
        this.regionPagination.totalItems = response.total;
      });
    },

    showUsers() {
      this.findUsers({
        query: {
          $limit: this.userPagination.itemsPerPage,
          $skip: this.skip(this.userPagination),
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
        this.users.splice((this.userPagination.currentPage - 1), 1,
          response.data.map(user => user));
        this.userPagination.totalItems = response.total;
      });
    },

    showSchools() {
      this.findSchools({
        query: {
          $limit: this.schoolPagination.itemsPerPage,
          $skip: this.skip(this.schoolPagination),
          _id: {
            $in: this.active[0].schools,
          },
        },
      }).then((response) => {
        this.schools.splice((this.schoolPagination.currentPage - 1), 1,
          response.data.map(school => school));
        this.schoolPagination.totalItems = response.total;
      });
    },

    skip(type) {
      return (type.currentPage - 1) * type.itemsPerPage;
    },

    onRegionPageChange(newPage) {
      this.regionPagination.currentPage = newPage;
      this.showRegions();
    },
    onUserPageChange(newPage) {
      this.userPagination.currentPage = newPage;
      this.showUsers();
    },
    onSchoolPageChange(newPage) {
      this.schoolPagination.currentPage = newPage;
      this.showSchools();
    },
  },
};
</script>

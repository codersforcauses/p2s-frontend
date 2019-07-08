<template>
  <v-card>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card flat>
          <v-card-title class="headline">Regions</v-card-title>
          <v-expansion-panel popout
                             :value="0"
          >
            <v-expansion-panel-content class="elevation-0">
              <div slot="header">View Regions</div>
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
                  :total-visible="5"
                  @input="onRegionPageChange"
                  :dark="dark"
                  :light="!dark"
                  :color="primary"
                ></v-pagination>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
      </v-flex>
      <v-flex xs12 md8>
        <v-card flat>
          <v-container justify-center
                       fill-height
                       v-if="!regionSelected"
                       class="title"
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
              <div class="title">&ensp;Staff</div>
              <v-expansion-panel class="elevation-0">
                <v-expansion-panel-content class="elevation-0">
                  <div slot="header">Filter</div>
                  <v-list>
                    <v-layout xs6>
                      <v-checkbox
                        v-model="showManagers"
                        label="Managers"
                        class="mt-0"
                        :color="primary"
                        @change="filterUser"
                      >
                      </v-checkbox>
                      <v-checkbox
                        v-model="showCoaches"
                        label="Coaches"
                        class="mt-0"
                        :color="primary"
                        @change="filterUser"
                      >
                      </v-checkbox>
                    </v-layout>
                  </v-list>
                  <v-divider />
                </v-expansion-panel-content>
              </v-expansion-panel>

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
                  </div>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-pagination
              v-if="pages(userPagination) > 1"
              v-model="userPagination.currentPage"
              :length="pages(userPagination)"
              :total-visible="5"
              @input="onUserPageChange"
              :dark="dark"
              :light="!dark"
              :color="primary"
            ></v-pagination>
            <v-list>
              <br/>
              <div class="title">&ensp;Schools</div>
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
              :total-visible="5"
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
    showCoaches: false,
    showManagers: false,
  }),
  mounted() {
    this.handleResize();
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
    showCoaches: {
      handler() {
        this.showUsers();
      },
    },
    showManagers: {
      handler() {
        this.showUsers();
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
          $sort: {
            'name.last': 1,
          },
          $limit: this.userPagination.itemsPerPage,
          $skip: this.skip(this.userPagination),
          _id: {
            $in: this.active[0].users,
          },
          $or: [
            { 'coach.is': this.showCoaches },
            { 'manager.is': this.showManagers },
          ],
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
          $sort: {
            name: 1,
          },
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

    handleResize() {
      // eslint-disable-next-line
      const { width } = screen;
      if (width >= 960 && this.regionPagination.itemsPerPage !== 8) {
        this.regionPagination.itemsPerPage = 10;
        this.regionPagination.currentPage = 1;
        this.showRegions();
      }
      if (width < 960 && this.regionPagination.itemsPerPage !== 5) {
        this.regionPagination.itemsPerPage = 5;
        this.regionPagination.currentPage = 1;
        this.showRegions();
      }
    },

    filterUser(item) {
      if (item === 'manager') {
        this.showManagers = !this.showManagers;
      }
      if (item === 'coach') {
        this.showCoaches = !this.showCoaches;
      }
    },
  },
};
</script>

<style scoped>
  .v-pagination >>> .v-pagination__item {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .v-pagination >>> .v-pagination__navigation {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
</style>

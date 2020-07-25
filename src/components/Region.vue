<template>
  <v-layout row wrap>
    <v-flex xs12 md4>
      <v-card>
        <v-card-title class="pb-0">
          <h3 class="headline mb-0" :class="`${primary}--text`">
            Select a Region
          </h3>
        </v-card-title>
        <v-list>
          <v-list-tile
            v-for="region in allRegions"
            :key="region._id"
            @click="getRegion(region._id)"
          >
            {{ region.name }}
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs12 md8 v-show="currentlySelectedRegion">
      <v-card>
        <v-card-title class="pb-0">
          {{ !currentlySelectedRegion ? "No region selected" : currentlySelectedRegion.name }}
        </v-card-title>
        <v-list>
          <v-subheader>Users</v-subheader>
          <v-list-tile v-for="user in users" :key="user._id">
            <v-list-tile-content>
              {{ `${user.name.first} ${user.name.last}` }}
            </v-list-tile-content>
            <v-tooltip bottom transition="none">
              <template v-slot:activator="{ on }">
                <v-icon v-if="user.coach.is" v-on="on">mdi-football-australian </v-icon>
              </template>
              <span>Coach</span>
            </v-tooltip>
            <v-tooltip bottom transition="none">
              <template v-slot:activator="{ on }">
                <v-icon v-if="user.manager.is" v-on="on">mdi-account-tie </v-icon>
              </template>
              <span>Manager</span>
            </v-tooltip>
            <v-tooltip bottom transition="none">
              <template v-slot:activator="{ on }">
                <v-icon v-if="user.admin.is" v-on="on">mdi-shield-account </v-icon>
              </template>
              <span>Admin</span>
            </v-tooltip>
          </v-list-tile>
        </v-list>
        <v-list>
          <v-subheader>Schools</v-subheader>
          <v-list-tile v-for="school in schools" :key="school._id">
            <v-list-tile-content>
              {{ school.name }}
            </v-list-tile-content>
            <v-list-tile-action>
              <v-subheader>
                {{ school.phoneNumber }}
              </v-subheader>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      allRegions: [],
      currentlySelectedRegion: null,
      users: [],
      schools: [],
      dark: false,
    };
  },
  computed: {
    ...mapGetters('regions', { listRegions: 'list' }),
    primary() {
      return this.$store.state.auth.user.darktheme ? 'darkPrimary' : 'lightPrimary';
    },
  },
  methods: {
    ...mapActions('regions', { findRegions: 'find' }),
    ...mapActions('users', { findUsers: 'find' }),
    ...mapActions('schools', { findSchools: 'find' }),
    populateUsers(region) {
      return this.findUsers({
        query: {
          _id: {
            $in: region.users,
          },
        },
      });
    },
    populateSchools(region) {
      return this.findSchools({
        query: {
          _id: {
            $in: region.schools,
          },
        },
      });
    },
    /* This method fetches the respective region given the id input in the click method */
    async getRegion(id) {
      const selectedRegion = this.allRegions.find(region => region._id === id);
      const usersPromise = this.populateUsers(selectedRegion);
      const schoolsPromise = this.populateSchools(selectedRegion);
      const [{ data: usersData }, { data: schoolsData }] = await Promise.all(
        [usersPromise,
          schoolsPromise],
      );
      this.users = usersData;
      this.schools = schoolsData;
      this.currentlySelectedRegion = selectedRegion;
    },
  },
  /* intialling fetching all the regions as a list when the page is created. Once
  the regions have been loaded, then the user can individually click on them */
  async mounted() {
    const { data: regionData } = await this.findRegions();
    this.allRegions = regionData;
  },
};
</script>

<template>
  <v-layout row wrap>
    <v-flex xs12 md4>
      <v-card flat>
        <v-list-item two-line>
          <h2>Select a Region</h2>
          <v-list-tile
            v-for="region in allRegions"
            :key="region._id"
            @click="getRegion(region._id)"
          >
            {{ region.name }}
          </v-list-tile>
        </v-list-item>
      </v-card>
    </v-flex>
    <v-flex xs12 md8>
      <v-card flat>
        <v-list>
          <h3>Staff</h3>
            <v-row xs6 md4 align="stretch" justify="space-around">
              <h4>Key</h4>
              <p>Coach <v-icon>mdi-account-tie</v-icon>
              </p><p>Manager <v-icon>mdi-account-tie-outline</v-icon></p>
              <p>Admin <v-icon>mdi-account-tie-voice</v-icon></p>
            </v-row>
          <v-list-tile v-for="user in users" :key="user._id">
            <v-list-tile-content>
              {{ `${user.name.first} ${user.name.last}` }}
            </v-list-tile-content>
            <v-icon v-if="user.coach.is">mdi-account-tie </v-icon>
            <v-icon v-if="user.manager.is">mdi-account-tie-outline </v-icon>
            <v-icon v-if="user.admin.is">mdi-account-tie-voice </v-icon>
          </v-list-tile>
        </v-list>
        <v-list>
          <br />
          <h3>Schools</h3>
          <v-list-tile v-for="school in schools" :key="school._id">
            {{ `${school.name}` }}
            <v-list-content>{{school.phoneNumber}}</v-list-content> <br>
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
      currentlySelectedRegion: [],
      users: [],
      schools: [],
    };
  },
  computed: {
    ...mapGetters('regions', { listRegions: 'list' }),
  },
  methods: {
    ...mapActions('regions', { findRegions: 'find' }),
    ...mapActions('users', { findUsers: 'find' }),
    ...mapActions('schools', { findSchools: 'find' }),
    /* This method fetches the respective region given the id input in the click method */
    getRegion(id) {
      const selectedRegion = this.listRegions.find(regions => regions._id === id);
      this.currentlySelectedRegion = selectedRegion;
      this.findUsers({
        query: {
          _id: {
            $in: this.currentlySelectedRegion.users,
          },
        },
      }).then((response) => {
        this.users = response.data;
      });
      this.findSchools({
        query: {
          _id: {
            $in: this.currentlySelectedRegion.schools,
          },
        },
      }).then((response) => {
        this.schools = response.data;
      });
    },
  },
  /* intialling fetching all the regions as a list when the page is created. Once
  the regions have been loaded, then the user can individually click on them */
  created() {
    this.findRegions({
      query: {},
    }).then((response) => {
      this.allRegions = response.data;
    });
  },
};
</script>

<style></style>

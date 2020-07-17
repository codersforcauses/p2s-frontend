<template>
  <v-card>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-list v-for="region in oneRegion" :key="region">
          <v-list-tile>Region name: <b>{{ `${region.name}` }}</b></v-list-tile>
          <v-list-item-content>
            <b>Schools</b>
          <ul v-for="school in oneSchools" :key="school">
            <li>{{school.name}}</li>
          </ul>
          <b>Users</b>
          <ul v-for="user in oneUsers" :key='user'>
            <li>{{user.name.first}},{{user.name.last}}</li>
          </ul>
          </v-list-item-content>
        </v-list>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    oneRegion: {},
    oneSchools: {},
    oneUsers: {},
  }),
  computed: {
    ...mapGetters('regions', { listRegions: 'list' }),
  },
  methods: {
    ...mapActions('regions', { findRegions: 'find' }),
    ...mapActions('users', { findUsers: 'find' }),
    ...mapActions('schools', { findSchools: 'find' }),
  },
  created() {
    this.findRegions({
      query: {
        $limit: 1,
      },
    }).then((response) => {
      this.oneRegion = response.data;
    });
    this.findSchools({
      query: {
        _id: {
          $in: ['5f019ce2f0cce90a929ce235', '5f019ce2f0cce90a929ce236', '5f019ce2f0cce90a929ce238'],
        },
      },
    }).then((response) => {
      this.oneSchools = response.data;
    });
    this.findUsers({
      query: {
        _id: {
          $in: ['5f019d01f0cce90a929ce244', '5f019d04f0cce90a929ce248', '5f019d04f0cce90a929ce245',
            '5f019d04f0cce90a929ce246', '5f019d04f0cce90a929ce247', '5f019d04f0cce90a929ce249',
            '5f019d04f0cce90a929ce24a'],
        },
      },
    }).then((response) => {
      this.oneUsers = response.data;
    });
  },
};
</script>
<style scoped>
ul{
list-style: disc;
}
</style>

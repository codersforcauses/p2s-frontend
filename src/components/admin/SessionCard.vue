<template>
  <v-card flat>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"
            :class="`${primary}--text`"
        >
          Manage Sessions
        </h3>
        <div>
          View all the sessions on file
          <br>
          Create a new session to be used in lessons or programs
        </div>
      </div>
    </v-card-title>

    <v-card-actions class="pa-0">
      <v-btn  flat
              round
      >
        View All
      </v-btn>
      <v-btn  flat
              round
              @click="sessionDialog = true"
      >
        Create New
      </v-btn>
      <session v-model="sessionDialog" v-bind="{ dark }" />
    </v-card-actions>
  </v-card>
</template>

<script>
// import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  props: ['primary'],
  components: {
    session: () => ({
      component: import('./modals/NewSession.vue'),
    }),
  },
  data() {
    return {
      sessionDialog: false,
      // finished: false,
    };
  },
  // mounted() {
  //   this.findUsers({
  //     query: {
  //       $sort: {
  //         updatedAt: -1,
  //       },
  //       $select: [
  //         'name',
  //         'region',
  //         'email',
  //         'coach',
  //         'admin',
  //         'manager',
  //       ],
  //     },
  //   }).then((response) => {
  //     const regionIds = response.data.map(regionId => regionId.region);
  //     this.findRegions({
  //       query: {
  //         _id: {
  //           $in: regionIds,
  //         },
  //       },
  //     });
  //     this.finished = true;
  //   });
  // },
  computed: {
    // ...mapState('users', { isFindPendingUsers: 'isFindPending' }),
    // ...mapState('regions', { isGetPendingRegions: 'isGetPending' }),
    // ...mapGetters('users', { findUsersInStore: 'find' }),
    // ...mapGetters('regions', { getRegionInStore: 'get' }),
    // isPending() {
    //   return this.isFindPendingUsers || this.isGetPendingRegions;
    // },
    // users() {
    //   if (this.finished) {
    //     const users = this.findUsersInStore({
    //       query: {
    //         $limit: 5,
    //         $sort: {
    //           updatedAt: -1,
    //         },
    //         _id: {
    //           $ne: this.$store.state.auth.payload.userId,
    //         },
    //       },
    //     }).data;

    //     const usersWithRegion = users.map((user) => {
    //       const region = this.getRegionInStore(user.region);
    //       return {
    //         ...user,
    //         region: region === undefined ? 'Region Unassigned' : region.name,
    //       };
    //     });
    //     return usersWithRegion;
    //   }
    //   return false;
    // },
    dark() {
      return this.$store.getters['users/current'].darktheme;
    },
  // },
  // methods: {
  //   ...mapActions('users', { findUsers: 'find' }),
  //   ...mapActions('regions', { findRegions: 'find' }),
  },
};
</script>

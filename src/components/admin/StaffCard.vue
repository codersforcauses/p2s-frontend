<template>
  <v-card flat>
    <v-list three-line
            subheader
            class="pb-0"
            v-show="!isPending"
    >
      <v-subheader> Active Users </v-subheader>
      <v-list-tile  v-for="user in users"
                    :key="user._id"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            {{ `${user.name.first} ${user.name.last}` }}
          </v-list-tile-title>
          <v-list-tile-sub-title class="text--primary">
            {{ user.region }}
          </v-list-tile-sub-title>
          <v-list-tile-sub-title>
            {{ user.email }}
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <div>
            <v-icon :color="user.coach.is ? primary : 'grey'"> mdi-football-australian </v-icon>
            <v-icon :color="user.manager.is ? primary : 'grey'"> mdi-account-tie </v-icon>
            <v-icon :color="user.admin.is ? primary : 'grey'"> mdi-shield-account </v-icon>
          </div>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"
            :class="`${primary}--text`"
        >
          Manage Staff
        </h3>

        <div>
          View all the staff currently active
          <br>
          Invite a new member to P2S
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
              @click="inviteDialog = true"
      >
        Add New
      </v-btn>
      <invite v-model="inviteDialog" v-bind="{ dark }" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  props: ['primary'],
  components: {
    invite: () => ({
      component: import('./modals/UserInvite.vue'),
    }),
  },
  data() {
    return {
      inviteDialog: false,
      finished: false,
    };
  },
  mounted() {
    this.findUsers({
      query: {
        $sort: {
          updatedAt: -1,
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
      const regionIds = response.data.map(regionId => regionId.region);
      this.findRegions({
        query: {
          _id: {
            $in: regionIds,
          },
        },
      });
      this.finished = true;
    });
  },
  computed: {
    ...mapState('users', { isFindPendingUsers: 'isFindPending' }),
    ...mapState('regions', { isGetPendingRegions: 'isGetPending' }),
    ...mapGetters('users', { findUsersInStore: 'find' }),
    ...mapGetters('regions', { getRegionInStore: 'get' }),
    isPending() {
      return this.isFindPendingUsers || this.isGetPendingRegions;
    },
    users() {
      if (this.finished) {
        const users = this.findUsersInStore({
          query: {
            $limit: 5,
            $sort: {
              updatedAt: -1,
            },
            _id: {
              $ne: this.$store.state.auth.payload.userId,
            },
          },
        }).data;

        const usersWithRegion = users.map((user) => {
          const region = this.getRegionInStore(user.region);
          return {
            ...user,
            region: region === undefined ? 'Region Unassigned' : region.name,
          };
        });
        return usersWithRegion;
      }
      return false;
    },
    dark() {
      return this.$store.getters['users/current'].darktheme;
    },
  },
  methods: {
    ...mapActions('users', { findUsers: 'find' }),
    ...mapActions('regions', { findRegions: 'find' }),
  },
};
</script>

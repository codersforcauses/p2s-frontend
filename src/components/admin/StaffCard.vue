<template>
  <v-card flat>
    <v-list two-line subheader>
      <v-subheader>Active Users</v-subheader>
      <v-list-tile
        v-for="user in listUsers"
        :key="user._id"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            {{ user.name.first.concat(' ', user.name.last) }}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ user.email }}
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-content>
          <v-list-tile-subtitle>
            {{ user.region }}
          </v-list-tile-subtitle>
        </v-list-tile-content>

        <v-list-tile-action>
          <div>
            <v-icon :color="user.coach.is ? primary : 'grey'">mdi-football-australian</v-icon>
            <v-icon :color="user.manager.is ? primary : 'grey'">mdi-account-tie</v-icon>
            <v-icon :color="user.admin.is ? primary : 'grey'">mdi-shield-account</v-icon>
          </div>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"
        :class="`${primary}--text`">Manage Staff</h3>
        <div>
          View all the staff currently active
          <br>
          Invite a new member to P2S
        </div>
      </div>
    </v-card-title>

    <v-card-actions class="pa-0">
      <v-btn
        flat
        round
      >View All</v-btn>
      <v-btn
        flat
        round
      >Add New</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: [
    'primary',
  ],
  mounted() {
    this.findUsers();
  },
  computed: {
    ...mapGetters('users', { listUsers: 'list' }),
  },
  methods: {
    ...mapActions('users', { findUsers: 'find' }),
  },
};
</script>

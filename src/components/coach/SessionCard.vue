<template>
  <v-card flat>
    <v-list v-show="!isPending" three-line subheader>
      <v-subheader> Upcoming Sessions </v-subheader>
      <v-list-tile  v-for="session in sessionTest"
                    :key="session._id"
                    @click="false"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            {{ session.date }}
          </v-list-tile-title>
          <v-list-tile-sub-title class="text--primary">
            {{ session.school.name }}
          </v-list-tile-sub-title>
          <v-list-tile-sub-title>
            {{ `${session.school.location.city}, ${session.school.location.state}` }}
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-list-tile-action-text class="text-xs-center">
            <span class="subheading"> {{ session.time }} </span>
            <br><br>
            <span :class="`${primary}--text`"> View Activities </span>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"
            :class="`${primary}--text`"
        >
          View Sessions
        </h3>

        <div>
          View all the sessions that you are currently allocated
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
      <!-- <current-session v-model="currentSessionDialog" v-bind="{ dark }" /> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  props: ['primary'],
  // components: {
  //   'current-session': () => ({
  //     component: import('./modals/CurrentSession.vue'),
  //   }),
  // },
  data() {
    return {
      // currentSessionDialog: true,
      finished: false,
      sessionTest: [{
        _id: 'qwerty',
        date: new Date(),
        time: '12:30:40 PM',
        type: 'Indoor',
        school: {
          name: 'hello',
          location: {
            city: 'Nedlands',
            state: 'WA',
          },
        },
        location: {

        },
      }],
    };
  },
  mounted() {
    this.findSessions({
      query: {
        $sort: {
          updatedAt: -1,
        },
        $select: [
          'name',
          'school',
          'schoolYear',
        ],
      },
    }).then((response) => {
      const schoolsId = response.data.map(schoolId => schoolId.school);
      this.findSchools({
        query: {
          _id: {
            $in: schoolsId,
          },
        },
      });
      this.finished = true;
    });
  },
  computed: {
    ...mapState('sessions', { isFindPendingSessions: 'isFindPending' }),
    ...mapState('schools', { isGetPendingSchools: 'isGetPending' }),
    ...mapGetters('sessions', { findSessionsInStore: 'find' }),
    ...mapGetters('schools', { getSchoolInStore: 'get' }),
    isPending() {
      return this.isFindPendingSessions || this.isGetPendingSchools;
    },
    sessions() {
      if (this.finished) {
        const sessions = this.findSessionsInStore({
          query: {
            $limit: 5,
            $sort: {
              updatedAt: -1,
            },
          },
        }).data;

        const sessionsWithSchool = sessions.map((session) => {
          const school = this.getSchoolInStore(session.school);
          return {
            ...session,
            school: school === undefined ? 'School Unassigned' : school.name,
          };
        });
        return sessionsWithSchool;
      }
      return false;
    },
    dark() {
      return this.$store.getters['users/current'].darktheme;
    },
  },
  methods: {
    ...mapActions('sessions', { findSessions: 'find' }),
    ...mapActions('schools', { findSchools: 'find' }),
  },
};
</script>

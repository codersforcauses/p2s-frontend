<template>
  <v-card flat>
    <v-list v-show="!isPending" three-line subheader>
      <v-subheader> Recent Students </v-subheader>
      <v-list-tile  v-for="student in students"
                    :key="student._id"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            {{ `${student.name.first} ${student.name.last}` }}
          </v-list-tile-title>
          <v-list-tile-sub-title class="text--primary">
            {{ student.school }}
          </v-list-tile-sub-title>
          <v-list-tile-sub-title>
            Year {{ student.schoolYear }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"
            :class="`${primary}--text`"
        >
          Manage Students
        </h3>

        <div>
          View all the students that you currently coach
          <br>
          Add a new student
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
      <!-- <invite v-model="inviteDialog" v-bind="{ dark }" /> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  props: ['primary'],
  components: {
    // invite: () => ({
    //   component: import('./modals/studentInvite.vue'),
    // }),
  },
  data() {
    return {
      inviteDialog: false,
      finished: false,
    };
  },
  mounted() {
    this.findStudents({
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
    ...mapState('students', { isFindPendingStudents: 'isFindPending' }),
    ...mapState('schools', { isGetPendingSchools: 'isGetPending' }),
    ...mapGetters('students', { findStudentsInStore: 'find' }),
    ...mapGetters('schools', { getSchoolInStore: 'get' }),
    isPending() {
      return this.isFindPendingStudents || this.isGetPendingSchools;
    },
    students() {
      if (this.finished) {
        const students = this.findStudentsInStore({
          query: {
            $limit: 5,
            $sort: {
              updatedAt: -1,
            },
          },
        }).data;

        const studentsWithSchool = students.map((student) => {
          const school = this.getSchoolInStore(student.school);
          return {
            ...student,
            school: school === undefined ? 'School Unassigned' : school.name,
          };
        });
        return studentsWithSchool;
      }
      return false;
    },
    dark() {
      return this.$store.getters['users/current'].darktheme;
    },
  },
  methods: {
    ...mapActions('students', { findStudents: 'find' }),
    ...mapActions('schools', { findSchools: 'find' }),
  },
};
</script>

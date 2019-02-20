<template>
  <v-dialog scrollable
            max-width=520
            v-model="showDialog"
            transition="dialog-transition"
            :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card flat tile>
      <v-toolbar flat>
        <h1 class="headline"> {{ session.name }} </h1>
        <v-spacer/>
        <v-btn flat icon @click="$emit('input')">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-4">
        <v-form v-model="valid"
                class="pt-2"
                :class="{ 'px-2': $vuetify.breakpoint.smAndUp }"
                @keyup.native.enter="patchSession($event)"
        >
          <v-layout row wrap>
            <v-flex xs12 tag="label" class="v-label ml-4">
              ACTIVITIES PLANNED
            </v-flex>
            <v-flex xs12 style="padding-right: 1px;">
              <v-textarea solo-inverted
                          flat
                          persistent-hint
                          auto-grow
                          counter=""
                          type="text"
                          class="mb-2 mt-1"
                          placeholder="Enter details in your own words on how the session went"
                          :color="primary"
                          :rules="[validation.required, validation.name]"
              >
              </v-textarea>
            </v-flex>

            <v-flex xs12 tag="label" class="v-label ml-4">
              STUDENT REPORT AND ATTENDANCE
            </v-flex>
            <v-flex xs12>
              <v-list two-line class="mt-1 pb-0">
                <v-list-tile
                  v-for="student in incompletedStudents"
                  :key="student._id"
                  @click="temp = true"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ `${student.name.first} ${student.name.last}` }}
                    </v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-avatar>
                    <v-checkbox v-model="temp" :color="primary"></v-checkbox>
                  </v-list-tile-avatar>
                </v-list-tile>
              </v-list>
              <v-expansion-panel focusable class="mb-4">
                <v-expansion-panel-content>
                  <div slot="header">
                    Completed
                  </div>
                  <v-list class="mt-1">
                    <v-list-tile
                      v-for="student in completedStudents"
                      :key="student._id"
                      @click="temp = true"
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{ `${student.name.first} ${student.name.last}` }}
                        </v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-avatar>
                        <v-checkbox v-model="temp" :color="primary"></v-checkbox>
                      </v-list-tile-avatar>
                    </v-list-tile>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>

            <v-flex xs12 tag="label" class="v-label ml-4">
              SESSION FEEDBACK
            </v-flex>
            <v-flex xs12 style="padding-right: 1px;">
              <v-textarea solo-inverted
                          flat
                          persistent-hint
                          auto-grow
                          counter=""
                          type="text"
                          class="mb-2 mt-1"
                          placeholder="Enter details in your own words on how the session went"
                          :color="primary"
                          :rules="[validation.required, validation.name]"
              >
              </v-textarea>
            </v-flex>

            <v-flex xs12>
              <v-alert  dismissible
                        v-model="alert"
                        type="error"
                        name="alert"
                        class="alert"
                        transition="slide-y-transition"
              >
                {{ error }}
              </v-alert>
            </v-flex>

            <v-flex xs12 class="mt-3">
              <v-btn  depressed
                      round
                      class="ma-0"
                      style="float: right"
                      :light="!dark"
                      :dark="dark"
                      :color="primary"
                      :disabled="!valid"
                      @click.stop.prevent="createSession"
              >
                <span :style="{ color: button }"> Send Invite </span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  props: ['value', 'dark', 'sessionId'],
  data() {
    return {
      temp: false,
      session: {
        name: 'New session',
      },
      alert: false,
      error: '',
      valid: false,
      finished: false,
      validation: {
        required: value => !!value || 'This field is required',
        email: (value) => {
          const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@p2srugbyworks.com$/igm;
          return pattern.test(value) || 'Invalid P2S email address';
        },
        name: (value) => {
          const pattern = /^[a-z ,.'-]+$/i;
          return pattern.test(value) || 'Name must only contain letters';
        },
      },
    };
  },
  mounted() {
    this.findStudents({
      query: {
        id: this.sessionId,
        $sort: {
          'name.first': 1,
          'name.last': 1,
        },
        $select: [
          'name',
          'schoolYear',
          'gender',
          'trial',
        ],
      },
    }).then(this.finished = true);
  },
  computed: {
    ...mapState('students', { loadStudents: 'isFindPending' }),
    ...mapGetters('students', { findStudentsInStore: 'find' }),
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
    button() {
      return this.dark ? '#272727' : '#ebebeb';
    },
    students() {
      if (this.finished) {
        const students = this.findStudentsInStore({
          query: {
            $limit: 15,
            $sort: {
              'name.first': 1,
              'name.last': 1,
            },
          },
        }).data;

        const studentsInSession = students.map(student => ({
          ...student,
          completion: false,
        }));
        return studentsInSession;
      }
      return [];
    },
    incompletedStudents() {
      return this.students.filter(student => !student.completion);
    },
    completedStudents() {
      return this.students.filter(student => student.completion);
    },
  },
  methods: {
    ...mapActions('students', { findStudents: 'find' }),
    createSession() {},
  },
};
</script>

<style scoped>
.alert {
  border: 0;
  border-radius: 30px;
  font-size: 12pt;
  margin: 0.5rem 0 1rem;
  min-width: calc(100% - 20vw);
  z-index: auto;
}
.v-card {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.v-input--v-checkbox >>> .v-input__slot {
  margin: 0 !important;
}
.v-expansion-panel {
  box-shadow: none;
  border: 1px solid var(--v-grey-base);
}
</style>

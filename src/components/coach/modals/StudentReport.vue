<template>
  <v-dialog scrollable
            max-width=1024
            v-model="showDialog"
            transition="dialog-transition"
            :fullscreen="$vuetify.breakpoint.mdAndDown"
  >
    <v-card flat tile class="pb-2">
      <v-toolbar flat>
        <h1 class="headline"> {{ heading }} </h1>
        <v-spacer/>
        <v-btn flat icon @click="$emit('input')">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-4">
        <v-form v-model="valid"
                class="pt-2 pb-2"
                :class="{ 'mx-auto': $vuetify.breakpoint.smAndUp }"
                style="max-width: 1024px"
                @keyup.native.enter="patchSession($event)"
        >
          <v-layout row wrap class="pb-3">
            <v-flex xs12 tag="label" class="v-label ml-4">
              ATTENDANCE
            </v-flex>
            <v-flex xs12>
              <v-select solo-inverted
                        flat
                        persistent-hint
                        hint="Attendance of the student for this session"
                        class="mb-2 mt-1 select__flat"
                        :items="items"
                        :color="primary"
                        :disabled="loading"
                        v-model="report.attendance"
                        :menu-props="{
                          offsetY: true,
                          light: dark,
                          dark: !dark,
                          transition: 'slide-y-transition',
                        }"
              ></v-select>
            </v-flex>

            <v-flex xs12 tag="label" class="v-label ml-4">
              COMMENTS
            </v-flex>
            <v-flex xs12 class="mt-1">
              <v-textarea solo-inverted
                          flat
                          persistent-hint
                          auto-grow
                          counter="250"
                          maxlength="250"
                          type="text"
                          class="mb-2 mt-1"
                          hint="Enter your comments on the student during this session"
                          v-model="report.notes"
                          :color="primary"
              >
              </v-textarea>
            </v-flex>

            <div v-show="showMatrix">
              <v-flex xs12 tag="label" class="v-label ml-4 mb-2">
                SCORE BEHAVIOUR MATRIX
              </v-flex>
              <v-flex xs12
                      v-for="(categories, index) in matrix"
                      :key="categories.name"
              >
                <v-data-table hide-actions
                              expand
                              :headers="headers"
                              :items="categories.matrix"
                              item-key="_id"
                              loading="finished"
                >
                  <template v-slot:headers="props">
                    <tr>
                      <th style="min-width: 344px; max-width: 344px;">
                        <label class="v-label title">
                          {{ categories.name }}
                        </label>
                      </th>
                      <th v-for="header in props.headers" :key="header.text">
                        {{ header.text }}
                      </th>
                    </tr>
                  </template>
                  <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td colspan="7" class="px-0">
                      <v-radio-group  row
                                      hide-details
                                      value=1
                                      v-model="report.matrix[index][props.index]"
                                      :rules="[validation.required]"
                                      @click="props.expanded = true;"
                      >
                        <template v-slot>
                          <table>
                            <tr>
                              <td v-for="val in 7" :key="val" class="px-4">
                                <v-radio  :color="primary"
                                          :value="val"
                                          class="ma-1 px-1"
                                ></v-radio>
                              </td>
                            </tr>
                          </table>
                        </template>
                      </v-radio-group>
                    </td>
                  </template>
                  <template v-slot:expand="props">
                    <v-card flat>
                      <v-card-text class="body-2 font-italic font-weight-light px-4">
                        {{ props.item.level[report.matrix[index][props.index]-1].description }}
                      </v-card-text>
                    </v-card>
                  </template>
                </v-data-table>
                <v-divider class="my-4" style="border: solid 1px"/>
              </v-flex>
            </div>

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
                <span :style="{ color: button }"> Submit Report </span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    value: Boolean,
    dark: Boolean,
    student: Object,
  },
  data() {
    return {
      report: {
        attendance: this.student.attendance,
        matrix: [],
        notes: '',
      },
      alert: false,
      error: '',
      valid: false,
      finished: false,
      items: [
        'Present',
        'Absent from school',
        'In school but chose not to attend',
        'Teacher restricted',
        'Teacher restricted - Exam preparation',
      ],
      matrix: [],
      headers: [{
        text: '1',
        align: 'center',
        sortable: false,
        value: 1,
      }, {
        text: '2',
        align: 'center',
        sortable: false,
        value: 2,
      }, {
        text: '3',
        align: 'center',
        sortable: false,
        value: 3,
      }, {
        text: '4',
        align: 'center',
        sortable: false,
        value: 4,
      }, {
        text: '5',
        align: 'center',
        sortable: false,
        value: 5,
      }, {
        text: '6',
        align: 'center',
        sortable: false,
        value: 6,
      }, {
        text: '7',
        align: 'center',
        sortable: false,
        value: 7,
      }],
      validation: {
        required: value => !!value || 'This field is required',
      },
    };
  },
  mounted() {
    this.findMatrix()
      .then(([response]) => {
        this.matrix = response.category;
        this.report.matrix = response.category
          .map(({ matrix }) => new Array(matrix.length).fill(1));
      })
      .catch(e => console.log(e))
      .finally(() => {
        this.finished = true;
      });
  },
  computed: {
    ...mapState('reports', { loading: 'isCreatePending' }),
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
    heading() {
      return `${this.student.name.first}'s Student Assessment` || '';
    },
    showMatrix() {
      return this.report.attendance === 'Present';
    },
  },
  methods: {
    ...mapActions('matrix', { findMatrix: 'find' }),
    async createSession() {
      if (this.valid) {
        console.log(this.report);
        this.$emit('present', this.showMatrix);
        this.$emit('input');

        const empty = this.report.matrix.map(val => new Array(val.length).fill(1));
        this.report = {
          attendance: '',
          matrix: empty,
          notes: '',
        };
        // const tempReport = {
        //   ...this.report,
        //   matrixResults: this.report.matrix,
        // };
        // const { Reports } = this.$FeathersVuex;
        // const report = new Reports(tempReport);

        // await report.create()
        //   .then(() => {
        //     this.$emit('studentPresent', this.showMatrix);
        //     this.$emit('input');
        //   })
        //   .catch((err) => {
        //     this.error = err.message.charAt(0).toUpperCase().concat(err.message.slice(1));
        //     this.alert = true;
        //   });
      }
    },
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

.v-input--radio-group >>> .v-input__slot {
  margin: 0 !important;
  padding: 0 !important;
}
.v-radio >>> .v-input--selection-controls__input {
  margin: 0 !important;
}
</style>

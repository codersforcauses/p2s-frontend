<template>
  <v-dialog scrollable
            max-width=520
            v-model="showDialog"
            transition="dialog-transition"
            :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card flat tile>
      <v-toolbar flat>
        <h1 class="headline"> {{ heading }} </h1>
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
              STUDENT ASSESSMENT
            </v-flex>
            <v-flex xs12>
              <v-data-table :headers="headers"
                            :items="items"
                            hide-actions
                            item-key="id"
                            loading="true"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                  <td class="text-xs-right">{{ props.item.calories }}</td>
                  <td class="text-xs-right">{{ props.item.fat }}</td>
                  <td class="text-xs-right">{{ props.item.carbs }}</td>
                  <td class="text-xs-right">{{ props.item.protein }}</td>
                  <td class="text-xs-right">{{ props.item.iron }}</td>
                </template>
              </v-data-table>
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
                          placeholder="Enter your comments on the student during this session"
                          :color="primary"
                          :rules="[validation.required]"
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
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  props: ['value', 'dark', 'student'],
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
      headers: [{
        text: '',
        align: 'left',
        sortable: false,
        // value: matrix.category.matrix.name,
      }, {
        text: 'Level 1',
        align: 'left',
        sortable: false,
        value: 1,
      }, {
        text: 'Level 2',
        align: 'left',
        sortable: false,
        value: 2,
      }, {
        text: 'Level 3',
        align: 'left',
        sortable: false,
        value: 3,
      }, {
        text: 'Level 4',
        align: 'left',
        sortable: false,
        value: 4,
      }, {
        text: 'Level 5',
        align: 'left',
        sortable: false,
        value: 5,
      }, {
        text: 'Level 6',
        align: 'left',
        sortable: false,
        value: 6,
      }, {
        text: 'Level 7',
        align: 'left',
        sortable: false,
        value: 7,
      }],
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
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
  computed: {
    ...mapState('Reports', { loadReports: 'isFindPending' }),
    ...mapGetters('Reports', { findReportsInStore: 'find' }),
    ...mapState('Matrix', { loadMatrix: 'isFindPending' }),
    ...mapGetters('Matrix', { findMatrixInStore: 'find' }),
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
      return `${this.student.name.first}'s Report`;
    },
  },
  methods: {
    ...mapActions('Reports', { findReports: 'find' }),
    ...mapActions('Matrix', { findMatrix: 'find' }),
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

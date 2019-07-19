<template>
  <v-dialog scrollable
            max-width=520
            v-model="showDialog"
            transition="dialog-transition"
            :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card flat tile>
      <v-toolbar flat>
        <h1 class="headline"> Create New Program </h1>
        <v-spacer/>
        <v-btn flat icon @click="$emit('input')">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-4">
        <v-form v-model="valid"
                class="pt-2"
                :class="{ 'px-2': $vuetify.breakpoint.smAndUp }"
                @keyup.native.enter="valid && createprogram($event)"
        >
          <v-layout row wrap>
            <v-flex xs12 tag="label" class="v-label ml-4">
              NAME
            </v-flex>
            <v-flex xs12>
              <v-text-field solo-inverted
                            flat
                            persistent-hint
                            hint="Enter the name of this program (cannot be changed later)"
                            type="text"
                            class="mb-2 mt-1"
                            :color="primary"
                            :disabled="loading"
                            :rules="[validation.required]"
                            v-model.trim="program.name"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12 tag="label" class="v-label ml-4">
              SCHOOL NAME
            </v-flex>
            <v-flex xs12>
              <v-autocomplete solo-inverted
                              flat
                              persistent-hint
                              cache-items
                              hide-selected
                              placeholder="Start typing..."
                              type="text"
                              hint="Important for coaches and regional managers"
                              class="mb-2 mt-1 select__flat"
                              v-model.trim="program.school"
                              item-text="name"
                              item-value="_id"
                              :items="listSchools"
                              :search-input.sync="searchSchool"
                              :loading="loadSchools"
                              :color="primary"
                              :disabled="loading"
                              :rules="[validation.required]"
                              :menu-props="{
                                offsetY: true,
                                light: isDark,
                                dark: !isDark,
                                transition: 'slide-y-transition',
                              }"
              >
                <template slot="no-data">
                  <div class="list">
                    Can't find the school you wanted? Create a new
                      <a  slot="activator"
                          href="/school"
                          target="_blank"
                          :style="{ color: primaryColor }"
                          style="text-decoration: none;"
                          @click.stop
                      >
                        school
                      <v-icon size="1rem"
                              :color="primaryInv"
                      >
                        mdi-open-in-new
                      </v-icon>
                      </a>
                      <p class="caption ma-0">
                        Please refresh the page if you do not see a created school.
                      </p>
                  </div>
                </template>
              </v-autocomplete>
            </v-flex>

          <v-flex xs12 tag="label" class="v-label ml-4">
            DATES
          </v-flex>
          <v-flex xs6 style="padding-right: 1px;">
            <v-menu lazy
                    offset-y
                    full-width
                    :light="isDark"
                    :dark="!isDark"
                    :close-on-content-click="false"
                    v-model="menu1"
                    transition="scale-transition"
                    min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field readonly
                              solo-inverted
                              flat
                              persistent-hint
                              hint="Enter the date for the first session"
                              class="mb-2 mt-1 left select__flat"
                              v-model="program.dates.start"
                              v-on="on"
                              :color="primary"
                ></v-text-field>
              </template>
              <v-date-picker  v-model="program.dates.start"
                              :color="primary"
                              @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs6 style="padding-left: 1px;">
            <v-menu lazy
                    offset-y
                    full-width
                    :light="isDark"
                    :dark="!isDark"
                    :close-on-content-click="false"
                    v-model="menu2"
                    transition="scale-transition"
                    min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field readonly
                              solo-inverted
                              flat
                              persistent-hint
                              hint="Enter the date for the last session"
                              class="mb-2 mt-1 right select__flat"
                              v-model="program.dates.end"
                              v-on="on"
                              :color="primary"
                ></v-text-field>
              </template>
              <v-date-picker  v-model="program.dates.end"
                              :color="primary"
                              @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs12 tag="label" class="v-label ml-4">
            DAYS OF THE WEEK
          </v-flex>
          <v-flex xs12>
            <v-combobox solo-inverted
                        flat
                        multiple
                        chips
                        class="mb-2 mt-1 select__flat"
                        v-model="program.days"
                        :color="primary"
                        :items="days"
                        :menu-props="{
                          offsetY: true,
                          light: isDark,
                          dark: !isDark,
                          transition: 'slide-y-transition',
                        }"
            >
              <template v-slot:selection="data">
                <v-chip :light="isDark"
                        :dark="!isDark"
                        :key="JSON.stringify(data.item)"
                        :selected="data.selected"
                        :disabled="data.disabled"
                        class="v-chip--select-multi"
                        @input="data.parent.selectItem(data.item)"
                >
                  <v-avatar class="accent white--text">
                    {{ data.item.slice(0, 1).toUpperCase() }}
                  </v-avatar>
                  {{ data.item }}
                </v-chip>
              </template>
            </v-combobox>
          </v-flex>

          <v-flex xs12 tag="label" class="v-label ml-4">
            TIMES
          </v-flex>
          <v-flex xs6 style="padding-right: 1px;">
            <v-menu lazy
                    offset-y
                    full-width
                    :light="isDark"
                    :dark="!isDark"
                    :close-on-content-click="false"
                    :return-value.sync="program.time.start"
                    v-model="menu3"
                    transition="scale-transition"
                    min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field readonly
                              solo-inverted
                              flat
                              persistent-hint
                              hint="Enter the date for the first session"
                              class="mb-2 mt-1 left select__flat"
                              v-model="program.time.start"
                              v-on="on"
                              :color="primary"
                ></v-text-field>
              </template>
              <v-time-picker  v-model="program.time.start"
                              :color="primary"
                              @input="menu3 = false"
              ></v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs6 style="padding-left: 1px;">
            <v-menu lazy
                    offset-y
                    full-width
                    :light="isDark"
                    :dark="!isDark"
                    :close-on-content-click="false"
                    :return-value.sync="program.time.end"
                    v-model="menu4"
                    transition="scale-transition"
                    min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field readonly
                              solo-inverted
                              flat
                              persistent-hint
                              hint="Enter the date for the last session"
                              class="mb-2 mt-1 right select__flat"
                              v-model="program.time.end"
                              v-on="on"
                              :color="primary"
                ></v-text-field>
              </template>
              <v-date-picker  v-model="program.time.end"
                              :color="primary"
                              @input="menu4 = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <!-- <v-select solo-inverted
                    flat
                    persistent-hint
                    hint="Enter the state the program belongs to"
                    type="text"
                    class="mb-2 mt-1 select__flat"
                    item-text="name"
                    item-value="value"
                    :items="states"
                    :color="primary"
                    :disabled="loading"
                    v-model="program.state"
                    :menu-props="{
                      offsetY: true,
                      light: isDark,
                      dark: !isDark,
                      transition: 'slide-y-transition',
                    }"
          ></v-select> -->

            <v-alert  dismissible
                      v-model="alert"
                      type="error"
                      name="alert"
                      class="alert"
                      transition="slide-y-transition"
            >
              {{ error }}
            </v-alert>

            <v-btn  depressed
                    round
                    class="ma-0"
                    style="float: right"
                    :light="!isDark"
                    :dark="isDark"
                    :color="primary"
                    :disabled="!valid || loading"
                    :loading="loading"
                    @click.stop.prevent="createprogram"
            >
              <span :style="{ color: button }"> Create program </span>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  props: ['value', 'dark'],
  data() {
    return {
      program: {
        name: '',
        school: '',
        dates: {
          start: null,
          end: null,
        },
        days: [],
        time: {
          start: null,
          end: null,
        },
        coaches: [],
        student: [],
      },
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      searchSchool: undefined,
      alert: false,
      error: '',
      valid: false,
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      validation: {
        required: value => !!value || 'This field is required',
      },
    };
  },
  watch: {
    searchSchool(val) {
      // eslint-disable-next-line
      val = val || '';
      if (!this.listSchools.includes(val)) {
        this.findSchoolsInStore({
          query: {
            name: {
              $gte: val,
            },
            $select: ['id', 'name', 'students', 'address'],
          },
        });
      }
    },
  },
  computed: {
    ...mapState('schools', { loadSchools: 'isFindPending' }),
    ...mapGetters('schools', { listSchools: 'list' }),
    ...mapState('programs', { loading: 'isCreatePending' }),
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    isDark() {
      return this.dark === 'dark';
    },
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
    primaryInv() {
      return !this.dark ? 'darkPrimary' : 'lightPrimary';
    },
    primaryColor() {
      return !this.dark ? 'var(--v-darkPrimary-base)' : 'var(--v-lightPrimary-base)';
    },
    button() {
      return this.isDark ? '#272727' : '#ebebeb';
    },
  },
  methods: {
    ...mapActions('schools', { findSchoolsInStore: 'find' }),
    async createProgram() {
      if (this.valid) {
        const { Program } = this.$FeathersVuex;
        const program = new Program(this.program);

        await program.create()
          .then(() => this.$emit('input'))
          .catch(({ message }) => {
            this.error = message.charAt(0).toUpperCase().concat(message.slice(1));
            this.alert = true;
          });
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
.list {
  padding: calc( 0.5 * var(--thiccness)) var(--thiccness);
}
.v-input--selection-controls >>> .v-input__slot {
  margin: 0 !important;
}

.left >>> .v-input__slot {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.right >>> .v-input__slot {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>

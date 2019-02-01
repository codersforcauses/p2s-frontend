<template>
  <v-dialog scrollable
            max-width=520
            v-model="showDialog"
            transition="dialog-transition"
            :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card flat tile>
      <v-toolbar flat>
        <h1 class="headline"> Invite Users </h1>
        <v-spacer/>
        <v-btn flat icon @click="$emit('input')">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-4">
        <v-form v-model="valid"
                class="pt-2"
                :class="{ 'px-2': $vuetify.breakpoint.smAndUp }"
                @keyup.native.enter="valid && createUser($event) && !checkPerm && !!checkPerm"
        >
          <v-layout row wrap>
            <v-flex xs12 tag="label" class="v-label ml-4">
              NAME
            </v-flex>
            <v-flex xs6 style="padding-right: 1px;">
              <v-text-field solo-inverted
                            flat
                            persistent-hint
                            hint="Enter the user's name"
                            type="text"
                            class="mb-2 mt-1 first-name"
                            placeholder="First Name"
                            :color="primary"
                            :disabled="loading"
                            :rules="[validation.required, validation.name]"
                            v-model.trim="user.name.first"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6 style="padding-left: 1px;">
              <v-text-field solo-inverted
                            flat
                            type="text"
                            class="mb-2 mt-1 last-name"
                            placeholder="Last Name"
                            :color="primary"
                            :disabled="loading"
                            :rules="[validation.required, validation.name]"
                            v-model.trim="user.name.last"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12 tag="label" class="v-label ml-4">
              EMAIL
            </v-flex>
            <v-flex xs12>
              <v-text-field solo-inverted
                            flat
                            persistent-hint
                            validate-on-blur
                            type="email"
                            hint="Enter the user's email address"
                            class="mb-2 mt-1"
                            :color="primary"
                            :disabled="loading"
                            :rules="[validation.required, validation.email]"
                            v-model.trim="user.email"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12 tag="label" class="v-label ml-4">
              ASSIGN REGION
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
                              v-model.trim="user.region"
                              item-text="name"
                              item-value="_id"
                              :items="listRegions"
                              :search-input.sync="search"
                              :loading="loadRegions"
                              :color="primary"
                              :disabled="loading"
                              :rules="[validation.required]"
                              :menu-props="{
                                offsetY: true,
                                light: dark,
                                dark: !dark,
                                transition: 'slide-y-transition',
                              }"
              >
                <template slot="no-data">
                  <div class="list">
                    Can't find the region you wanted? Create a new
                      <a  slot="activator"
                          href="/region"
                          target="_blank"
                          :style="{ color: primaryColor }"
                          style="text-decoration: none;"
                          @click.stop
                      >
                        region
                      <v-icon size="1rem"
                              :color="primaryInv"
                      >
                        mdi-open-in-new
                      </v-icon>
                      </a>
                      <p class="caption ma-0">
                        Please refresh the page if you do not see a created region.
                      </p>
                  </div>
                </template>
              </v-autocomplete>
            </v-flex>

            <v-flex xs12 tag="label" class="v-label ml-4">
              ROLES
            </v-flex>
            <v-flex xs12 class="ml-3">
              <v-checkbox hide-details
                          label="Administrator"
                          v-model="permissions.admin.is"
                          class="ma-0 pa-0"
                          :error="checkPerm"
                          :color="primary"
                          :disabled="permissions.manager.is"
              ></v-checkbox>
              <v-checkbox hide-details
                          label="Regional Manager"
                          v-model="permissions.manager.is"
                          class="ma-0 pa-0"
                          :error="checkPerm"
                          :color="primary"
                          :disabled="permissions.admin.is"
              ></v-checkbox>
              <v-checkbox persistent-hint
                          label="Coach"
                          v-model="permissions.coach.is"
                          class="ma-0 pa-0"
                          hint="These can be changed later by any Administrator"
                          :error-messages="permError"
                          :color="primary"
              ></v-checkbox>
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
                      :disabled="!valid || loading || checkPerm || checkPerm === undefined"
                      :loading="loading"
                      @click.stop.prevent="createUser"
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
  props: ['value', 'dark'],
  data() {
    return {
      user: {
        email: '',
        region: '',
        name: {
          first: '',
          last: '',
        },
      },
      permissions: {
        coach: {
          is: false,
        },
        manager: {
          is: false,
        },
        admin: {
          is: false,
        },
      },
      search: undefined,
      checkPerm: undefined,
      permError: undefined,
      alert: false,
      error: '',
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid email address';
        },
        name: (value) => {
          const pattern = /^[a-z ,.'-]+$/i;
          return pattern.test(value) || 'Name must only contain letters';
        },
      },
    };
  },
  watch: {
    search(val) {
      // eslint-disable-next-line
      val = val || '';
      if (!this.listRegions.includes(val)) {
        this.findRegionsInStore({
          query: {
            name: {
              $gte: val,
            },
            $select: ['name'],
          },
        });
      }
    },
    permissions: {
      handler(val) {
        const admin = val.admin.is;
        const manager = val.manager.is;
        const coach = val.coach.is;

        if (!(manager || admin || coach)) {
          this.checkPerm = true;
          this.permError = 'This field is required';
        } else {
          this.checkPerm = false;
          this.permError = undefined;
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState('admin', { createAdmin: 'isCreatePending' }),
    ...mapState('manager', { createManager: 'isCreatePending' }),
    ...mapState('coach', { createCoach: 'isCreatePending' }),
    ...mapState('regions', { loadRegions: 'isFindPending' }),
    ...mapGetters('regions', { listRegions: 'list' }),
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    loading() {
      return this.createAdmin || this.createManager || this.createCoach;
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
      return this.dark ? '#272727' : '#ebebeb';
    },
  },
  methods: {
    ...mapActions('regions', { findRegionsInStore: 'find' }),
    async createUser() {
      if (this.valid) {
        const tempUser = {
          ...this.user,
          ...this.permissions,
        };

        let user;
        if (tempUser.admin.is) {
          const { Admin } = this.$FeathersVuex;
          user = new Admin(tempUser);
        } else if (tempUser.manager.is) {
          const { Manager } = this.$FeathersVuex;
          user = new Manager(tempUser);
        } else {
          const { Coach } = this.$FeathersVuex;
          user = new Coach(tempUser);
        }

        await user.create()
          .then(() => this.$emit('input'))
          .catch((err) => {
            this.error = err.message.charAt(0).toUpperCase().concat(err.message.slice(1));
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
.v-input--v-checkbox >>> .v-input__slot {
  margin: 0 !important;
}
.first-name >>> .v-input__slot {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.last-name >>> .v-input__slot {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>

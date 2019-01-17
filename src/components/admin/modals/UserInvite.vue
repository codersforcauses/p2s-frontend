<template>
  <v-dialog scrollable
            max-width=520
            v-model="showDialog"
            transition="dialog-transition"
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
                class="px-2 pt-2"
                @keyup.native.enter="valid && createUser($event)"
        >
          <label class="v-label ml-4">
            EMAIL
          </label>
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

          <label class="v-label ml-4">
            PRIMARY ROLE
          </label>
          <v-select solo-inverted
                    flat
                    persistent-hint
                    type="text"
                    hint="This can be changed later by any admin"
                    class="mb-2 mt-1 select__flat"
                    v-model.trim="user.permission"
                    :items="['Coach', 'Regional Manager', 'Administrator']"
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
          </v-select>

          <label class="v-label ml-4">
            SECONDARY ROLE (Optional)
          </label>
          <v-select solo-inverted
                    flat
                    persistent-hint
                    type="text"
                    hint="Add another role to the user if they have one"
                    class="mb-2 mt-1 select__flat"
                    v-model.trim="user.permission"
                    :items="['Coach', 'Regional Manager', 'Administrator']"
                    :color="primary"
                    :disabled="loading"
                    :menu-props="{
                      offsetY: true,
                      light: dark,
                      dark: !dark,
                      transition: 'slide-y-transition',
                    }"
          >
          </v-select>

          <label class="v-label ml-4">
            ASSIGN REGION
          </label>
          <v-autocomplete solo-inverted
                          flat
                          persistent-hint
                          cache-items
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
                  :light="dark"
                  :dark="!dark"
                  :color="primary"
                  :disabled="!valid || loading"
                  :loading="loading"
                  @click.stop.prevent="createUser"
          >
            Send Invite
          </v-btn>
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
      },
    };
  },
  watch: {
    search(val) {
      val = val || ''; // eslint-disable-line
      if (!this.listRegions.includes(val)) {
        this.findRegionsInStore({
          query: {
            name: {
              $gte: val,
            },
            $select: ['id', 'name'],
          },
        });
      }
    },
  },
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
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
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
    primaryInv() {
      return !this.dark ? 'darkPrimary' : 'lightPrimary';
    },
    primaryColor() {
      return !this.dark ? 'var(--v-darkPrimary-base)' : 'var(--v-lightPrimary-base)';
    },
  },
  methods: {
    ...mapActions('regions', { findRegionsInStore: 'find' }),
    async createUser() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
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
</style>

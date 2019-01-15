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

      <v-card-text class="pa-4 pt-5">
        <v-form v-model="valid"
                class="px-2"
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
            ASSIGN REGION
          </label>
          <v-select solo-inverted
                    flat
                    persistent-hint
                    type="email"
                    hint="Important for coaches and regional managers"
                    class="mb-2 mt-1"
                    :items="[]"
                    :color="primary"
                    :disabled="loading"
                    :rules="[validation.required]"
                    v-model.trim="user.region"
                    @focus="isFocused.region = true"
                    @blur="isFocused.region = false"
          >
          </v-select>

          <label class="v-label ml-4">
            PRIMARY ROLE
          </label>
          <v-select solo-inverted
                    flat
                    persistent-hint
                    type="email"
                    hint="Important for coaches and regional managers"
                    class="mb-2 mt-1 selectFlat"
                    menu-props="offsetY, light"
                    :items="['Coach', 'Regional Manager', 'Administrator']"
                    :color="primary"
                    :disabled="loading"
                    :rules="[validation.required]"
                    v-model.trim="user.permission"
          >
          </v-select>

          <pre>
            {{isFocused}}
          </pre>

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
import { mapState } from 'vuex';

export default {
  props: ['value', 'dark'],
  data() {
    return {
      user: {
        email: '',
        region: '',
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
      },
      isFocused: {
        region: false,
        role: false,
      },
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
  computed: {
    ...mapState('auth', { loading: 'isCreatePending' }),
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
  },
  methods: {
    async createUser() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        await user.create()
          .then(() => {
            this.$emit('input');
          })
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
  margin: 1rem 0;
  min-width: calc(100% - 20vw);
  z-index: auto;
}
.v-card {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

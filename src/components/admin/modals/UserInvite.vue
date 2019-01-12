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
          <label class="v-label ml-4">
            EMAIL
          </label>
          <v-text-field solo-inverted
                        flat
                        persistent-hint
                        type="email"
                        hint="Enter the user's email address"
                        class="mb-2"
                        :color="primary"
                        :rules="[validation.required, validation.email]"
                        v-model.trim="user.email"
          >
          </v-text-field>

          <label class="v-label ml-4">
            REGION
          </label>
          <v-text-field solo-inverted
                        flat
                        persistent-hint
                        type="email"
                        hint="Important for coaches and regional managers"
                        class="mb-3"
                        :color="primary"
                        v-model.trim="user.email"
          >
          </v-text-field>

          <div class="ml-4 mb-3">
            <label class="v-label mb-2">
              PERMISSIONS
            </label>
            <v-checkbox hide-details
                        label="Coach"
                        class="ma-0"
                        :color="primary"
                        v-model="user.permissions.coach.is"
            ></v-checkbox>
            <v-checkbox hide-details
                        label="Regional Manager"
                        class="ma-0"
                        :color="primary"
                        v-model="user.permissions.manager.is"
            ></v-checkbox>
            <v-checkbox hide-details
                        label="Administrator"
                        class="ma-0"
                        :color="primary"
                        v-model="user.permissions.admin.is"
            ></v-checkbox>
          </div>

          <v-btn  depressed
                  round
                  :light="dark"
                  :dark="!dark"
                  :color="primary"
                  class="ma-0"
                  style="float: right"
                  @click.stop.prevent=""
          >
            Send Invite
          </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['value', 'dark'],
  data() {
    return {
      user: {
        email: '',
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
        region: '',
      },
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
};
</script>

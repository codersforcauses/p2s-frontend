<template>
  <v-layout fill-height row>
    <v-flex :class="$vuetify.breakpoint.mdAndUp ? 'xs6 offset-xs3' : 'xs12'">
      <v-card class="pa-2">
        <v-alert  dismissible
                  v-model="alert"
                  type="error"
                  name="alert"
        >
          Error: {{ error }}
        </v-alert>
        <v-layout row wrap>
          <!-- Name -->
          <v-flex xs12
                  tag="label"
                  class="v-label ml-4"
          >
            NAME
          </v-flex>
          <v-flex xs6 style="padding-right: 1px;">
            <v-text-field v-model="user.name.first"
                          solo-inverted
                          flat
                          persistent-hint
                          hint="First Name"
                          type="text"
                          class="first-name ml-2"
                          :disabled="disable"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs6 style="padding-left: 1px;">
            <v-text-field v-model="user.name.last"
                          solo-inverted
                          flat
                          persistent-hint
                          hint="Last Name"
                          type="text"
                          class="last-name mr-2"
                          :disabled="disable"
            >
            </v-text-field>
          </v-flex>
          <!-- Email -->
          <v-flex xs12
                  tag="label"
                  class="v-label ml-4"
          >
            EMAIL
          </v-flex>
          <v-flex xs12 style="padding: 10px;">
            <v-text-field
                          solo-inverted
                          flat
                          type="text"
                          class="ml-2 mr-2"
                          :disabled="disable"
            >
            </v-text-field>
          </v-flex>
          <!-- Mobile -->
          <v-flex xs12
                  tag="label"
                  class="v-label ml-4"
          >
            MOBILE
          </v-flex>
          <v-flex xs12 style="padding: 10px;">
            <v-text-field
                          solo-inverted
                          flat
                          type="text"
                          class="ml-2 mr-2"
                          :disabled="disable"
            >
            </v-text-field>
          </v-flex>
          <!-- Qualifications -->
          <v-flex xs12
                  tag="label"
                  class="v-label ml-4"
          >
            QUALIFICATIONS
          </v-flex>
          <v-flex xs12 class="pa-0">
            <v-alert outline :value="!disable" type="warning" transistion="y-slide-transition">
              Please contact an admin to verify your qualifications.
            </v-alert>
          </v-flex>
          <v-flex xs12 style="padding: 10px;">
            <v-text-field solo-inverted
                          flat
                          persistent-hint
                          :hint="user.coach.qualifications.policeClearance.verified ?
                            'Verified' : 'Not Verified'"
                          :value="$vuetify.breakpoint.mdAndUp ? 'Police Clearance' : 'POL'"
                          type="text"
                          class="ml-2 mr-2"
                          disabled
                          :append-icon="user.coach.qualifications.policeClearance.verified ?
                            'mdi-shield' : 'mdi-exclamation'"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs12 style="padding: 10px;">
            <v-text-field solo-inverted
                          flat
                          persistent-hint
                          :hint="user.coach.qualifications.WWC.verified ?
                            'Verified' : 'Not Verified'"
                          :value="$vuetify.breakpoint.mdAndUp ?
                            'Working With Children Check' : 'WWC'"
                          type="text"
                          class="ml-2 mr-2"
                          disabled
                          :append-icon="user.coach.qualifications.WWC.verified ?
                            'mdi-baby-carriage' : 'mdi-exclamation'"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs12 style="padding: 10px;">
            <v-text-field solo-inverted
                          flat
                          persistent-hint
                          :hint="user.coach.qualifications.medClearance.verified ?
                            'Verified' : 'Not Verified'"
                          :value="$vuetify.breakpoint.mdAndUp ? 'Medical Clearance' : 'MED'"
                          type="text"
                          class="ml-2 mr-2"
                          disabled
                          :append-icon="user.coach.qualifications.medClearance.verified ?
                            'mdi-medical-bag' : 'mdi-exclamation'"
            >
            </v-text-field>
          </v-flex>
          <!-- Change password button -->
          <v-flex xs12 style="padding: 10px;">
            <v-btn
              round
              depressed
              flat
              :color="primary"
            >
            Change Password
            </v-btn>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-btn  class="mt-3"
                  round
                  depressed
                  flat
                  :light="!dark"
                  :dark="dark"
                  :color="primary"
                  @click="disable = !disable"
          >
          {{ btnName }}
          </v-btn>
          <v-spacer/>
          <v-btn  v-show="!disable"
                  class="mt-3"
                  round
                  depressed
                  :light="!dark"
                  :dark="dark"
                  :color="primary"
                  @click="disable = false; passwordDialog = true;"
          >
            save changes
          </v-btn>
        </v-card-actions>
      </v-card>
      <pass-auth v-model="passwordDialog" v-bind="{ dark }" @pass-auth="emitTest=true"/>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data() {
    return {
      user: {
        _id: '',
        name: {
          first: '',
          last: '',
        },
        email: '',
        mobile: '',
        gender: '',
        ethnicity: '',
        region: '',
        coach: {
          qualifications: {
            policeClearance: {
              verified: false,
            },
            WWC: {
              verified: false,
            },
            medClearance: {
              verified: false,
            },
          },
        },
      },
      passwordDialog: false,
      disable: true,
      alert: undefined,
      error: '',
      valid: true,
      emitTest: false,
    };
  },
  computed: {
    btnName() {
      return this.disable ? 'edit' : 'cancel';
    },
    dark() {
      return this.$store.getters['users/current'].darktheme;
    },
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },

  methods: {
    current() {
      this.user = this.$store.auth.user;
    },
  },
  mounted() {
    console.log(this.$store.getters['users/current']);
    this.user = this.$store.getters['users/current'];
  },
};
</script>

<style scoped>
.first-name >>> .v-input__slot {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.last-name >>> .v-input__slot {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>

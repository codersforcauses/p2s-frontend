<template>
  <v-card width="100%" class="pa-2">
    <v-alert
    dismissible
    v-model="alert"
    type="error"
    name="alert"
    >
      Error: {{ error }}
    </v-alert>
  <v-layout row wrap>
    <v-flex xs12 class="pb-0">
      <v-btn 
        style="float: right;"
        class="mb-0"
        round
        flat 
        small
        :light="!dark" 
        :dark="dark" 
        :color="primary"
        @click="disable = !disable"
        >
          edit
      </v-btn>
    </v-flex>
    <v-flex 
      xs12 
      tag="label"
      class="v-label ml-4 pt-0"
      >
        NAME
      </v-flex>
        <v-flex xs6 style="padding-right: 1px;">
          <v-text-field
          v-model="user.name.first"
          solo-inverted
          flat
          persistent-hint
          hint="First Name"
          type="text"
          class="first-name ml-2"
          :disabled= disable
          >
          </v-text-field>
        </v-flex>
        <v-flex xs6 style="padding-left: 1px;">
          <v-text-field
          v-model="user.name.last"
          solo-inverted
          flat
          persistent-hint
          hint="Last Name"
          type="text"
          class="last-name mr-2"
          :disabled= disable
          >
          </v-text-field>
        </v-flex>
  </v-layout>
    </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        _id: '',
        email: '',
        name: {
          first: '',
          last: '',
        },
        gender: '',
        ethnicity: '',
        dark: false,
        region: '',
        coach: {
          qualifications: {
            policeClearance: '',
            WWC: '',
            medClearance: '',
          },
        },
      },
      disable: true,
      alert: undefined,
      error: '',
    };
  },
  computed: {
    dark() {
      return this.$store.getters['users/current'].darktheme;
    },
    primary() {
      console.log(this.dark);
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
  methods: {
    current() {
      this.user = this.$store.auth.user;
      return this.$store.getters['users/current'];
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

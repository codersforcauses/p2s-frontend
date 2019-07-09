<template>
  <div>
    <v-alert
    dismissible
    v-model="alert"
    type="error"
    name="alert"
    >
      Error: {{ error }}
    </v-alert>
    <v-card class="pa-2">
      <v-flex
      xs12
      tag="label"
      class="v-label ml-4"
      >
        NAME
      </v-flex>
      <v-layout row-wrap>
        <v-flex xs6 style="padding-right: 1px;">
          <v-text-field
          v-model="user.name.first"
          solo-inverted
          flat
          persistent-hint
          hint="First Name"
          type="text"
          class="first-name ml-2"
          readonly
          :append-icon="'mdi-pencil'"
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
          readonly
          :append-icon="'mdi-pencil'"
          >
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        _id: '',
        email: '',
        name: {
          first: 'test',
          last: 'monkey',
        },
        gender: 'telecommunications network satelite',
        ethnicity: '',
        region: '',
        coach: {
          qualifications: {
            policeClearance: '',
            WWC: '',
            medClearance: '',
          },
        },
      },
      changeFirst: false,
      changeLast: false,
      alert: undefined,
      error: '',
      methods: {
        current() {
          this.user = this.$store.auth.user;
          return this.$store.getters['users/current'];
        },
      },
      mounted() {
        console.log(this.$store.getters['users/current']);
      },
    };
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

<template>
  <div>
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
        <v-flex 
        xs12 
        tag="label"
        class="v-label ml-4"
        >
          NAME {{ password }}
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
    <v-btn 
    class="mt-3"
    round
    outline
    flat 
    :light="!dark" 
    :dark="dark" 
    :color="primary"
    @click="disable = !disable; dialog = true;"
    >
      edit
    </v-btn>
    <v-btn 
    class="mt-3"
    style='float: right;'
    round
    outline
    flat 
    :light="!dark" 
    :dark="dark" 
    :color="primary"
    @click="login"
    >
      save changes
    </v-btn>
    <PasswordAuth></PasswordAuth>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PasswordAuth from '@/components/PasswordAuth.vue';

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
      dialog: false,
      disable: true,
      alert: undefined,
      error: '',
      valid: true,
    };
  },
  props: {
    password: {
      type: String,
    },
  },
  components: {
    PasswordAuth,
  },
  computed: {
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
      return this.$store.getters['users/current'];
    },
    ...mapActions('auth', ['authenticate']),
    async login() {
      if (this.valid) {
        await this.authenticate({
          strategy: 'local',
          ...this.user,
        }).then(async () => {
          // logged in
          console.log('Successfully authenticated!');
        }).catch(async (e) => {
          // Error on page
          this.alert = true;
          this.error = e.message;
        });
      }
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

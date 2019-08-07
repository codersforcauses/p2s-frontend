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
          NAME {{ emitTest }}
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
      <v-card-actions>
        <v-btn
        class="mt-3"
        round
        depressed
        :light="!dark" 
        :dark="dark" 
        :color="primary"
        @click="disable = !disable"
        >
         {{ btnName }}
        </v-btn>
        <v-spacer/>
        <v-btn 
        v-show="!disable"
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
        region: '',
        coach: {
          qualifications: {
            policeClearance: '',
            WWC: '',
            medClearance: '',
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
  components: {
    'pass-auth': () => ({
      component: import('./PasswordAuth.vue'),
    }),
  },
  computed: {
    btnName() {
      if(this.disable) {
        return 'EDIT';
      } else {
        return 'CANCEL';
      }
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

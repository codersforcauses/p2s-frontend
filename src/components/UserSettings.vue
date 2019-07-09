<template>
  <v-container grid-list-xs test-xs-center>
    <v-layout row wrap>
      <v-alert
      dismissible
      v-model="alert"
      type="error"
      name="alert"
      >
        Error: {{ error }}
      </v-alert>
      <v-dialog
      v-model="dialog"
      width="500"
      >
      <v-card>
        <v-card-text>
          fuck
        </v-card-text>
        <v-spacer/>
        <v-btn  flat
          small
          round
          name="forgotPass"
          class="btn"
          color="#888"
        >
          Confirm
        </v-btn>
      </v-card>
      </v-dialog>
      <v-flex xs12>
        <v-card>
                <pre>
        {{currentUser}}
      </pre>
          <v-card-text>
            <v-flex
            xs12
            tag="label"
            class="v-label ml-4"
            >
              NAME
            </v-flex>
            <v-layout row-wrap>
              <v-flex xs12 style="padding-right: 1px;">
                <v-text-field
                v-model.trim="user.name.first"
                solo-inverted
                flat
                persistent-hint
                hint="First Name"
                type="text"
                class="first-name ml-2"
                readonly
                :append-icon="'mdi-pencil'"
                @click:append="
                editUser.name.first.change = !editUser.name.first.change;
                editUser.name.last.change = false;"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 style="padding-left: 1px;">
                <v-text-field
                v-model.trim="user.name.last"
                solo-inverted
                flat
                persistent-hint
                hint="Last Name"
                type="text"
                class="last-name"
                readonly
                :append-icon="'mdi-pencil'"
                @click:append="
                editUser.name.last.change = !editUser.name.last.change;
                editUser.name.first.change = false;"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-expand-transition>
              <div v-show="editUser.name.first.change">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE FIRST NAME
                </v-flex>
                <div class="mt-2">
                  <v-text-field
                  v-model="editUser.name.first.changeTo"
                    class="ml-2 mr-2"
                    hint="Enter new First Name"
                    persistent-hint
                    single-line
                    solo-inverted
                    flat
                  >
                  </v-text-field>
                  <v-btn
                  class="ml-4"
                    round
                    color="error"
                    depressed
                    @click="dialog = true"
                    :disabled="!editUser.name.first.validName ||
                    editUser.name.first.changeTo === ''"
                  >
                  Update</v-btn>
                </div>
              </div>
            </v-expand-transition>
            <v-form
            v-model="editUser.name.last.validName"
            lazy-validation
            >
              <v-expand-transition>
                <div v-show="editUser.name.last.change">
                  <v-flex
                  xs12
                  tag="label"
                  class="v-label ml-4"
                  >
                    CHANGE LAST NAME
                  </v-flex>
                  <div class="mt-2">
                    <v-text-field
                    v-model="editUser.name.last.changeTo"
                    class="ml-2 mr-2"
                    hint="Enter new Last Name"
                    persistent-hint
                    single-line
                    solo-inverted
                    flat
                    :rules="[validation.required, validation.name]"
                    >
                    </v-text-field>
                    <v-btn
                    class="ml-4"
                    round
                    color="error"
                    depressed
                    @click="dialog = true"
                    :disabled="!editUser.name.last.validName ||
                    editUser.name.last.changeTo === ''"
                    >
                    Update</v-btn>
                  </div>
                </div>
              </v-expand-transition>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      alert: undefined,
      error: '',
      valid: false,
      dialog: false,
      user: {
        _id: '',
        password: '',
        name: {
          first: '',
          last: '',
        },
        mobile: '',
        emergencyContact: {
          name: '',
          phoneNumber: '',
        },
        gender: '',
        ethnicity: '',
        coach: {
          qualifications: {
            policeClearance: '',
            WWC: '',
            medClearance: '',
          },
        },
      },
      editUser: {
        name: {
          first: {
            change: false,
            changeTo: '',
            validName: false,
            testPassword: '',
            validPassword: false,
          },
          last: {
            change: false,
            changeTo: '',
            validName: false,
            testPassword: '',
            validPassword: false,
          },
        },
      },
      validation: {
        required: value => !!value || 'Required',
        name: value => /^([a-zA-Z ]){2,30}$/.test(value) || 'Invalid name',
      },
      // mounted() {
      //   this.showCurrent();
      // },
      computed: {
        currentUser() {
          return this.$store.getters['users/current'];
        },
      },
      methods: {
        ...mapActions('auth', ['authenticate']),
        async verifyPassword() {
          await this.authenticate({
            strategy: 'local',
            email: this.user.email,
            password: this.editUser.name.first.testPassword,
          }).then(async () => {
            // logged in
            this.user.name.first = 'test';
          }).catch(async (e) => {
            // Error on page
            this.alert = true;
            this.error = e.message;
          });
        },
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

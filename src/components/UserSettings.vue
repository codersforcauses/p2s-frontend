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
      <v-flex xs12>
        <v-card>
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
            <v-form
            v-model="editUser.name.first.validName"
            lazy-validation
            >
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
                    :rules="[validation.required, validation.name]"
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
            </v-form>
              <v-dialog
              v-model="dialog"
              width="500"
              >
                <v-card>
                  <v-form
                  v-model="editUser.name.first.validPassword"
                  lazy-validation
                  >
                    <v-card-title
                    class="ml-2"
                    >
                      Password Required
                    </v-card-title>
                    <v-card-text>
                      <v-text-field
                      v-model="editUser.name.first.testPassword"
                      hide-details
                      solo-inverted
                      flat
                      type="text"
                      class="ml-2"
                      hint="Password"
                      persistent-hint
                      :rules="[validation.required, validation.password]"
                      >
                      </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer/>
                      <v-btn
                      color="error"
                      round
                      depressed
                      class="mb-2 mr-2"
                      @click="dialog = false;"
                      :disabled ="
                      !editUser.name.first.validPassword ||
                      editUser.name.first.testPassword === ''"
                      >
                      Confirm
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
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
                  >
                  </v-text-field>
                  <v-text-field
                  class="ml-2 mr-2"
                  hint="Confirm new Last Name"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                </div>
                <v-btn
                class="ml-4"
                round
                color="error"
                depressed
                @click="
                editUser.name.last.changeValid = true;
                user.name.last = editUser.name.last.changeTo;"
                >
                Update</v-btn>
                <v-alert
                :value="editUser.name.last.changeValid"
                type="success"
                >
                Deck me
                </v-alert>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-flex
            xs12
            tag="label"
            class="v-label ml-4"
            >
              EMAIL
            </v-flex>
            <v-flex>
              <v-text-field
              v-model="user.email"
              readonly
              single-line
              solo-inverted
              hide-details
              flat
              :append-icon="'mdi-pencil'"
              @click:append="editUser.email.change = !editUser.email.change"
              >
              </v-text-field>
            </v-flex>
            <v-expand-transition>
              <div v-show="editUser.email.change">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE EMAIL
                </v-flex>
                <div class="mt-2">
                  <v-text-field
                  v-model="editUser.email.changeTo"
                  class="ml-2 mr-2"
                  hint="Enter new Email"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  :rules="[validation.required, validation.email]"
                  >
                  </v-text-field>
                  <v-text-field
                  v-model="editUser.email.changeToCon"
                  class="ml-2 mr-2"
                  hint="Confirm new Email"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  :rules="[validation.required, validation.email, validation.testEmail]"
                  >
                  </v-text-field>
                </div>
                <v-btn
                class="ml-4"
                round
                color="error"
                depressed
                @click="
                editUser.email.changeValid = true;
                user.email = editUser.email.changeTo;"
                >
                Update</v-btn>
                <v-alert
                :value="editUser.email.changeValid"
                type="success"
                >
                Deck me
                </v-alert>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-flex
            xs12
            tag="label"
            class="v-label ml-4"
            >
              MOBILE
            </v-flex>
            <v-flex>
              <v-text-field
              v-model="user.mobile"
              readonly
              single-line
              solo-inverted
              hide-details
              flat
              :append-icon="'mdi-pencil'"
              @click:append="editUser.mobile.change = !editUser.mobile.change"
              >
              </v-text-field>
            </v-flex>
            <v-expand-transition>
              <div v-show="editUser.mobile.change">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE MOBILE
                </v-flex>
                <div class="mt-2">
                  <v-text-field
                  v-model="editUser.mobile.changeTo"
                  class="ml-2 mr-2"
                  hint="Enter new Mobile"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                  <v-text-field
                  class="ml-2 mr-2"
                  hint="Confirm new Mobile"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                </div>
                <v-btn
                class="ml-4"
                round
                color="error"
                depressed
                @click="
                editUser.mobile.changeValid = true;
                user.mobile = editUser.mobile.changeTo;"
                >
                Update</v-btn>
                <v-alert
                :value="editUser.mobile.changeValid"
                type="success"
                >
                Deck me
                </v-alert>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-flex
            xs12
            tag="label"
            class="v-label ml-4"
            >
              GENDER
            </v-flex>
            <v-flex>
              <v-text-field
              v-model="user.gender"
              readonly
              single-line
              solo-inverted
              hide-details
              flat
              :append-icon="'mdi-pencil'"
              @click:append="editUser.gender.change = !editUser.gender.change"
              >
              </v-text-field>
            </v-flex>
            <v-expand-transition>
              <div v-show="editUser.gender.change">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE GENDER
                </v-flex>
                <div class="mt-2">
                  <v-text-field
                  v-model="editUser.gender.changeTo"
                  class="ml-2 mr-2"
                  hint="Enter new Gender (Male, Female or Other)"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                  <v-text-field
                  class="ml-2 mr-2"
                  hint="Confirm new Gender"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                </div>
                <v-btn
                class="ml-4"
                round
                color="error"
                depressed
                @click="
                editUser.gender.changeValid = true;
                user.gender = editUser.gender.changeTo;"
                >
                Update</v-btn>
                <v-alert
                :value="editUser.gender.changeValid"
                type="success"
                >
                Deck me
                </v-alert>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card>
          <v-card-text>
            <v-flex
            xs12
            tag="label"
            class="v-label ml-4"
            >
              EMERGENCY CONTACT
            </v-flex>
            <v-layout row-wrap>
              <v-flex xs12 style="padding-right: 1px;">
                <v-text-field
                v-model.trim="user.emergencyContact.name"
                solo-inverted
                flat
                persistent-hint
                hint="Name"
                type="text"
                class="first-name ml-2"
                readonly
                :append-icon="'mdi-pencil'"
                @click:append="
                editUser.emergencyContact.name.change = !editUser.emergencyContact.name.change;
                editUser.emergencyContact.mobile.change = false;"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 style="padding-left: 1px;">
                <v-text-field
                v-model.trim="user.emergencyContact.mobile"
                solo-inverted
                flat
                persistent-hint
                hint="Mobile"
                type="text"
                class="last-name"
                readonly
                :append-icon="'mdi-pencil'"
                @click:append="
                editUser.emergencyContact.mobile.change = !editUser.emergencyContact.mobile.change;
                editUser.emergencyContact.name.change = false;"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-expand-transition>
              <div v-show="editUser.emergencyContact.name.change">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE EMERGENCY CONTACT NAME
                </v-flex>
                <div class="mt-2">
                  <v-text-field
                  v-model="editUser.emergencyContact.name.changeTo"
                  class="ml-2 mr-2"
                  hint="Enter new Name"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                  <v-text-field
                  class="ml-2 mr-2"
                  hint="Confirm new Name"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                </div>
                <v-btn
                class="ml-4"
                round
                color="error"
                depressed
                @click="
                editUser.emergencyContact.name.changeValid = true;
                user.emergencyContact.name = editUser.emergencyContact.name.changeTo;"
                >
                Update</v-btn>
                <v-alert
                :value="editUser.emergencyContact.name.changeValid"
                type="success"
                >
                Deck me
                </v-alert>
              </div>
            </v-expand-transition>
            <v-expand-transition>
              <div v-show="editUser.emergencyContact.mobile.change">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE EMERGENCY CONTACT MOBILE
                </v-flex>
                <div class="mt-2">
                  <v-text-field
                  v-model="editUser.emergencyContact.mobile.changeTo"
                  class="ml-2 mr-2"
                  hint="Enter new Emergency Contact Mobile"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                  <v-text-field
                  class="ml-2 mr-2"
                  hint="Confirm new Emergency Contact Mobile"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                </div>
                <v-btn
                class="ml-4"
                round
                color="error"
                depressed
                @click="
                editUser.emergencyContact.mobile.changeValid = true;
                user.emergencyContact.mobile = editUser.emergencyContact.mobile.changeTo;"
                >
                Update</v-btn>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-flex
            xs12
            tag="label"
            class="v-label ml-4"
            >
              QUALIFICATIONS
            </v-flex>
            <v-layout row wrap>
              <v-flex xs4 style="padding-right: 1px;">
                <v-text-field
                :value="$vuetify.breakpoint.smAndUp"
                readonly
                solo-inverted
                hide-details
                flat
                class="first-name ml-2"
                prepend-inner-icon="mdi-pig"
                append-icon="mdi-check"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs4 style="padding-right: 1px; padding-left: 1px;">
                <v-text-field
                value="Working With Children's Card"
                solo-inverted
                flat
                class="first-name last-name"
                readonly
                >
                </v-text-field>
              </v-flex>
              <v-flex xs4 style="padding-left: 1px;">
                <v-text-field
                value="Medical Clearance"
                solo-inverted
                flat
                class="last-name mr-2"
                readonly
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data(vm) {
    return {
      alert: undefined,
      error: '',
      dialog: false,
      user: {
        name: {
          first: 'jeff',
          last: 'demo',
        },
        password: 'test',
        email: 'test@gmail.com ',
        mobile: '0429278787',
        emergencyContact: {
          name: 'Jeffs mum',
          mobile: '041928479',
        },
        gender: 'dinosaur',
        qualifications: {
          policeClearance: true,
          wwc: true,
          medClearance: false,
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
            changeValid: false,
          },
        },
        email: {
          change: false,
          changeTo: '',
          changeToCon: '',
          changeValid: false,
        },
        mobile: {
          change: false,
          chnageTo: '',
          changeValid: false,
        },
        gender: {
          change: false,
        },
        emergencyContact: {
          name: {
            change: false,
            changeTo: '',
            changValid: false,
          },
          mobile: {
            change: false,
            changeTo: '',
            changValid: false,
          },
        },
      },
      validation: {
        required: value => !!value || 'Required',
        name: (value) => {
          const pattern = /^([a-zA-Z ]){2,30}$/;
          return pattern.test(value) || 'Invalid name';
        },
        password: (value) => {
          const pattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8}$/;
          return pattern.test(value) || 'Invalid password';
        },
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid email address';
        },
        testEmail: value => value === vm.editUser.email.changeTo || 'Emails are not the same',
      },
      methods: {
        ...mapActions('auth', ['authenticate']),
        async verifyPassword() {
          if (this.valid) {
            await this.authenticate({
              strategy: 'local',
              ...this.user,
            }).then(async () => {
              // logged in
              this.$router.push({ name: 'dashboard' });
            }).catch(async (e) => {
              // Error on page
              this.alert = true;
              this.error = e.message;
            });
          }
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

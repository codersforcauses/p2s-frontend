<template>
  <div>
    <v-alert  dismissible
              v-model="alert"
              type="error"
              name="alert"
              :class="alertClass"
              transition="slide-y-transition"
    >
      {{error}}
    </v-alert>
    <v-card flat full-width>
      <v-card-title class="title font-weight-regular justify-space-between">
        <span> {{currentTitle}} </span>
        <div v-show="step < 5">
          <span class="caption"> step </span>
          <v-avatar :color="primary"
                    class="subheading"
                    size=24
          >
            <span :class="text">
              {{step}}
            </span>
          </v-avatar>
        </div>
      </v-card-title>

      <v-window touchless v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-form v-model="valid1"
                    class="pt-2"
                    @keyup.native.enter="nextStep"
            >
              <v-menu lazy
                      full-width
                      nudge-left=20
                      nudge-bottom=37
                      min-width=288
                      ref="menu"
                      transition="slide-y-transition"
                      origin="bottom left"
                      v-model="menu"
                      :light= dark
                      :dark= !dark
                      :close-on-content-click="false"
              >
                <template v-slot:activator="{ on }">
                  <label class="v-label ml-4">
                    DATE OF BIRTH
                  </label>
                  <v-text-field solo-inverted
                                flat
                                single-line
                                readonly
                                persistent-hint
                                v-model.trim="user.DOB"
                                hint="Enter your date of birth"
                                class="mb-2 mt-1 select__flat"
                                v-on="on"
                                :color="primary"
                                :disabled="loading"
                                :rules="[validation.required]"
                  ></v-text-field>
                </template>
                <v-date-picker  reactive
                                full-width
                                ref="picker"
                                style="min-width: 288px"
                                v-model="user.DOB"
                                :color="primary"
                                :max="new Date().toISOString().substr(0, 10)"
                                min="1950-01-01"
                                @change="save"
                ></v-date-picker>
              </v-menu>

              <label class="v-label ml-4">
                ETHNICITY
              </label>
              <v-select solo-inverted
                        flat
                        single-line
                        persistent-hint
                        class="mb-2 mt-1 select__flat"
                        v-model.trim="user.ethnicity"
                        hint="Enter your mobile number"
                        :color="primary"
                        :disabled="loading"
                        :rules="[validation.required]"
                        :items="ethnicity"
                        :menu-props="{
                                offsetY: true,
                                light: dark,
                                dark: !dark,
                                transition: 'slide-y-transition',
                              }"
              ></v-select>

              <label class="v-label ml-4">
                MOBILE NUMBER
              </label>
              <v-text-field solo-inverted
                            flat
                            single-line
                            persistent-hint
                            v-model.number.trim="user.mobile"
                            maxLength="9"
                            type="tel"
                            hint="Enter your mobile number"
                            class="mt-1"
                            :color="primary"
                            :disabled="loading"
                            :rules="[validation.required, validation.phone]"
              >
                <template v-slot:prepend-inner>
                  +61
                </template>
              </v-text-field>

              <label class="v-label ml-4">
                GENDER
              </label>
              <v-radio-group  row
                              persistent-hint
                              hint="Enter your preferred gender"
                              v-model="user.gender"
                              :rules="[validation.required]"
              >
                <v-radio  v-for="n in genders"
                          :key="n"
                          :color="primary"
                          :disabled="loading"
                          :label="n"
                          :value="n"
                ></v-radio>
              </v-radio-group>
            </v-form>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-form v-model="valid2"
                    class="pt-2"
                    @keyup.native.enter="nextStep"
            >
              <label class="v-label ml-4">
                CREATE A PASSWORD
              </label>
              <v-text-field solo-inverted
                            flat
                            single-line
                            persistent-hint
                            v-model.trim="user.password"
                            hint="Enter your password"
                            :color="primary"
                            :disabled="loading"
                            :rules="[
                                      validation.required,
                                      validation.min,
                                      validation.upper,
                                      validation.lower,
                                      validation.digit
                                    ]"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
              ></v-text-field>

              <label class="v-label ml-4">
                CONFIRM PASSWORD
              </label>
              <v-text-field solo-inverted
                            flat
                            single-line
                            persistent-hint
                            v-model.trim="confirmPass"
                            hint="Confirm your password"
                            :color="primary"
                            :disabled="loading"
                            :rules="[validation.required, validation.confirmPass]"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <v-card-text>
            <v-form v-model="valid3"
                    class="pt-2"
                    @keyup.native.enter="nextStep"
            >
              <label class="v-label ml-4">
                NAME
              </label>
              <v-text-field solo-inverted
                            flat
                            single-line
                            persistent-hint
                            v-model.number.trim="user.emergencyContact.name"
                            hint="Enter your emergency contact's name"
                            :color="primary"
                            :disabled="loading"
                            :rules="[validation.required]"
              ></v-text-field>

              <label class="v-label ml-4">
                PHONE NUMBER
              </label>
              <v-text-field solo-inverted
                            flat
                            single-line
                            persistent-hint
                            maxLength=9
                            type="tel"
                            v-model.number.trim="user.emergencyContact.phoneNumber"
                            hint="Enter your emergency contact's phone number"
                            :color="primary"
                            :disabled="loading"
                            :rules="[validation.required, validation.phone]"
              >
                <template v-slot:prepend-inner>
                  +61
                </template>
              </v-text-field>
            </v-form>
          </v-card-text>
        </v-window-item>

       <v-window-item :value="4">
          <v-card-text>
            <p class="body-2 font-weight-light font-italic mb-0">
              **If you are unable to provide any of the required documents at this time,
              you will be able to upload them later in your user settings.**
            </p>
            <v-form v-model="valid4"
                    enctype="multipart/form-data"
                    class="pt-2"
                    @keyup.native.enter="nextStep"
            >
              <v-container grid-list-lg class="px-0 pb-0">
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-file label="POLICE CLEARANCE"
                      v-model="coach.policeClearance.file"
                      :primary="primary"
                    />
                  </v-flex>

                  <v-flex xs6>
                    <v-file label="MEDICAL CLEARANCE"
                      v-model="coach.medClearance.file"
                      :primary="primary"
                    />
                  </v-flex>

                  <v-flex xs6>
                    <v-file label="WWC CHECK"
                            v-model="coach.WWC.file"
                            :primary="primary"
                    />
                  </v-flex>

                  <v-flex xs12 class="py-0">
                    <label class="v-label ml-4">
                      WWC CARD NUMBER
                    </label>
                    <v-text-field solo-inverted
                                  flat
                                  single-line
                                  persistent-hint
                                  v-model.number.trim="coach.WWC.number"
                                  hint="Enter your Working With Children card number"
                                  :color="primary"
                                  :disabled="loading"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="5">
          <v-card-text>
            <v-img contain :src="require('@/assets/p2s-logo.svg')" class="ma-4 mb-5"></v-img>
            Thank you for joining P2S Rugbyworks. Please login to continue.
          </v-card-text>
        </v-window-item>
      </v-window>

      <v-divider :class="{ divider: height }"/>

      <v-card-actions :class="{ action: height }">
        <v-btn  flat
                round
                :disabled="step === 1 || step === 5"
                @click="step--"
        >
          Back
        </v-btn>

        <v-spacer />

        <v-btn  depressed
                round
                :light="dark"
                :dark="!dark"
                :color="primary"
                :loading="loading"
                :disabled="step > 5"
                @click.stop.prevent="nextStep"
        >
          <span v-if="step === 4 || (step === 3 && !coach.is)">
            Submit
          </span>
          <span v-else-if="step <= 3">
            Next
          </span>
          <span v-else>
            Login
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';


export default {
  props: ['dark'],
  components: {
    'v-file': () => ({
      component: import('./FileUpload.vue'),
    }),
  },
  data(vm) {
    return {
      step: 1,
      user: {
        _id: '',
        password: '',
        mobile: '',
        gender: 'Male',
        ethnicity: '',
        DOB: null,
        tempAuth: '',
        emergencyContact: {
          name: '',
          phoneNumber: '',
        },
      },
      coach: {
        is: false,
        policeClearance: {
          is: false,
          file: null,
        },
        WWC: {
          is: false,
          number: '',
          file: null,
        },
        medClearance: {
          is: false,
          file: null,
        },
      },
      confirmPass: '',
      menu: false,
      alert: false,
      error: '',
      valid1: false,
      valid2: false,
      valid3: false,
      valid4: false,
      show: false,
      finished: false,
      validation: {
        required: value => !!value || 'This field is required',
        min: value => value.length >= 8 || 'Must be at least 8 characters',
        upper: value => (/[A-Z]/.test(value)) || 'Must contain at least 1 uppercase letter',
        lower: value => (/[a-z]/.test(value)) || 'Must contain at least 1 lowercase letter',
        digit: value => (/\d/.test(value)) || 'Must contain at least 1 digit',
        confirmPass: value => vm.user.password === value || 'Passwords do not match',
        phone: value => (/\d{9}/.test(value)) || 'Must be exactly 9 digits',
      },
      ethnicity: ['Aboriginal', 'Black', 'Caucasian', 'Asian'],
      genders: ['Male', 'Female', 'Other'],
    };
  },
  mounted() {
    this.findUser({
      query: {
        verifyToken: this.$route.params.slug,
        $select: ['email', 'coach'],
      },
    })
      .then(({ data }) => {
        // eslint-disable-next-line
        this.user._id = data[0]._id;
        this.coach.is = data[0].coach.is;
        this.user.tempAuth = this.$route.params.slug;
      })
      .catch(() => {
        this.alert = true;
        this.error = 'Unable to register account';
      })
      .finally(() => {
        this.finished = true;
      });
  },
  watch: {
    menu(val) {
      // eslint-disable-next-line
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
  },
  computed: {
    ...mapState('users', { patchUsers: 'isPatchPending' }),
    ...mapState('users', { findingUsers: 'isFindPending' }),
    ...mapGetters('users', { findUsersInStore: 'find' }),
    text() {
      return this.primary === 'darkPrimary' ? 'black--text' : 'white--text';
    },
    height() {
      // eslint-disable-next-line
      return this.$vuetify.breakpoint.xsOnly && screen.height >= 650;
    },
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
    currentTitle() {
      switch (this.step) {
        case 1: return 'Personal Details';
        case 2: return 'Password Creation';
        case 3: return 'Emergency Contact';
        case 4: return 'Upload Documents';
        case 5: return 'Registration Complete';
        default: return '';
      }
    },
    loading() {
      return this.patchUser;
    },
    alertClass() {
      return this.$vuetify.breakpoint.smAndDown ? 'alert_small' : 'alert_large';
    },
  },
  methods: {
    ...mapActions('users', { findUser: 'find' }),
    save(date) {
      this.$refs.menu.save(date);
    },
    nextStep() {
      if ((this.step === 1 && this.valid1)
        || (this.step === 2 && this.valid2)
        || (this.step === 3 && this.valid3)) {
        // eslint-disable-next-line
        if (this.step === 3 && !this.coach.is) {
          this.registerUser();
        } else {
          this.step += 1;
        }
      } else if (this.step === 4 && this.valid4) {
        this.registerUser();
      } else if (this.step === 5) {
        this.$router.push({ name: 'login' });
      } else {
        this.alert = true;
        this.error = 'Please fill out all fields to continue.';
      }
      return this.step;
    },
    async registerUser() {
      if (this.valid1 && this.valid2 && this.valid3) {
        const tempUser = {
          ...this.user,
          DOB: new Date(this.user.DOB),
          mobile: `+61${this.user.mobile}`,
          emergencyContact: {
            ...this.user.emergencyContact,
            phoneNumber: `+61${this.user.emergencyContact.phoneNumber}`,
          },
          darktheme: this.dark,
        };

        const { User } = this.$FeathersVuex;
        const user = new User(tempUser);

        await user.patch()
          .then(() => {
            const data = {
              action: 'verifySignupLong',
              value: this.$route.params.slug,
            };
            fetch('http://localhost:3030/authmanagement', {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(() => {
              // eslint-disable-next-line
              this.coach.is ? this.step += 1 : this.step += 2;
            });
          })
          .catch((err) => {
            console.log(err);
            this.alert = true;
            this.error = err;
          });
      }
    },
  },
};
</script>

<style scoped>
.file {
  display: inline-block;
  width: 100%;
  padding: 120px 0 0 0;
  height: 100px;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png') center center no-repeat #e4e4e4;
  border-radius: 20px;
  background-size: 60px 60px;
}
.alert_large {
  border: 0;
  border-radius: 30px;
  font-size: 12pt;
  top: 0;
  left: 10vw;
  margin: 3rem 0 0;
  min-width: calc(100% - 20vw);
  position: absolute;
  z-index: 100;
}
.alert_small {
  border: 0;
  border-radius: 0;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  margin: 0;
  z-index: 10 !important;
}

.list {
  padding: calc(0.5 * var(--thiccness)) var(--thiccness);
}

.action {
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  max-width: 100vw;
  overflow-y: hidden;
}
.divider {
  left: 0;
  right: 0;
  bottom: 56px;
  position: fixed;
  max-width: 100vw;
  overflow-y: hidden;
}

.v-input--selection-controls {
  margin-top: 0;
}
.v-input--radio-group >>> .v-messages__message {
  width: 100%;
  padding-left: 0.75rem;
}
.v-picker__title.v-picker__title--landscape {
  border-bottom-left-radius: 50% !important;
}
.v-picker--date.v-card, .v-select-list.v-card {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
</style>

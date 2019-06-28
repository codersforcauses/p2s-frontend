<template>
  <div>
    <v-alert  dismissible
              v-model="alert"
              type="error"
              name="alert"
              :class="alertClass"
              transition="slide-y-transition"
    >
      Please fill out all fields to continue
    </v-alert>
    <v-card flat full-width>
      <v-card-title class="title font-weight-regular justify-space-between">
        <span> {{currentTitle}} </span>
        <v-avatar color="info"
                  class="subheading black--text"
                  size=24
        >
          {{step}}
        </v-avatar>
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
            <v-img contain :src="require('@/assets/p2s-logo.svg')" class="ma-4 mb-5"></v-img>
            Thank you for joining P2S Rugbyworks. Please login to continue.
          </v-card-text>
        </v-window-item>
      </v-window>

      <v-divider :class="{ divider: height }"/>

      <v-card-actions :class="{ action: height }">
        <v-btn  flat
                round
                :disabled="step === 1 || step === 4"
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
                :disabled="step === 5"
                @click.stop.prevent="nextStep"
        >
          <span v-if="step < 3">
            Next
          </span>
          <span v-else-if="step === 3">
            Submit
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
// import { mapState } from 'vuex';

export default {
  props: ['dark'],
  data(vm) {
    return {
      step: 1,
      user: {
        password: '',
        mobile: '',
        gender: 'Male',
        ethnicity: '',
        DOB: null,
        emergencyContact: {
          name: '',
          phoneNumber: '',
        },
      },
      confirmPass: '',
      menu: false,
      alert: false,
      valid1: false,
      valid2: false,
      valid3: false,
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
    }).then((response) => {
      console.log(response);
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
    // ...mapState('admin', { patchAdmin: 'isPatchPending' }),
    // ...mapState('manager', { patchManager: 'isPatchPending' }),
    // ...mapState('coach', { patchCoach: 'isPatchPending' }),
    // ...mapState('authmanagement', { isCreatePending: 'isCreatePending' }),
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
        case 4: return 'Registration Complete';
        default: return '';
      }
    },
    // initialLoad() {
    //   return this.isCreatePending;
    // },
    loading() {
      return false;
      // return this.patchCoach || this.patchManager || this.patchAdmin;
    },
    alertClass() {
      return this.$vuetify.breakpoint.smAndDown ? 'alert_small' : 'alert_large';
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    nextStep() {
      if ((this.step === 1 && this.valid1)
        || (this.step === 2 && this.valid2)) {
        this.step += 1;
      } else if (this.step === 3 && this.valid3) {
        this.registerUser();
        this.step += 1;
      } else if (this.step === 4) {
        this.$router.push({ name: 'login' });
      } else {
        this.alert = true;
      }
      return this.step;
    },
    async registerUser() {
      const user = {
        ...this.user,
        DOB: new Date(this.user.DOB),
        mobile: `+61${this.user.mobile}`,
        emergencyContact: {
          ...this.user.emergencyContact,
          phoneNumber: `+61${this.user.emergencyContact.phoneNumber}`,
        },
        darktheme: this.dark,
      };
      console.log(user);
    },
  },
};
</script>

<style scoped>
.alert_large {
  border: 0;
  border-radius: 30px;
  font-size: 12pt;
  top: 0;
  left: 10vw;
  margin: 3rem 0 0;
  min-width: calc(100% - 20vw);
  position: absolute;
  z-index: auto;
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
}
.divider {
  left: 0;
  right: 0;
  bottom: 56px;
  position: fixed;
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

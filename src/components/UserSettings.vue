<template>
  <v-container grid-list-xs test-xs-center>
    <v-layout row wrap>
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
                @click:append="changeFirstName = !changeFirstName; changeLastName = false;"
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
                @click:append="changeLastName = !changeLastName; changeFirstName = false;"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-expand-transition>
              <div v-show="changeFirstName">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE FIRST NAME
                </v-flex>
                <div class="mt-2">
                  <v-text-field
                  class="ml-2 mr-2"
                  hint="Enter new First Name"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                  <v-text-field
                  class="ml-2 mr-2"
                  hint="Confirm new First Name"
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
                >
                Update</v-btn>
              </div>
            </v-expand-transition>
            <v-expand-transition>
              <div v-show="changeLastName">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE LAST NAME
                </v-flex>
                <div class="mt-2">
                  <v-text-field
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
              EMAIL
            </v-flex>
            <v-flex>
              <v-text-field
              v-model="user.email"
              readonly="true"
              single-line
              solo-inverted
              hide-details
              flat
              :append-icon="'mdi-pencil'"
              @click:append="changeEmail = !changeEmail"
              >
              </v-text-field>
            </v-flex>
            <v-expand-transition>
              <div v-show="changeEmail">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE EMAIL
                </v-flex>
                <div class="mt-2">
                  <v-text-field
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
                  class="ml-2 mr-2"
                  hint="Confirm new Email"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  :rules="[validation.required, validation.email]"
                  >
                  </v-text-field>
                </div>
                <v-btn
                class="ml-4"
                round
                color="error"
                depressed
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
              MOBILE
            </v-flex>
            <v-flex>
              <v-text-field
              v-model="user.mobile"
              readonly="true"
              single-line
              solo-inverted
              hide-details
              flat
              :append-icon="'mdi-pencil'"
              @click:append="changeMobile = !changeMobile"
              >
              </v-text-field>
            </v-flex>
            <v-expand-transition>
              <div v-show="changeMobile">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE MOBILE
                </v-flex>
                <div class="mt-2">
                  <v-text-field
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
                >
                Update</v-btn>
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
                @click:append="changeEName = !changeEName; changeEMobile = false;"
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
                @click:append="changeEMobile = !changeEMobile; changeEName = false;"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-expand-transition>
              <div v-show="changeEName">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE EMERGENCY CONTACT NAME
                </v-flex>
                <div class="mt-2">
                  <v-text-field
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
                >
                Update</v-btn>
              </div>
            </v-expand-transition>
            <v-expand-transition>
              <div v-show="changeEMobile">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE EMERGENCY CONTACT MOBILE
                </v-flex>
                <div class="mt-2">
                  <v-text-field
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
                >
                Update</v-btn>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: {
          first: 'jeff',
          last: 'demo',
        },
        email: 'test@gmail.com ',
        mobile: '0429278787',
        emergencyContact: {
          name: 'Jeffs mum',
          mobile: '041928479',
        },
      },
      changeFirstName: false,
      changeLastName: false,
      changeEmail: false,
      changeMobile: false,
      changeEName: false,
      changeEMobile: false,
      validation: {
        required: value => !!value || 'Required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid email address';
        },
      },
      watch: {

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

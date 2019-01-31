<template>
  <v-container grid-list-xs test-xs-center>
    <v-layout row wrap>
      <v-flex>
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
              v-model="email"
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
                  v-model='newEmail'
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
                  v-model='newEmailCon'
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
              USERNAME
            </v-flex>
            <v-flex>
              <v-text-field
              v-model="username"
              readonly="true"
              single-line
              solo-inverted
              hide-details
              flat
              :append-icon="'mdi-pencil'"
              @click:append="changeUsername = !changeUsername"
              >
              </v-text-field>
            </v-flex>
            <v-expand-transition>
              <div v-show="changeUsername">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE USERNAME
                </v-flex>
                <div class="mt-2">
                  <v-text-field
                  v-model='newUsername'
                  class="ml-2 mr-2"
                  hint="Enter new Username"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  >
                  </v-text-field>
                  <v-text-field
                  v-model='newUsernameCon'
                  class="ml-2 mr-2"
                  hint="Confirm new Username"
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
              PASSWORD
            </v-flex>
            <v-flex>
              <v-text-field
              v-model="username"
              readonly="true"
              single-line
              solo-inverted
              hide-details
              flat
              :type="showPass ? 'text' : 'password'"
              :append-icon="'mdi-pencil'"
              @click:append="changePassword = !changePassword"
              >
              </v-text-field>
            </v-flex>
            <v-expand-transition>
              <div v-show="changePassword">
                <v-flex
                xs12
                tag="label"
                class="v-label ml-4"
                >
                  CHANGE PASSWORD
                </v-flex>
                <div class="mt-2">
                  <v-text-field
                  v-model='newPassword'
                  class="ml-2 mr-2"
                  hint="Enter new Password"
                  type="password"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  :rules=[validation.required]
                  >
                  </v-text-field>
                  <v-text-field
                  v-model='newPasswordCon'
                  class="ml-2 mr-2"
                  hint="Confirm new Password"
                  type="password"
                  persistent-hint
                  single-line
                  solo-inverted
                  flat
                  :rules=[validation.required]
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
      email: 'test@gmail.com',
      username: 'jeff',
      password: '123',
      showPass: false,
      changeEmail: false,
      changeUsername: false,
      changePassword: false,
      newEmail: '',
      newEmailCon: '',
      emailUpdate: false,
      validation: {
        required: value => !!value || 'Required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid email address';
        },
      },
    };
  },
};
</script>

<style>

</style>

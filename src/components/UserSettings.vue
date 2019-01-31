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
            <div
            v-show="changeEmail"
            >
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
                label="New Email"
                single-line
                solo-inverted
                hide-details
                flat
                >
                </v-text-field>
                <v-text-field
                v-model='newEmailCon'
                class="ml-2 mr-2"
                label="Confirm New Email"
                single-line
                solo-inverted
                hide-details
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
            <div
            v-show="changeUsername"
            >
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
                label="New Username"
                single-line
                solo-inverted
                hide-details
                flat
                >
                </v-text-field>
                <v-text-field
                v-model='newUsernameCon'
                class="ml-2 mr-2"
                label="Confirm New Username"
                single-line
                solo-inverted
                hide-details
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
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            PASSWORD
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
            <div
            v-show="changePassword"
            >
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
                label="New Password"
                single-line
                solo-inverted
                hide-details
                flat
                >
                </v-text-field>
                <v-text-field
                v-model='newPasswordCon'
                class="ml-2 mr-2"
                label="Confirm New Password"
                single-line
                solo-inverted
                hide-details
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
      rules: {
        required: value => !!value || 'Required',
        isEmail: value => value.includes('@') || 'Not an email',
        emailMatch: (newEmail, newEmailCon) => newEmail === newEmailCon || 'Not the same',
      },
      computed: {
        /*  newEmail: function () {
          if (this.newEmail === this.newEmailCon)
          {
            this.emailUpdate = true;
          }
          else
          {
            this.emailUpdate = false;
          }
        },  */
      },
    };
  },
};
</script>

<style>

</style>

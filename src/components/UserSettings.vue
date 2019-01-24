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
              class="v-label ml-1"
              >
              CHANGE EMAIL
              </v-flex>
              <v-text-field
              v-model='newEmail'
              :rules="[rules.required, rules.isEmail]"
              label="New Email"
              single-line
              solo-inverted
              hide-details
              >
              </v-text-field>
              <v-text-field
              v-model='newEmailCon'
              :rules="[rules.required, rules.emailMatch]"
              label="Confirm New Email"
              single-line
              solo-inverted
              hide-details
              >
              </v-text-field>
              <v-btn
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
            Username:
            <v-text-field
            v-model="username"
            :value=username
            readonly=true
            >
            </v-text-field>
            <v-btn
            round
            color="error"
            @click="changeUsername = !changeUsername"
            >
            Change Username</v-btn>
            <div
            v-show="changeUsername"
            >
              <v-text-field
              v-model='newEmail'
              :rules="[rules.required, rules.isEmail]"
              label="New Email"
              >
              </v-text-field>
              <v-text-field
              v-model='newEmailCon'
              :rules="[rules.required, rules.emailMatch]"
              label="Confirm New Email"
              >
              </v-text-field>
              <v-btn
              round
              color="error"
              >
              Update</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            Password:
            <v-text-field
            v-model="password"
            :type="show1 ? 'text' : 'password'"
            :value=password
            readonly=true
            >
            </v-text-field>
            <v-btn
            round
            color="error"
            @click="changePassword = !changePassword"
            >
            Change Password</v-btn>
            <div
            v-show="changePassword"
            >
              <v-text-field
              v-model='newEmail'
              :rules="[rules.required, rules.isEmail]"
              label="New Email"
              >
              </v-text-field>
              <v-text-field
              v-model='newEmailCon'
              :rules="[rules.required, rules.emailMatch]"
              label="Confirm New Email"
              >
              </v-text-field>
              <v-btn
              round
              color="error"
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
      username: 'papa',
      password: '123',
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

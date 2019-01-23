<template>
  <v-container grid-list-xs test-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            Email:
            <v-text-field
            v-model="email"
            readonly="true"
            >
            </v-text-field>
            <v-btn
            round
            color="error"
            @click="changeEmail = !changeEmail"
            >
            Change Email</v-btn>
            <v-card-text
            v-show="changeEmail"
            >
              New Email:
              <v-text-field
              >
              </v-text-field>
              New Email Confirmation:
              <v-text-field
              >
              </v-text-field>
              <v-btn
              round
              color="error"
              >
              Update</v-btn>
            </v-card-text>
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
            <v-card-text
            v-show="changeUsername"
            >
              New Username:
              <v-text-field
              >
              </v-text-field>
              New Username Confirmation:
              <v-text-field
              >
              </v-text-field>
              <v-btn
              round
              color="error"
              >
              Update</v-btn>
            </v-card-text>
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
            <v-card-text
            v-show="changePassword"
            >
              New Password:
              <v-text-field
              >
              </v-text-field>
              New Password Confirmation:
              <v-text-field
              >
              </v-text-field>
              <v-btn
              round
              color="error"
              >
              Update</v-btn>
            </v-card-text>
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
      rules: {
      },
    };
  },
};
</script>

<style>

</style>

<template>
  <v-container grid-list-xs test-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card-text>
          Email:
          <v-text-field
          v-model="email"
          :value=email
          readonly=true
          >
          </v-text-field>
          <v-btn
          round
          absolute
          color="error"
          >
          Change Email</v-btn>
        </v-card-text>
      </v-flex>
      <v-flex xs12>
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
           absolute
           color="error"
           >
           Change Username</v-btn>
        </v-card-text>
      </v-flex>
      <v-flex xs12>
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
           absolute
           color="error"
           >
           Change Password</v-btn>
        </v-card-text>
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
    };
  },
};
</script>

<style>

</style>

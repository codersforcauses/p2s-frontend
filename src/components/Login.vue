<template>
  <v-container fill-height fluid>
    <v-layout justify-center align-center>
      <v-flex text-xs-center fill-height>
        <v-card dark color="#36363f" height="100%">
          <v-toolbar dark color="#474755">
            <v-toolbar-title> Login </v-toolbar-title>
          </v-toolbar>
          <v-icon size="256px" class="pa-3"> mdi-account-circle </v-icon>
          <div class="login">
            <v-text-field
              v-model="user.email"
              label="Email"
              name="email"
              class="pa-3"
              light
              required
              solo
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              label="Password"
              name="password"
              type="password"
              class="pa-3"
              light
              required
              solo
            ></v-text-field>
          </div>
          <v-btn light round class="ma-2">Login</v-btn>
          <v-btn light round class="ma-2">Forgot Password</v-btn>
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
        email: '',
        password: '',
      },
    };
  },
};
</script>

<style lang="css" scoped>
  .login {
    margin-left: 15%;
    margin-right: 15%;
  }
</style>

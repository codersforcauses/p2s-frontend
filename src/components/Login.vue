<template>
  <div id="login">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex text-xs-center fill-height>
          <v-card align-center justify-center
          dark color="#36363f" class="elevation-10" height="100%">
            <v-toolbar dark color="#474755">
                <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-text-field
              solo
              class="pa-3"
              label="Email"
              name="email"
              prepend-icon="mdi-account"
              v-model="user.email"
              required
            ></v-text-field>
            <v-text-field
              solo
              class="pa-3"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="user.password"
              required
            ></v-text-field>
            <v-btn class="ma-2">Login</v-btn>
            <v-btn class="ma-2">Forgot Password</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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

<style>
  html, body {
    background-color: #212121;
  }
</style>

<template>
  <div id="login">
    <v-app style="background: #212121;">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex fill-height text-xs-center>
            <v-card dark color="#36363f" class="elevation-10" height="100%">
              <v-toolbar dark color="#474755">
                  <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-icon size= "256px" class="pa-3">mdi-account-circle</v-icon>
              <v-text-field
                class="pa-3"
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                v-model="user.email"
                required
                solo
              ></v-text-field>
              <v-text-field
                class="pa-3"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="user.password"
                required
                solo
              ></v-text-field>
              <v-btn class="ma-2">Login</v-btn>
              <v-btn class="ma-2">Forgot Password</v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
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

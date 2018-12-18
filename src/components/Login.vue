<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center fill-height>
      <v-flex text-xs-center fill-height>
        <v-card dark tile
                class="elevation-10"
                color="#36363f"
                height="100%"
                max-height="720px"
                max-width="720px"
                style="margin: auto;"
          >
          <v-toolbar dark color="#474755">
            <v-toolbar-title> Login </v-toolbar-title>
          </v-toolbar>
          <v-icon v-show="$vuetify.breakpoint.smAndDown"
                  size="128px"
                  class="pa-3">
            mdi-account-circle
          </v-icon>
          <v-icon v-show="$vuetify.breakpoint.mdAndUp"
                  size="256px"
                  class="pa-3">
            mdi-account-circle
          </v-icon>
          <div class="login">
            <v-text-field v-model="user.email"
                          label="Email"
                          name="email"
                          class="auto"
                          light
                          required
                          solo
            ></v-text-field>
            <v-text-field v-model="user.password"
                          label="Password"
                          name="password"
                          type="password"
                          class="auto"
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
    margin-left: 10vh;
    margin-right: 10vh;
  }
</style>

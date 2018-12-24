<template>
  <v-content>
    <v-container class="pa-0 ma-0" style="background-color: #c22032;" fluid fill-height >
      <v-layout align-center justify-center row fill-height>
        <v-flex style="height: 100%">
          <v-toolbar color="#c22032" dark flat>
            <v-toolbar-title> Login </v-toolbar-title>
          </v-toolbar>
          <v-card light
                  color="#ebebeb"
                  height="100%"
            >
            <v-img  :src="require('@/assets/p2s_massive.png')"
                    style="padding-top: 35vh; margin: auto;"
                    alt="P2S Rugbyworks Logo"
                    max-width="250"
                    max-height="100"
                    contain
            ></v-img>
            <v-flex xs10 sm8 md6 offset-xs1 offset-sm2 offset-md3>
              <v-form v-model="valid">
                <v-flex tag="label"> Email </v-flex>
                <v-text-field :rules="emailRules"
                              v-model="user.email"
                              background-color="#cecece"
                              autofocus
                              flat
                              light
                              solo
                ></v-text-field>
                <v-flex tag="label"> Password </v-flex>
                <v-text-field v-model="user.password"
                              type="password"
                              background-color="#cecece"
                              flat
                              light
                              required
                              solo
                ></v-text-field>
              </v-form>
            </v-flex>
            <v-flex class="text-xs-center">
              <v-btn class="ma-2"
                      color="#c22032"
                      depressed
                      large
                      light
                      outline
                      round
              >
                Login
              </v-btn>
              <v-spacer/>
              <v-btn class="ma-2"
                    color="grey darken-2"
                    flat
                    small
              >
                Forgot Password?
              </v-btn>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      user: {
        email: '',
        password: '',
      },
    };
  },
};
</script>

<style scoped>
.v-card {
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}
</style>

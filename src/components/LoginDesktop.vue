<template>
  <v-content>
    <v-container class="pa-0 ma-0" fluid fill-height>
      <v-layout align-center justify-center row fill-height>
        <v-flex style="height: 100%" xs8>
          <v-card light
                  color="#c22032"
                  height="100%"
          >
          <v-img  :src="require('@/assets/p2s_massive.png')"
                  style="padding-top: 65vh; margin: auto;"
                  alt="P2S Rugbyworks Logo"
                  max-width="350"
                  contain
            ></v-img>
          </v-card>
        </v-flex>
        <v-flex style="height: 100%" xs12>
          <v-card dark
                  color="#272727"
                  height="100%"
          >
            <v-flex xs6 offset-xs3 style="padding-top: 30vh;">
              <v-form v-model="valid">
                <label> Email </label>
                <v-text-field :rules="emailRules"
                              v-model="user.email"
                              background-color="#cecece"
                              autofocus
                              flat
                              light
                              solo
                ></v-text-field>
                <label> Password </label>
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
                     color="#cecece"
                     depressed
                     large
                     light
                     round
              >
                Login
              </v-btn>
              <v-spacer/>
              <v-btn class="ma-2"
                     color="grey lighten-1"
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

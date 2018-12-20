<template>
  <v-content>
    <v-container class="pa-0 ma-0" style="background-color: #474755;" fluid fill-height >
      <v-layout align-center justify-center row fill-height>
        <v-flex style="height: 100%">
          <v-toolbar color="#474755" dark flat>
            <v-toolbar-title> Login </v-toolbar-title>
          </v-toolbar>
          <v-card dark
                  class="card text-xs-center"
                  color="#36363f"
                  height="100%"
            >
            <v-icon size="196px" class="pt-4" color="#e8e8e8"> mdi-account-circle </v-icon>
            <v-flex xs10 sm8 md6 offset-xs1 offset-sm2 offset-md3>
              <v-flex tag="p" style="text-align: left;"> Email </v-flex>
              <v-text-field v-model="user.email"
                            name="email"
                            background-color="#e8e8e8"
                            autofocus
                            flat
                            light
                            required
                            solo
              ></v-text-field>
              <v-flex tag="p" style="text-align: left;"> Password </v-flex>
              <v-text-field v-model="user.password"
                            name="password"
                            type="password"
                            background-color="#e8e8e8"
                            flat
                            light
                            required
                            solo
              ></v-text-field>
            </v-flex>
            <v-btn class="ma-2" color="#e8e8e8" depressed large light round > Login </v-btn>
            <v-spacer/>
            <v-btn class="ma-2" color="grey lighten-1" flat small>
              Forgot Password? </v-btn>
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
      user: {
        email: '',
        password: '',
      },
    };
  },
};
</script>

<style scoped>
.card {
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}
</style>

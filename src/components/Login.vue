<template>
  <v-container fluid fill-height class="pa-0 ma-0" style="background-color: #474755;">
    <v-layout align-center justify-center>
      <v-flex text-xs-center fill-height>
        <v-toolbar dark flat color="#474755">
          <v-toolbar-title> Login </v-toolbar-title>
        </v-toolbar>
        <v-card dark tile
                class="card"
                color="#36363f"
                height="100%"
          >
          <v-icon size="196px" class="pt-5"> mdi-account-circle</v-icon>
          <div :class="{'margin-large': $vuetify.breakpoint.lgAndUp,
                        'margin-medium': $vuetify.breakpoint.md,
                        'margin-small': $vuetify.breakpoint.smAndDown,}">
            <v-text-field v-model="user.email"
                          label="Email"
                          name="email"
                          light
                          required
                          solo
            ></v-text-field>
            <v-text-field v-model="user.password"
                          label="Password"
                          name="password"
                          type="password"
                          light
                          required
                          solo
            ></v-text-field>
          </div>
          <v-btn light large round class="ma-2">Login</v-btn><br>
          <v-btn dark flat small disabled class="ma-2">Forgot Password?</v-btn>
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
.card {
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}
.margin-large {
  margin: 2.5vh 50vh 0vh 50vh;
}
.margin-medium {
  margin: 2.5vh 25vh 0vh 25vh;
}
.margin-small {
  margin: 2.5vh 5vh 0vh 5vh;
}
</style>

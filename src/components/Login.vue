<template>
  <v-content>
    <v-toolbar dark flat color="#474755">
      <v-toolbar-title> Login </v-toolbar-title>
    </v-toolbar>

    <v-card dark class="pa-5">
      <v-form ref="form" v-model="valid" @keyup.native.enter="valid && login($event)">
        <v-layout row wrap>
          <v-flex xs12>
            <v-icon size="20rem" style="margin: 3rem auto 0">  mdi-account-circle  </v-icon>
          </v-flex>

          <v-flex xs12>
            <v-text-field v-model.trim="user.email"
                          label="Email"
                          :disabled="loading"
                          required
                          solo-inverted
                          flat
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field v-model="user.password"
                          label="Password"
                          type="password"
                          :disabled="loading"
                          required
                          solo-inverted
                          flat
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-btn  light
                    large
                    round
                    depressed
                    :disabled="!valid || loading"
                    :loading="loading"
                    @click.stop.prevent="login"
            >
              Login
            </v-btn>
          </v-flex>

          <v-flex xs12>
            <v-btn flat small>Forgot Password?</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      user: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    async login() {
      if (this.valid) {
        await this.authenticate({
          strategy: 'local',
          ...this.user,
        }).then(async () => {
          await this.authenticate();
          // logged in
          this.$router.push({ name: 'Dashboard' }); // eslint-disable-line
        }).catch(async (e) => {
          // Error on page
          // this.showDismissibleAlert = true;
          // this.error = e.message;
          console.log(e);
        });
      }
    },
  },
};
</script>

<style scoped>
.icon {
  margin: 3em auto 0;
}
</style>

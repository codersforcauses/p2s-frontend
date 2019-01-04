<template>
  <component :is="loginScreen">
    <template slot="form">
      <div>
        <v-alert  dismissible
                  v-model="alert"
                  type="error"
                  name="alert"
                  :class="alertClass"
                  :transition="transitionClass"
        >
          Error: {{ error }}
        </v-alert>

        <v-form v-model="valid" @keyup.native.enter="valid && login($event)">
          <label  class="v-label ml-4"
                  :class="labelColour"
          >
            EMAIL
          </label>
          <v-text-field solo-inverted
                        flat
                        single-line
                        name="email"
                        color="#c22032"
                        height=20
                        type="email"
                        v-model="user.email"
                        :disabled="loading"
                        :rules="[rules.required, rules.email]"
                        :dark="$vuetify.breakpoint.mdAndUp"
          ></v-text-field>

          <label  class="v-label ml-4"
                  :class="labelColour"
          >
            PASSWORD
          </label>
          <v-text-field solo-inverted
                        flat
                        single-line
                        name="password"
                        color="#c22032"
                        height=20
                        v-model="user.password"
                        :rules="[rules.required]"
                        :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="show ? 'text' : 'password'"
                        :dark="$vuetify.breakpoint.mdAndUp"
                        @click:append="show = !show"
          ></v-text-field>

          <v-flex class="text-xs-center">
            <v-btn  large
                    round
                    name="login"
                    class="mt-4 px-5 btn"
                    :outline="$vuetify.breakpoint.smAndDown"
                    :depressed="$vuetify.breakpoint.mdAndUp"
                    :color="btnColour"
                    :disabled="!valid || loading"
                    :loading="loading"
                    @click.stop.prevent="login"
            >
              Login
            </v-btn>

            <v-spacer/>

            <v-btn  flat
                    small
                    round
                    name="forgotPass"
                    class="btn"
                    color="grey"
            >
              Forgot Password?
            </v-btn>
          </v-flex>
        </v-form>
      </div>
    </template>
  </component>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import mobile from '@/components/login/Mobile.vue';
import desktop from '@/components/login/Desktop.vue';

export default {
  name: 'login',
  title: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      valid: false,
      show: false,
      alert: false,
      error: '',
      rules: {
        required: v => !!v || 'This field is required',
        email: v => /.+@.+/.test(v) || 'Email must be valid',
      },
    };
  },
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
    loginScreen() {
      return this.$vuetify.breakpoint.smAndDown ? mobile : desktop;
    },
    btnColour() {
      return this.$vuetify.breakpoint.smAndDown ? '#d20020' : '#e8e8e8';
    },
    labelColour() {
      return this.$vuetify.breakpoint.smAndDown ? 'theme--light' : 'theme--dark';
    },
    alertClass() {
      return this.$vuetify.breakpoint.smAndDown ? 'alert_small' : 'alert_large';
    },
    transitionClass() {
      return this.$vuetify.breakpoint.smAndDown ? 'slide-y-reverse-transition' : 'slide-y-transition';
    },
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    async login() {
      if (this.valid) {
        await this.authenticate({
          strategy: 'local',
          ...this.user,
        }).then(async () => {
          // logged in
          this.$router.push({ name: 'dashboard' });
        }).catch(async (e) => {
          // Error on page
          this.alert = true;
          this.error = e.message;
        });
      }
    },
  },
};
</script>

<style scoped>
.btn {
  z-index: 5 !important;
}
.alert_large {
  border: 0;
  border-radius: 30px;
  font-size: 12pt;
  top: 10vh;
  left: 10vw;
  margin: 3rem 0 0;
  min-width: calc(100% - 20vw);
  position: absolute;
  z-index: auto;
}
.alert_small {
  border: 0;
  border-radius: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  margin: 0;
  z-index: 10 !important;
}
</style>

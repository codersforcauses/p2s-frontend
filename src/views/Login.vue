<template>
  <component :is="login">
    <template slot="form">
      <div>
        <v-alert  dismissible
                  v-model="alert"
                  type="error"
                  :class="alertClass"
                  transition="slide-y-transition"
        >
          <strong> Error </strong>
        </v-alert>

        <v-form v-model="valid" class="pt-5">
          <label  class="v-label"
                  :class="labelColour"
          >
            EMAIL
          </label>
          <v-text-field solo-inverted
                        flat
                        single-line
                        color="#c22032"
                        :rules="[rules.required, rules.email]"
                        :dark="$vuetify.breakpoint.mdAndUp"
                        height="20px"
                        v-model="user.email"
                        class="email"
          ></v-text-field>

          <label  class="v-label"
                  :class="labelColour"
          >
            PASSWORD
          </label>
          <v-text-field solo-inverted
                        flat
                        single-line
                        color="#c22032"
                        :rules="[rules.required]"
                        :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="show ? 'text' : 'password'"
                        :dark="$vuetify.breakpoint.mdAndUp"
                        @click:append="show = !show"
                        height="20px"
                        v-model="user.password"
                        class="password"
          ></v-text-field>

          <v-flex class="text-xs-center">
            <v-btn  large
                    round
                    :outline="$vuetify.breakpoint.smAndDown"
                    :depressed="$vuetify.breakpoint.mdAndUp"
                    :color="btnColour"
                    class="mt-4 px-5"
                    @click="alert = true"
            >
              Login
            </v-btn>

            <v-spacer/>

            <v-btn  flat
                    small
                    round
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
      rules: {
        required: v => !!v || 'This field is required',
        email: v => /.+@.+/.test(v) || 'Email must be valid',
      },
    };
  },
  computed: {
    login() {
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
  },
};
</script>

<style scoped>
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
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  margin: 0;
  z-index: auto;
}
</style>

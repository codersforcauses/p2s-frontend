<template>
  <component :is="login">
    <template slot="form">
      <v-form v-model="valid" class="pt-5">
        <label  class="v-label"
                :class="labelColour"
        >
          EMAIL
        </label>
        <v-text-field solo-inverted
                      flat
                      dark
                      single-line
                      color="#c22032"
                      :rules="[rules.required, rules.email]"
                      height="20px"
                      v-model="user.email"
        ></v-text-field>

        <label  class="v-label"
                :class="labelColour"
        >
          PASSWORD
        </label>
        <v-text-field solo-inverted
                      flat
                      dark
                      single-line
                      color="#c22032"
                      :rules="[rules.required]"
                      :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      height="20px"
                      v-model="user.password"
        ></v-text-field>
        <v-flex class="text-xs-center">
          <v-btn  large
                  round
                  :outline="$vuetify.breakpoint.smAndDown"
                  :depressed="$vuetify.breakpoint.mdAndUp"
                  :color="btnColour"
                  class="mt-4 px-5"
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
      valid: false,
      show: false,
      rules: {
        required: v => !!v || 'This field is required',
        email: v => /.+@.+/.test(v) || 'Email must be valid',
      },
      user: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    login() {
      return this.$vuetify.breakpoint.smAndDown ? mobile : desktop;
    },
    btnColour() {
      return this.$vuetify.breakpoint.smAndDown ? '#c22032' : '#e8e8e8';
    },
    labelColour() {
      return this.$vuetify.breakpoint.smAndDown ? 'theme--light' : 'theme--dark';
    },
  },
};
</script>

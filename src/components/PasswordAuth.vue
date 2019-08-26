<template>
  <v-dialog 
    v-model="showDialog"
    transition="dialog-transition"
    max-width=520
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card flat tile>
      <v-toolbar flat>
        <h1 class="headline"> Password Authentication </h1>
        <v-spacer/>
        <v-btn flat icon @click="$emit('input')">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="pa-4">
        <v-form 
          v-model="valid"
          class="pt-2"
          :class="{ 'px-2': $vuetify.breakpoint.smAndUp }"
        >
          <v-text-field
            v-model="user.password"
            solo-inverted
            flat
            persistent-hint
            hint="Enter your password"
            type="text"
            :color="primary"
            :rules="[validation.required]"
          >
          </v-text-field>
          <v-alert  dismissible
            v-model="alert"
            type="error"
            name="alert"
            class="alert"
            transition="slide-y-transition"
          >
            {{ error }}
          </v-alert>
          <v-card-actions>
            <v-btn
              depressed
              round
              class="ma-0"
              :light="!dark"
              :dark="dark"
              :color="primary"
              :disabled="!valid"
              @click.stop.prevent="passCheck"
            > 
              Confirm
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: ['value', 'dark'],
  data() {
    return {
      user: {
        email: this.$store.state.auth.user.email,
        password: '',
      },
      alert: false,
      error: '',
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
      },
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    async passCheck() {
      if (this.valid) {
        try{
          
          const result= await this.authenticate({
            strategy: 'local',
            ... this.user,
          })
          console.log('emittting');
          this.$emit('pass-auth', true);
        } catch (error) { 
          console.log('fuck')
          this.error = e.message;
          this.alert = true;
        }
      }
    },
  },
};
</script>

<style>

</style>

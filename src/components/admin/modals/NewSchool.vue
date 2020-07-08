<template>
  <v-dialog scrollable
            max-width=520
            v-model="showDialog"
            transition="dialog-transition"
            :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card flat tile>
      <v-toolbar flat>
        <h1 class="headline"> Create New School </h1>
        <v-spacer/>
        <v-btn flat icon @click="$emit('input')">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-4">
        <v-form v-model="valid"
                class="pt-2"
                :class="{ 'px-2': $vuetify.breakpoint.smAndUp }"
                @keyup.native.enter="valid && createSchool($event)"
        >
          <label class="v-label ml-4">
            NAME
          </label>
          <v-text-field solo-inverted
                        flat
                        persistent-hint
                        hint="Enter the new school's name"
                        type="text"
                        class="mb-2 mt-1"
                        :color="primary"
                        :disabled="loading"
                        :rules="[validation.required]"
                        v-model.trim="school.name"
          >
          </v-text-field>
          <label class='v-label ml-4'>
            REGION
          </label>
          <v-select solo-inverted
                    flat
                    persistent-hint
                    hint='Enter the region the school belongs'
                    type='text'
                    class='mb-2 mt-1 select_flat'
                    item-text='name'
                    item-value='value'
                    :color='primary'
                    :menu-props="{
                      offsetY: true,
                      light: isDark,
                      dark: !isDark,
                      transition: 'slide-y-transition',
                    }"
          >
          </v-select>
          <v-alert  dismissible
                    v-model="alert"
                    type="error"
                    name="alert"
                    class="alert"
                    transition="slide-y-transition"
          >
            {{ error }}
          </v-alert>

          <v-btn  depressed
                  round
                  class="ma-0"
                  style="float: right"
                  :light="!isDark"
                  :dark="isDark"
                  :color="primary"
                  :disabled="!valid || loading"
                  :loading="loading"
                  @click.stop.prevent="createSchool"
          >
            <span :style="{ color: button }"> Create School </span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// import {  } from 'vuex';

export default {
  props: ['value', 'dark'],
  data() {
    return {
      school: {
        name: '',
        region: '',
      },
      alert: false,
      error: '',
      valid: false,
      validation: {
        required: value => !!value || 'This field is required',
        name: (value) => {
          const pattern = /^[a-z ,.'-]+$/i;
          return pattern.test(value) || 'Name must only contain letters';
        },
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
    isDark() {
      return this.dark === 'dark';
    },
    primary() {
      return this.isDark ? 'darkPrimary' : 'lightPrimary';
    },
    button() {
      return this.isDark ? '#272727' : '#ebebeb';
    },
  },
  methods: {
    async createSchool() {
      if (this.valid) {
        const { School } = this.$FeathersVuex;
        const school = new School(this.school);

        await school.create()
          .then(() => this.$emit('input'))
          .catch((err) => {
            this.error = err.message.charAt(0).toUpperCase().concat(err.message.slice(1));
            this.alert = true;
          });
      }
    },
  },
};
</script>

<style scoped>
.alert {
  border: 0;
  border-radius: 30px;
  font-size: 12pt;
  margin: 0.5rem 0 1rem;
  min-width: calc(100% - 20vw);
  z-index: auto;
}
.v-card {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.list {
  padding: calc( 0.5 * var(--thiccness)) var(--thiccness);
}
</style>

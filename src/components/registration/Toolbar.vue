<template>
  <v-toolbar flat app height=64>
    <v-toolbar-title class="mt-2 ml-2 headline">
      User Registration
    </v-toolbar-title>

    <v-spacer/>

    <v-toolbar-items>
      <v-btn  :flat="$vuetify.breakpoint.mdAndUp"
              :icon="$vuetify.breakpoint.smAndDown"
              @click="setTheme"
      >
        <v-icon :left="$vuetify.breakpoint.mdAndUp">
          mdi-theme-light-dark
        </v-icon>

        <span v-show="$vuetify.breakpoint.mdAndUp">
          {{ theme }} Theme
        </span>
      </v-btn>

      <v-btn  :flat="$vuetify.breakpoint.mdAndUp"
              :icon="$vuetify.breakpoint.smAndDown"
              @click="$router.push({ name: 'login' })"
      >
        <span v-show="$vuetify.breakpoint.mdAndUp">
          Login
        </span>

        <v-icon :right="$vuetify.breakpoint.mdAndUp">
          mdi-login
        </v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    dark: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    theme() {
      return this.dark ? 'Light' : 'Dark';
    },
  },
  methods: {
    async setTheme() {
      this.dark = !this.dark;
    },
  },
};
</script>

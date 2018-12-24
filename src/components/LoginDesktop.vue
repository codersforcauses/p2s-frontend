<template>
  <v-content>
    <v-container class="pa-0 ma-0" fluid fill-height>
      <v-layout align-center justify-center row fill-height>
        <v-flex style="height: 100%" xs8>
          <v-card light
                  color="#c22032"
                  height="100%"
          >
          </v-card>
        </v-flex>
        <v-flex style="height: 100%" xs12>
          <v-card light
                  color="#272727"
                  height="100%"
          >
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

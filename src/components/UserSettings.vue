<template>
  <v-container grid-list-xs test-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card-text>
          Email: {{email}}
          <button>
            <v-icon right>mdi-pencil</v-icon>
          </button>
        </v-card-text>
      </v-flex>
      <v-flex xs12>
        <v-card-text>
          Username: {{username}}
          <v-icon right>mdi-pencil</v-icon>
        </v-card-text>
      </v-flex>
      <v-flex xs12>
        <v-card-text>
          Change Password {{password}}
          <v-icon right>mdi-pencil</v-icon>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: 'test@gmail.com',
      username: 'papa',
      password: '123',
    };
  },
};
</script>

<style>

</style>

<template>
  <v-content>
    <v-container grid-list-lg fluid fill-height style="background-color: #c22032;">
      <v-layout fill-height row wrap>
        <v-flex style="height: 100%" xs12>
          <v-toolbar color="#c22032" dark flat>
            <v-toolbar-title> Login </v-toolbar-title>
          </v-toolbar>
          <v-card color="#ebebeb" class="pa-4" style="margin: -16px" height="100%">
            <v-img  contain
                    class="mx-auto py-5"
                    max-width="32vmax"
                    :src="require('@/assets/p2s_massive.png')"
            ></v-img>
            <slot name="form"></slot>
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
};
</script>

<style scoped>
.v-card {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
</style>

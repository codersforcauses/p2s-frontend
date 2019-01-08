<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    direction="top"
    transition="slide-x-transition"
    fixed
  >
    <v-btn
      slot="activator"
      v-model="fab"
      color="red darken-2"
      fab
    >
      <v-icon title="Forms">mdi-file-document-box-outline</v-icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-btn
      fab
      small
      color="green"
    >
      RespecT
    </v-btn>
    <v-btn
      fab
      small
      color="indigo"
    >
      Pay
    </v-btn>
    <v-btn
      fab
      small
      color="red"
    >
      F to
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
    };
  },
};
</script>

<style>

</style>

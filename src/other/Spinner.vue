<template>
  <v-layout
    fill-height
    align-center
    justify-center
    ma-0
    style="min-height: calc(var(--thiccness) * 10)"
  >
    <v-progress-circular indeterminate :color="color"></v-progress-circular>
  </v-layout>
</template>

<script>
export default {
  computed: {
    color() {
      return this.$store.getters['users/current'].darktheme ? 'darkPrimary' : 'lightPrimary';
    },
  },
};
</script>

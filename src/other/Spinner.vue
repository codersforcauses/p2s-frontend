<template>
  <v-layout
    fill-height
    align-center
    justify-center
    ma-0
  >
    <v-progress-circular indeterminate :color="color"></v-progress-circular>
  </v-layout>
</template>

<script>
export default {
  props: [
    'color',
  ],
};
</script>

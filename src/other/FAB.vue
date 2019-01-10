<template>
  <v-speed-dial bottom
                right
                fixed
                v-model="fab"
                transition="scale-transition"
  >
    <v-btn  fab
            depressed
            slot="activator"
            v-model="fab"
            :light="dark"
            :dark="!dark"
            :color="primary"
            :class="$vuetify.breakpoint.mdAndDown ? 'mobile' : 'desktop'"
    >
      <v-icon title="Forms"> mdi-file-document-box-outline </v-icon>
      <v-icon> mdi-close </v-icon>
    </v-btn>
    <v-btn  fab
            depressed
            small
            color="green"
            :class="$vuetify.breakpoint.mdAndDown ? 'mobile' : 'desktop'"
    >
      RespecT
    </v-btn>
    <v-btn  fab
            depressed
            small
            color="indigo"
            :class="$vuetify.breakpoint.mdAndDown ? 'mobile' : 'desktop'"
    >
      Pay
    </v-btn>
    <v-btn  fab
            depressed
            small
            color="red"
            :class="$vuetify.breakpoint.mdAndDown ? 'mobile' : 'desktop'"
    >
      F to
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  props: ['dark'],
  data() {
    return {
      fab: false,
    };
  },
  computed: {
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
};
</script>

<style scoped>
.mobile {
  bottom: 47px !important;
  right: -10px !important;
}
.desktop {
  bottom: 47px !important;
  right: -7px !important;
}
</style>

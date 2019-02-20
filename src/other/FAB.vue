<template>
  <v-fade-transition>
    <v-speed-dial bottom
                  right
                  fixed
                  v-show="showFAB"
                  v-scroll="onScroll"
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
  </v-fade-transition>
</template>

<script>
export default {
  props: ['dark'],
  data() {
    return {
      fab: false,
      showFAB: true,
      scrollY: 0,
    };
  },
  computed: {
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
  methods: {
    onScroll() {
      if (typeof window === 'undefined') {
        return;
      }
      const top = window.pageYOffset || document.documentElement.offsetTop || 0;
      this.showFAB = top < 150 || this.scrollY > top;
      this.scrollY = top;
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

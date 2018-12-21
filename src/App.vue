<template>
  <v-app>
    <v-snackbar bottom
                left
                v-model="snackWithButtons"
                :timeout="timeout"
                class="snack"
    >
      {{ snackWithBtnText }}
      <v-spacer/>

      <v-btn  dark
              flat
              color="info"
              @click.native="refreshApp"
      >
        {{ snackBtnText }}
      </v-btn>

      <v-btn  icon
              @click="snackWithButtons = false"
      >
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </v-snackbar>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      refreshing: false,
      registration: null,
      snackBtnText: '',
      snackWithBtnText: '',
      snackWithButtons: false,
      timeout: 0,
    };
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.snackBtnText = 'Refresh';
      this.snackWithBtnText = 'New version available!';
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) { return; }
      this.registration.waiting.postMessage('skipWaiting');
    },
  },
};
</script>

<style>
/* Provide better right-edge spacing when using an icon button there. */
.snack >>> .v-snack__content {
  padding-right: 16px;
}
</style>

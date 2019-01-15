<template>
  <v-app id="app">
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
:root {
  --thiccness: 1.25rem;
}
/* Provide better right-edge spacing when using an icon button there. */
.snack >>> .v-snack__content {
  padding-right: 16px;
}

.v-input__slot {
  border-radius: var(--thiccness) !important;
  padding: 0 1rem !important;
  height: calc(2 * var(--thiccness));
}
.v-messages__message {
  margin: 0 0.75rem;
  min-height: 1rem;
}

.v-card, .v-dialog {
  border-radius: var(--thiccness);
}

.v-btn--round {
  height: calc(2 * var(--thiccness))
}

.v-menu__content {
  box-shadow: none !important;
}

.selectFlat .v-input__slot:focus {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
</style>

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
  padding-right: var(--thiccness);
}

.v-input__slot {
  border-radius: var(--thiccness) !important;
  padding: 0 var(--thiccness) !important;
  min-height: calc(2 * var(--thiccness));
}
.v-messages__message {
  margin: 0 calc(var(--thiccness) * 0.5);
  min-height: var(--thiccness);
}

.v-card, .v-dialog {
  border-radius: var(--thiccness);
}
.v-card__title {
  padding: var(--thiccness);
}
.v-card__title--primary {
  padding-top: calc(var(--thiccness) * 1.5);
}

.v-overlay {
  background-color: #21212199;
}

.v-btn {
  height: calc(var(--thiccness) * 2);
}
.v-btn--icon {
  width: calc(var(--thiccness) * 2);
}
.v-btn--round {
  min-height: calc(2 * var(--thiccness));
  height: calc(2 * var(--thiccness));
  border-radius: var(--thiccness);
}
.v-btn--floating {
  width: calc(3 * var(--thiccness));
  height: calc(3 * var(--thiccness));
}
.v-btn--small.v-btn--round {
  min-height: calc(1.25 * var(--thiccness)) !important;
  height: calc(1.25 * var(--thiccness)) !important;
}

.v-menu__content {
  box-shadow: none !important;
}
.v-autocomplete__content.v-menu__content {
  border-bottom-left-radius: var(--thiccness) !important;
  border-bottom-right-radius: var(--thiccness) !important;
}

.v-list__tile {
  height: calc(var(--thiccness) * 2);
}

.select__flat:focus-within .v-input__slot, .select__flat:active .v-input__slot {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.container.grid-list-lg .layout .flex {
  padding: calc(var(--thiccness) * 0.5);
}
</style>

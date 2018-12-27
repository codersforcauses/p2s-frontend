/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import Vuetify from 'vuetify';
import LRU from 'lru-cache';
import '@/assets/stylus/main.styl';

const themeCache = LRU({
  max: 10,
  maxAge: 1000 * 60 * 60, // 1 hour
});

Vue.use(Vuetify, {
  options: {
    themeCache,
    customProperties: true,
  },
  iconfont: 'mdi',
});

// MDI icons list: https://materialdesignicons.com/
// To use the icons, prefix "mdi-" must be used followed by the icon name

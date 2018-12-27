/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import Vuetify from 'vuetify';
import LRU from 'lru-cache';
import '@/assets/stylus/main.styl';

const themeCache = LRU({
  max: 10,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
});

const minifyTheme = css => (process.env.NODE_ENV === 'production'
  ? css.replace(/[\s|\r\n|\r|\n]/g, '')
  : css);

Vue.use(Vuetify, {
  options: {
    themeCache,
    minifyTheme,
    customProperties: true,
  },
  iconfont: 'mdi',
});

// MDI icons list: https://materialdesignicons.com/
// To use the icons, prefix "mdi-" must be used followed by the icon name

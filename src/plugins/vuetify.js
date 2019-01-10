/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import Vuetify from 'vuetify';
import '@/assets/stylus/main.styl';

const minifyTheme = css => (process.env.NODE_ENV === 'production'
  ? css.replace(/[\s|\r\n|\r|\n]/g, '')
  : css);

Vue.use(Vuetify, {
  theme: {
    lightPrimary: '#BD342D',
    lightSecondary: '#2F2F2F',

    darkPrimary: '#F87F79',
    darkSecondary: '#E3E3E3',

    info: '#6abecf',
    success: '#82cf6a',
    warning: '#f1d778',
    error: '#ff4848',
  },
  options: {
    minifyTheme,
    customProperties: true,
  },
  iconfont: 'mdi',
});

// MDI icons list: https://materialdesignicons.com/
// To use the icons, prefix "mdi-" must be used followed by the icon name

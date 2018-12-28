/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import Vuetify from 'vuetify';
import '@/assets/stylus/main.styl';

const minifyTheme = css => (process.env.NODE_ENV === 'production'
  ? css.replace(/[\s|\r\n|\r|\n]/g, '')
  : css);

Vue.use(Vuetify, {
  theme: {
    light_primary: '#BD342D',
    light_secondary: '#2F2F2F',

    dark_primary: '#F87F79',
    dark_secondary: '#E3E3E3',
    // light_info: '#2274A5', // 016fb9
    // light_success: '#002500',
    // light_warning: '#E28413',
    // light_error: '#550C18',
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

import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@/assets/stylus/main.styl';

Vue.use(Vuetify, {
  options: {
    customProperties: true,
  },
  iconfont: 'mdi',
});

// MDI icons list: https://materialdesignicons.com/
// To use the icons, prefix "mdi-" must be used followed by the icon name

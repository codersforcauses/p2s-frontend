import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './feathers-client';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    service('activities', {
      instanceDefaults: {
      },
    }),
    service('feedback', {
      instanceDefaults: {
      },
    }),
    service('programs', {
      instanceDefaults: {
      },
    }),
    service('regions', {
      instanceDefaults: {
      },
    }),
    service('reports', {
      instanceDefaults: {
      },
    }),
    service('schools', {
      instanceDefaults: {
      },
    }),
    service('matrix', {
      instanceDefaults: {
      },
    }),
    service('sessions', {
      instanceDefaults: {
      },
    }),
    service('students', {
      instanceDefaults: {
      },
    }),
    service('users', {
      instanceDefaults: {
      },
    }),
    service('admin', {
      instanceDefaults: {
      },
    }),
    service('manager', {
      instanceDefaults: {
      },
    }),
    service('coach', {
      instanceDefaults: {
      },
    }),
    auth({ userService: 'users' }),
  ],
});

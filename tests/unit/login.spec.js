/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import router from '@/router.js';
import Login from '@/views/Login.vue';

Vue.config.silent = true;

Vue.use(router);
Vue.use(Vuetify);
Vue.use(Vuex);

describe('login', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        authenticate: jest.fn(),
      },
    });

    wrapper = mount(Login, { store, router });
    router.push('/login');
  });

  it('test for incorrect input data', () => {
    expect(wrapper.find(Login).exists()).toBe(true);
    expect(wrapper.is(Login)).toBe(true);

    const email = wrapper.find({ ref: 'email' });
    const password = wrapper.find({ ref: 'password' });

    email.setData('john.smith@gmail.com');
    password.setData('qwerty12345');

    wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.find('.v-alert.error > div').text())
      .toEqual(expect.stringContaining('Error:'));
  });
  // Currently now way to test if inputs are correct as backend can't be linked
});

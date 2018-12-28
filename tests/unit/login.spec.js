import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import login from '@/views/Login.vue';

describe('login', () => {
  const routes = [
    { path: '/login', name: 'login' },
  ];
  const router = new VueRouter({ routes });
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuetify);
  const wrapper = mount(login, {
    localVue,
    router,
  });
  it('example test', () => {
    expect(wrapper.is(login)).toBe(true);
  });
});

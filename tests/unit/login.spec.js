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
  it('login view renders correctly', () => {
    expect(wrapper.is(login)).toBe(true);
    expect(wrapper.find('v-text-field[v-model="user.email]'));
    expect(wrapper.find('v-text-field[v-model="user.password]'));
    expect(wrapper.find('v-btn[name="Login"]'));
    expect(wrapper.find('v-btn[name="Forgot Password?"]'));
  });
  it('test for input data', () => {
    expect(wrapper.is(login)).toBe(true);
    const email = wrapper.find('.email');
    const password = wrapper.find('.password');
    email.setData('john.smith@gmail.com');
    password.setData('qwerty12345');
  });
});

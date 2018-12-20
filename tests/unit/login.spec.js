import { shallowMount } from '@vue/test-utils';
import login from '@/views/Login.vue';

describe('Login.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(login, {
      propsData: { msg },
    });
    expect(wrapper.text());
  });
  it('text fields and buttons are present', () => {
    const wrapper = shallowMount(login);
    expect(wrapper.find('v-text-field'));
    expect(wrapper.find('v-btn'));
  });
});

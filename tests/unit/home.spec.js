import { shallowMount } from '@vue/test-utils';
import home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(home, {
      propsData: { msg },
    });
    expect(wrapper.text());
  });
});

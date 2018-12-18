import { shallowMount } from '@vue/test-utils';
import dashboard from '@/views/Dashboard.vue';

describe('Dashboard.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(dashboard, {
      propsData: { msg },
    });
    expect(wrapper.text());
  });
});

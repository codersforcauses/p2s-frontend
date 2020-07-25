<template>
  <router-view :dark="dark" />
</template>

<script>
export default {
  title: 'Admin Dashboard',
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

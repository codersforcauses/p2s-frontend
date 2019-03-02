<template>
  <router-view v-bind="{ dark }" />
</template>

<script>
export default {
  props: ['dark'],
};
</script>

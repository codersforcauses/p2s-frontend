<template>
  <v-card>
    <user-setting :password="passwordEntry"></user-setting>
    <v-text-field v-model="passwordEntry">
    </v-text-field>
  </v-card>
</template>

<script>
import UserSetting from '@/components/UserSetting.vue';

export default {
  data() {
    return {
      dialog: true,
      passwordEntry: 'poop',
    };
  },
  components: {
    UserSetting,
  },
};
</script>

<style>

</style>

<template>
  <v-layout fill-height row wrap>
    <v-flex xs12 sm6 md4 v-for="i in 12" :key="i">
      <v-card flat>
        <v-sparkline
          :value="values"
          :color="primary"
          smooth="16"
          line-width="2"
          auto-draw
        ></v-sparkline>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0"
            :class="`${primary}--text`">Kangaroo Valley Safari</h3>
            <div>
              Located two hours south of Sydney in the
              <br>
              Southern Highlands of New South Wales, ...
            </div>
          </div>
        </v-card-title>

        <v-card-actions class="pa-0">
          <v-btn
            flat
            round
          >Share</v-btn>
          <v-btn
            flat
            round
            @click="dialog = true"
          >Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <invite v-model="dialog" v-bind="{ dark }"/>
  </v-layout>
</template>

<script>
const invite = import('@/components/admin/modals/UserInvite.vue');

export default {
  title: 'Coach Dashboard',
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    invite: () => ({
      component: invite,
      delay: 100,
      setTimeout: 3000,
    }),
  },
  data() {
    return {
      values: [0, 5, 2, 7, 8, 2, 7, 5, 3, 7, 9, 1, 7, 2, 4],
      dialog: false,
    };
  },
  computed: {
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
};
</script>

<style>

</style>

<template>
  <v-card flat>
    <v-img  position="bottom"
            :aspect-ratio="2/1"
            :src="require(`@/assets/wa-${dark}.svg`)"
    >
      <spinner slot="placeholder"/>
    </v-img>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"
            :class="`${primary}--text`"
        >
          Manage Regions
        </h3>
        <div>
          View all the regions
          <br>
          Create a new region to sub manage
        </div>
      </div>
    </v-card-title>

    <v-card-actions class="pa-0">
      <v-btn  flat
              round
              to='/region'
      >
        View All
      </v-btn>
      <v-btn  flat
              round
              @click="regionDialog = true"
      >
        Create New
      </v-btn>
      <new-region v-model="regionDialog" v-bind="{ dark }" />
    </v-card-actions>
  </v-card>
</template>

<script>
import spinner from '@/other/Spinner.vue';

export default {
  props: ['primary'],
  components: {
    spinner,
    'new-region': () => ({
      component: import('./modals/NewRegion.vue'),
    }),
  },
  data() {
    return {
      regionDialog: false,
    };
  },
  computed: {
    dark() {
      return this.$store.getters['users/current'].darktheme ? 'dark' : 'light';
    },
  },
};
</script>

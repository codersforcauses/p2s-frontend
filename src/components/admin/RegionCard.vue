<template>
  <v-card flat>
    <v-img
      :aspect-ratio="18/9 "
      position="bottom"
      :src="require(`@/assets/wa-${dark}.svg`)"
    >
      <spinner slot="placeholder" :color="primary"/>
    </v-img>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"
        :class="`${primary}--text`">Manage Regions</h3>
        <div>
          View all the regions
          <br>
          Create a new region to sub manage
        </div>
      </div>
    </v-card-title>

    <v-card-actions class="pa-0">
      <v-btn
        flat
        round
      >View All</v-btn>
      <v-btn
        flat
        round
      >Create New</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import spinner from '@/other/Spinner.vue';

export default {
  components: {
    spinner,
  },
  props: [
    'primary',
  ],
  computed: {
    dark() {
      return this.$store.getters['users/current'].darktheme ? 'dark' : 'light';
    },
  },
};
</script>

<template>
  <v-card flat>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"
            :class="`${primary}--text`"
        >
          Manage Schools
        </h3>
        <div>
          View all the schools on file
          <br>
          Create a new school to be used in lessons or programs
        </div>
      </div>
    </v-card-title>

    <v-card-actions class="pa-0">
      <v-btn  flat
              round
      >
        View All
      </v-btn>
      <v-btn  flat
              round
              @click='createDialog = true'
      >
        Create New
      </v-btn>
      <new-school v-model='createDialog' v-bind="{ dark }" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['primary'],
  data: () => ({
    createDialog: false,
  }),
  components: {
    'new-school': () => ({
      component: import('./modals/NewSchool.vue'),
    }),
  },
};
</script>

<style scoped>
</style>

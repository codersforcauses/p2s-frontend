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
      <v-btn flat
              round
              to='/schools'
      >
        View Schools
      </v-btn>
      <view-schools v-model='viewDialog' v-bind="{ dark }" />
      <v-btn  flat
              round
      >
        Create New
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['primary'],
  data: () => ({
    createDialog: false,
    viewDialog: false,
  }),
  components: {
  },
};
</script>

<style scoped>
</style>

<template>
  <v-card flat>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"
            :class="`${primary}--text`"
        >
          Manage Matrix
        </h3>
        <div>
          View current behaviour matrix used to assess students
          <br>
          Update the contents of the current matrix for the coaches to use
        </div>
      </div>
    </v-card-title>

    <v-card-actions class="pa-0">
      <v-btn  flat
              round
              :to="{ path: '/admin/matrix/view' }"
      >
        View Matrix
      </v-btn>
      <v-btn  flat
              round
      >
        Edit Matrix
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['primary'],
};
</script>

<style scoped>
</style>

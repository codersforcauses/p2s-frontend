<template>
  <v-card flat>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"
            :class="`${primary}--text`"
        >
          View Sessions
        </h3>
        <div>
          View all past sessions in your region
        </div>
      </div>
    </v-card-title>

    <v-card-actions class="pa-0">
      <v-btn  flat
              round
      >
        View All
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

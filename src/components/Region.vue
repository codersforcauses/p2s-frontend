<template>
<v-layout row wrap>
  <v-card>
    <v-card-title>
      Test
    </v-card-title>
    <v-list>
      <v-list-tile avatar @click.native="regionSelected = true">
        helllo
      </v-list-tile>
    </v-list>
  </v-card>
  <v-navigation-drawer
      v-model="regionSelected"
      absolute
      right
      width="1000px"
    >
      <v-card>Hi</v-card>
    </v-navigation-drawer>
    </v-layout>
</template>

<script>
export default {
  data: () => ({
    regionSelected: false,
  }),
};
</script>

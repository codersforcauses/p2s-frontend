<template>
  <v-content>
    <v-container class="pa-0 ma-0" fill-height grid-list-lg fluid>
      <v-layout fill-height row wrap style="margin: -2rem;">
        <v-flex xs5 class="pa-0">
          <v-card color="#c22032" class="pa-4" height="100%">
            <v-img  contain
                    class="mx-auto"
                    height="100%"
                    max-width="27vmax"
                    :src="require('@/assets/p2s_massive.png')"
            ></v-img>
          </v-card>
        </v-flex>

        <v-flex xs7 class="pa-0">
          <v-card color="#272727" height="100%" style="padding: 28vh 15vw;">
            <slot name="form"></slot>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

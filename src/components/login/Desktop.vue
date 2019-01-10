<template>
  <v-content>
    <v-container fill-height grid-list-lg fluid class="pa-0 ma-0">
      <v-layout fill-height row wrap>
        <v-flex xs5 class="pa-0">
          <v-sheet tile color="#c22032" class="pa-4" height="100%">
            <v-img  contain
                    class="mx-auto"
                    height="100%"
                    max-width="27vmax"
                    :src="require('@/assets/p2s-logo.svg')"
            ></v-img>
          </v-sheet>
        </v-flex>

        <v-flex xs7 class="pa-0">
          <v-sheet tile flat color="#272727" height="100%" style="padding: 28vh 15vw;">
            <slot name="form"></slot>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

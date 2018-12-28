<template>
  <v-content>
    <v-container fluid fill-height style="background-color: #c22032;">
      <v-layout fill-height row wrap>
        <v-flex style="height: 100%;" xs12>
          <v-toolbar dark flat color="#c22032">
           <v-toolbar-title>
              Login
            </v-toolbar-title>
          </v-toolbar>
          <v-card color="#ebebeb" class="pa-4" style="margin: 0px -16px" height="100%">
            <v-img  contain
                    class="mx-auto pt-5"
                    max-width="32vmax"
                    :src="require('@/assets/p2s_massive.png')"
            ></v-img>
            <slot name="form"></slot>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<style scoped>
.v-card {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
</style>

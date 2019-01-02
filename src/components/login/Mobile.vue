<template>
  <v-content>
    <v-toolbar dark flat color="#c22032">
      <v-toolbar-title class="pl-3">
        Login
      </v-toolbar-title>
    </v-toolbar>

    <v-container fluid class="background">
      <v-layout fill-height row wrap>
        <v-flex xs12>
          <v-card flat>
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
.background {
  background-color: #c22032;
  padding-bottom: 0;
  height: calc(100vh - 56px);
}
.v-card {
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  background-color: #EBEBEB;
  margin: -16px;
  padding: 3rem;
  height: calc(100% + 16px);
}
</style>

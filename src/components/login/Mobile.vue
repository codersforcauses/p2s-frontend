<template>
  <v-content>
    <v-toolbar dark flat color="lightPrimary">
      <v-toolbar-title class="pl-3 headline">
        Login
      </v-toolbar-title>
    </v-toolbar>

    <v-sheet  tile
              height="calc(100% - 56px)"
              color="lightPrimary"
    >
      <v-container fill-height fluid grid-list-lg class="py-0">
        <v-layout fill-height row wrap>
          <v-flex xs12 class="pa-0">
            <v-card flat class="px-4">
              <v-img  contain
                      class="mx-auto pt-5 pb-3"
                      max-width="32vmax"
                      :src="require('@/assets/p2s-logo.svg')"
              ></v-img>
              <slot name="form"></slot>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
  </v-content>
</template>

<style scoped>
.v-card {
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  background-color: #EBEBEB;
  height: calc(100vh - 56px);
  margin-left: -8px;
  margin-right: -8px;
}
</style>

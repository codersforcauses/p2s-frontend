<template>
  <div>
    <v-toolbar dark color="light_primary" flat>
      <v-toolbar-title class="display-1"> Dashboard</v-toolbar-title>
    </v-toolbar>
  <v-content style="background-color: #464646">
    <v-container grid-list-lg fluid fill-height>
      <v-layout row wrap fill-height>
        <v-card>
          <h1>hello</h1>
        </v-card>
      </v-layout>
    </v-container>
  </v-content>
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  title: 'Dashboard',
  data() {
    return {
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
      ],
    };
  },
};
</script>

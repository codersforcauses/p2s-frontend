<template>
  <v-app :dark="dark">
    <toolbar v-model="dark"/>
    <v-content>
      <v-sheet  min-height="100%" :color="sheet">
        <v-container fluid grid-list-lg class="py-0 fill-height">
          <v-layout align-center
                    row
                    class="my-0 fill-height"
                    :class="{ 'neg-margin': height }"
          >
            <v-flex xs12
                    sm8 offset-sm2
                    md6 offset-md3
                    lg4 offset-lg4
                    class="py-0"
            >
              <register v-bind="{ dark }"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
import toolbar from '@/components/registration/Toolbar.vue';
import register from '@/components/registration/Index.vue';

export default {
  name: 'Registration',
  title: 'Registration',
  components: {
    toolbar,
    register,
  },
  data() {
    return {
      dark: false,
    };
  },
  computed: {
    sheet() {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return this.dark ? '#383838' : '#fafafa';
      }
      return this.dark ? '#272727' : '#ebebeb';
    },
    height() {
      // eslint-disable-next-line
      return screen.height >= 650;
    },
    loading() {
      return false;
    },
  },
};
</script>

<style scoped>
.v-sheet {
  border-top-left-radius: var(--thiccness);
  border-top-right-radius: var(--thiccness);
}

.fill-height {
  min-height: calc(100vh - 64px);
}

.neg-margin {
  margin-top: -64px !important;
}

@media only screen and (max-width: 600px) {
  .container {
    padding: var(--thiccness);
  }
}
@media only screen and (min-width: 600px) {
  .container {
    padding: calc(var(--thiccness) * 1.8);
  }
}
.container.grid-list-lg .layout:only-child {
  margin: calc(-1.5 * var(--thiccness));
}
</style>

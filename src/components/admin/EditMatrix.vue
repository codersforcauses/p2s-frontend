<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h1 class="display-1 ml-3 mt-2" :class="`${primary}--text`">
        {{ heading }}
      </h1>
    </v-flex>

    <v-flex xs12>
      <v-data-table :headers="headers"
                    :items="items"
                    class="curve"
                    hide-actions
                    item-key="id"
                    :loading="loading"
      >
        <template v-slot:items="props">
          <td>
            {{props.item.name}}
          </td>

          <td class="py-2 pl-4" v-for="n in 7" :key="n">
            <v-radio-group  row
                            hide-details
                            :class="breakpoints"
                            v-model="props.item.value"
            >
              <v-radio :value="n" class="ma-0" :color="primary"></v-radio>
            </v-radio-group>
          </td>
        </template>

        <template v-slot:footer>
          <td :colspan="headers.length">
            <strong>Some random description of the text goes here</strong>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['dark'],
  data() {
    return {
      heading: 'UWU',
      head: ['', 1, 2, 3, 4, 5, 6, 7],
      items: [{
        name: 'qwe',
        value: 1,
      }, {
        name: 'qwe',
        value: 2,
      }, {
        name: 'qwe',
        value: 3,
      }, {
        name: 'qwe',
        value: 4,
      }, {
        name: 'qwe',
        value: 5,
      }, {
        name: 'qwe',
        value: 6,
      }, {
        name: 'qwe',
        value: 7,
      }],
    };
  },
  computed: {
    headers() {
      return this.head.map((value, index) => {
        if (index === 0) {
          return {
            text: '',
            align: 'center',
            sortable: false,
            value: '',
          };
        }
        return {
          text: `Level ${value}`,
          align: 'center',
          sortable: false,
          width: '150px',
          value,
        };
      });
    },
    breakpoints() {
      switch (this.$vuetify.breakpoint.name) {
        case 'md': return 'pl-1 ml-2';
        case 'lg': return 'pl-3 ml-1';
        default: return 'pl-1';
      }
    },
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
    button() {
      return this.dark ? '#272727' : '#ebebeb';
    },
    loading() {
      return this.primary || false;
    },
  },
};
</script>

<style scoped>
.curve >>> .v-table {
  border-radius: var(--thiccness) !important;
}
.v-input__control >>> .v-input--selection-controls__input {
  margin: 0 !important;
}
</style>

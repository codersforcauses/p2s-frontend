<template>
  <div>
    <ul>
      <li
      v-for='school in schools'
      :key='school._id'
      >
        {{ school.name }}
      </li>
    </ul>
    <v-container>
      <v-layout
      justify-center
      >
        <v-card>
          <v-card-text>
            <v-pagination
            v-model='pagination.currentPage'
            :length='pagination.pageCount'
            :total-visible='pagination.maxButtons'
            @input='handlePageChange'
            >
            </v-pagination>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  title: 'Schools Dashboard',
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },
  data() {
    return {
      pagination: {
        itemsPerPage: 0,
        currentPage: 1,
        total: 0,
        pageCount: 0,
        skip: 0,
        maxButtons: 5,
      },
      schools: [],
    };
  },
  computed: {
    primary() {
      return this.dark ? 'darkPrimary' : 'lightPrimary';
    },
  },
  methods: {
    ...mapActions('schools', { findSchools: 'find' }),
    async fetchSchools() {
      const schoolData = await this.findSchools({
        query: {
          $skip: this.pagination.skip,
        },
      });
      this.schools = schoolData.data;
      this.pagination.total = schoolData.total;
      this.pagination.itemsPerPage = schoolData.limit;
      this.pagination.pageCount = Math.round(
        this.pagination.total / this.pagination.itemsPerPage,
      );
    },
    handlePageChange() {
      this.pagination.skip = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
      this.fetchSchools();
    },
  },
  mounted() {
    this.fetchSchools();
  },
};
</script>

<style>

</style>

<template>
  <main class="container">
    <table-user :users="allUsers"/>
  </main>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import TableUser from './components/Table.vue';

export default {
  name: 'App',
  components: {
    TableUser,
  },
  computed: mapGetters(['allUsers']),
  methods: mapActions(['getUsers']),
  mounted() {
    this.getUsers();
  },
};
</script>

<style lang="scss">
  body {
    background-color: #E5E5E5;;
  }

  .container {
    max-width: 1000px;
    width: 100%;
    padding: 0 12px;
    margin: auto;
  }
</style>

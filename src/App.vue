<template>
  <table-user :users="allUsers"/>
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
</style>

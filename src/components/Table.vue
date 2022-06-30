<template>
  <div>
    <div>
      <input v-model="searchForm" placeholder="Поиск">
    </div>
    <a href="#" @click="sort(userList, 'rating')">Рейтинг</a>
    <a href="#" @click="sort(userList, 'registration_date')">Регистрация</a>
    <table>
      <thead>
        <tr>
          <th>Имя пользователя</th>
          <th>E-mail</th>
          <th>Дата регистрации</th>
          <th>Рейтинг</th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="user.id"
            v-for="user in userList">
          <td>{{user.username}}</td>
          <td>{{user.email}}</td>
          <td v-html="formatDate(user.registration_date)"></td>
          <td>{{user.rating}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TableUser',
  props: {
    users: Array,
  },
  data() {
    return {
      searchForm: '',
      userList: [],
      sortState: 1,
    };
  },

  watch: {
    users(newValue) {
      this.userList = newValue;
    },
    searchForm() {
      const text = this.searchForm.toLowerCase();
      this.userList = this.users.filter((user) => user.username.toLowerCase().includes(text)
        || user.email.toLowerCase().includes(text));
    },
  },
  methods: {
    formatDate: (date) => {
      const newDate = new Date(date);

      return newDate.toLocaleDateString();
    },
    sort(array, key) {
      if (this.sortState === 1) {
        this.increment(array, key);

        this.sortState = -1;
      } else if (this.sortState === -1) {
        this.decrement(array, key);

        this.sortState = 1;
      }
    },
    increment: (array, key) => {
      array.sort((a, b) => {
        if (a[key] > b[key]) {
          return 1;
        }
        if (a[key] < b[key]) {
          return -1;
        }

        return 0;
      });
    },
    decrement: (array, key) => {
      array.sort((a, b) => {
        if (a[key] < b[key]) {
          return 1;
        }
        if (a[key] > b[key]) {
          return -1;
        }

        return 0;
      });
    },
  },
};
</script>

<style scoped lang="scss">

</style>

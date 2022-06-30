<template>
  <div>
    <h1>Список пользователей</h1>
    <search-form :data-search="users" @searchList="searchList"></search-form>
    <div class="form-sort">
      <span>Сортировка:</span>
      <a class="form-sort__btn" href="#"
         @click="sort(userList, 'rating')">Рейтинг</a>
      <a class="form-sort__btn" href="#"
         @click="sort(userList, 'registration_date')">Регистрация</a>
    </div>
    <table>
      <thead>
        <tr>
          <th>Имя пользователя</th>
          <th>E-mail</th>
          <th>Дата регистрации</th>
          <th>Рейтинг</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="user.id"
            v-for="(user, key) in userList">
          <td>{{user.username}}</td>
          <td>{{user.email}}</td>
          <td v-html="formatDate(user.registration_date)"></td>
          <td>{{user.rating}}</td>
          <td><button @click="delite(key)">delite</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue';

export default {
  name: 'TableUser',
  components: {
    SearchForm,
  },
  props: {
    users: Array,
  },
  data() {
    return {
      userList: [],
      sortState: 1,
    };
  },
  watch: {
    users(newValue) {
      this.userList = newValue;
    },
  },
  methods: {
    searchList(arr) {
      this.userList = arr;
    },
    formatDate: (date) => {
      const newDate = new Date(date);

      return newDate.toLocaleDateString();
    },
    delite(keyItem) {
      this.userList.splice(keyItem, 1);
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
  .form {
    &-sort {
      margin-bottom: 15px;

      &__btn {
        margin-left: 8px;
      }
    }
  }

  table {
    width: 100%;
    padding: 7px;
    background-color: white;
    border-radius: 7px 7px 0 0;

    & th, td {
      text-align: left;

      &:last-child {
        text-align: center;
      }
    }
  }
</style>

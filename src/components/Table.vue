<template>
  <div>
    <h1>Список пользователей</h1>
    <div class="form-search">
      <div class="input input_search">
        <input v-model="searchForm" placeholder="Поиск по имени или e-mail">
      </div>
      <div>
        <a href="#" @click="searchForm = ''">Очистить фильтр</a>
      </div>
    </div>
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
    &-search {
      padding: 12px 44px 16px 16px;
      background: #FFFFFF;
      box-shadow: 0 18px 15px rgba(148, 148, 148, 0.15);
      border-radius: 7px;
      margin-bottom: 70px;
    }
    &-sort {
      margin-bottom: 15px;

      &__btn {
        margin-left: 8px;
      }
    }
  }

  .input {
    width: 100%;
    background: #ECEFF0;
    border-radius: 4px;

    input {
      font-size: 12px;
      line-height: 16px;
      width: 100%;
      padding: 9px 12px;
      border: none;
      background-color: transparent;

      &:focus, &:focus-visible {
        outline: none;
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

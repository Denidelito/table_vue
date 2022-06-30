import axios from 'axios';

export default {
  state: {
    users: [],
  },
  getters: {
    allUsers: (state) => state.users,
  },
  mutations: {
    updateUsers(state, posts) {
      state.users = posts;
    },
  },
  actions: {
    getUsers: (ctx) => {
      axios
        .get('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users')
        .then((response) => {
          ctx.commit('updateUsers', response.data);
        })
        .catch((err) => console.log(err.code));
    },
  },
};

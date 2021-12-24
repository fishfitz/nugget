export const state = () => ({ me: null });

export const mutations = {
  SET_ME(state, me) {
    state.me = me;
  }
};

export const actions = {
  async FETCH_ME({ commit }) {
    commit('SET_ME', await this.$axios.$get('/me'));
  },
  async LOGOUT({ commit }) {
    await this.$axios.$post('/logout');
    commit('SET_ME', null);
  }
};

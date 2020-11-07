// state
export const state = () => ({
  test: {
    id: null
  }
});

// getters
export const getters = {
  getTestId: state => state.test.id
};

// mutations
export const mutations = {
  newTest(state, response) {
    state.test.id = response._id;
  }
};

// actions
export const actions = {
  async createTest({ commit }) {
    const response = await this.$axios.$post(
      "http://localhost:3100/t/createTest"
    );
    commit("newTest", response);
  }
};

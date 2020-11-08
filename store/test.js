// state
export const state = () => ({
  test: {
    id: null,
    user_id: null,
    questions: []
  },
  questions: []
});

// getters
export const getters = {
  getTestId: state => state.test.id,
  getAllQuestions: state => state.questions
};

// mutations
export const mutations = {
  NEW_TEST: (state, response) => {
    state.test = response;
  },
  ALL_QUESTIONS: (state, response) => {
    state.questions = response;
  },
  PUSH_QUESTION: (state, response) => {
    let questionsArr = state.test.responses;
    questionsArr.push(response);
  }
};

// actions
export const actions = {
  async createTest({ commit }) {
    const response = await this.$axios.$post(
      "http://localhost:3100/t/createTest"
    );
    commit("NEW_TEST", response);
  },

  async getAllQuestions({ commit }) {
    const response = await this.$axios.$get("http://localhost:3100/q");
    commit("ALL_QUESTIONS", response);
  },

  async pushQuestion({ commit, state }, data) {
    const response = await this.$axios.$put(
      "http://localhost:3100/t/pushResponse/" + state.test._id,
      {
        question_id: data.question_id,
        response: data.response,
        group: data.group
      }
    );
    commit("PUSH_QUESTION", response);
  }
};

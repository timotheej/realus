// state
export const state = () => ({
  test: {
    id: null,
    user_id: null,
    responses: []
  },
  questions: []
});

// getters
export const getters = {
  getTestId: state => state.test.id,
  getTestResult: state => state.test,
  getAllQuestions: state => state.questions,
  checkTest: state => {
    if (
      Object.keys(state.test.responses).length ===
        Object.keys(state.questions).length &&
      Object.keys(state.test.responses).length +
        Object.keys(state.questions).length !=
        0
    ) {
      return true;
    } else {
      return false;
    }
  }
};

// mutations
export const mutations = {
  NEW_TEST: (state, response) => {
    state.test = response;
  },
  ALL_QUESTIONS: (state, response) => {
    state.questions = response;
  },
  PUSH_QUESTION: (state, { response, data }) => {
    let questionsArr = state.test.responses;
    questionsArr.push(data);
  }
};

// actions
export const actions = {
  async createTest({ commit }) {
    const response = await this.$axios.$post("/t/createTest");
    commit("NEW_TEST", response);
  },

  async getAllQuestions({ commit }) {
    const response = await this.$axios.$get("/q");
    commit("ALL_QUESTIONS", response);
  },

  async pushQuestion({ commit, state }, data) {
    const response = await this.$axios.$put(
      "/t/pushResponse/" + state.test._id,
      {
        question_id: data.question_id,
        response: data.response,
        group: data.group
      }
    );
    commit("PUSH_QUESTION", { response, data });
  }
};

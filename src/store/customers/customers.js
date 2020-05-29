function forSetStep(state, val, stepName) {
  if (typeof val == "object") {
    for (let item in val) {
      if (state.formData[stepName][item] != undefined) {
        state.formData[stepName][item] = val[item];
      }
    }
  }
}
export default {
  state: {
    detail: {},
    process: {},
    follow: {}
  },
  mutations: {
    updateDetail(state, value) {
      state.detail = value;
    },
    resetDetail(state, value) {
      state.detail = {};
    },
    updateProcess(state, value) {
      state.process = value;
    },
    resetProcess(state, value) {
      state.process = {};
    },
    updateFollow(state, value) {
      state.follow = value;
    },
    resetFollow(state, value) {
      state.follow = {};
    }
    // updateIsformDataNoCommit(state, val) {
    //   state.isformDataNoCommit = val;
    // }
  },
  actions: {
    // actionsUpdateDetail({ commit }, value) {
    //   commit("updateDetail", value);
    // }
  }
};

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
    follow: {},
    extend: {},
    impress: {},
    auth: {}
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
    },
    updateExtend(state, value) {
      state.extend = value;
    },
    resetExtend(state, value) {
      state.extend = {};
    },
    updateImpress(state, value) {
      state.impress = value;
    },
    resetImpress(state, value) {
      state.impress = {};
    },
    updateAuth(state, value) {
      state.auth = value;
    },
    resetAuth(state, value) {
      state.auth = {};
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

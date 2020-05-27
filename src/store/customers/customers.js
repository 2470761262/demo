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
    detail: {}
  },
  mutations: {
    updateDetail(state, value) {
      state.detail = value;
    },
    resetDetail(state, value) {
      state.detail = {};
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

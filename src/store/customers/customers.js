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
    detail: {
      a: 1,
      ab1: 1,
      ad2: 1
    }
  },
  mutations: {
    updateDetail(state, value) {
      state.detail = value;
    }
    // updateIsformDataNoCommit(state, val) {
    //   state.isformDataNoCommit = val;
    // }
  },
  actions: {
    actionsUpdateDetail({ commit }, value) {
      commit("updateDetail", value);
    }
  }
};

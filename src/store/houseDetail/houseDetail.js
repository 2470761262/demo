function forSetStep(state, val) {
  if (Object.keys(state.houseData).length == 0) {
    state.houseData = val;
  } else if (typeof val == "object") {
    for (let item in val) {
      if (state.houseData[item] != undefined) {
        state.houseData[item] = val[item];
      }
    }
  }
}
function getData() {
  return {
    id: null, //房源ID
    houseData: {}, //房源接口数据
    reloData: {} //权限设置
  };
}

export default {
  state: getData(),
  mutations: {
    setHouseID(state, val) {
      state.id = val;
    },
    setHouseData(state, val) {
      forSetStep(state, val);
    },
    reloadData(state) {
      state = getData();
    }
  },
  actions: {
    commitHouseData({ commit }, value) {
      commit("setHouseData", value);
    }
  }
};

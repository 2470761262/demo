function forSetStep(state, val, argName) {
  if (Object.keys(state[argName]).length == 0) {
    state[argName] = val;
  } else if (typeof val == "object") {
    for (let item in val) {
      if (state[argName][item] != undefined) {
        state[argName][item] = val[item];
      }
    }
  }
}
function getData() {
  return {
    id: null, //房源ID
    houseData: {}, //房源接口数据
    reloData: {
      inspector: false,
      shopOwner: false,
      locking: false,
      releaseOutsideHouse: false,
      cancelOutsideHouse: false,
      cancelMethod: false, //取消作业方按钮
      deleteFollow: false,
      updateKeyStorageDept: false,
      telFollow: false,
      editAgentHouse: false,
      applyAgent: false, //申请跟单人
      applyKeyOwner: false, //申请钥匙人
      applyRealOwner: false, //申请实勘人
      applyOnlyOwner: false, //申请委托人
      submitApplyKeyOwner: false, //提交申请钥匙人
      submitApplyAgent: false, //提交申请跟单人
      submitApplyOnlyOwner: false, //提交申请委托人
      submitApplyRealOwner: false, //提交申请实勘人
      insertFollow: false, //提交跟进按钮
      insertReport: false, //添加举报按钮
      betBtn: false, //是否对赌
      changePopUp: false, // 转状态按钮
      dialPhone: false, //拨号
      shareQRCode: false //二维码
    } //权限设置
  };
}

export default {
  state: getData(),
  mutations: {
    setHouseID(state, val) {
      state.id = val;
    },
    /**
     * @example: 设置单个按钮权限
     */
    setRoleData(state, val) {
      state.reloData[val.roleName] = val.roleValue;
    },
    setHouseData(state, val) {
      forSetStep(state, val, "houseData");
    },
    reloadData(state) {
      state = getData();
    }
  },
  actions: {
    commitHouseData({ commit }, value) {
      commit("setHouseData", value);
    },
    commitRoleData({ commit, state }, value) {
      //判断当前按钮是否存在当前按钮组里
      if (value.roleName in state.reloData) {
        commit("setRoleData", value);
      }
    }
  }
};

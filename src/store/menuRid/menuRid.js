//选择房源
export default {
  state: {
    nowRid: ""
  },
  mutations: {
    setNowRid(state, val) {
      state.nowRid = val;
    }
  }
};

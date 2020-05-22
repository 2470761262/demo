import api from "@/api/require.js";
export default {
  releaseOutsideHouse(params) {
    let that = this;
    that.loading = true;
    return api
      .post({
        url: "/outsideHouse/releaseOutsideHouse",
        data: params,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(e => {
        return e;
      })
      .catch(e => {
        return e;
      });
  },
  cancelOutsideHouse(params) {
    let that = this;
    return api
      .post({
        url: "/outsideHouse/cancelOutsideHouse",
        data: params,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false
      })
      .then(e => {
        if (e.data.code == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch(e => {
        return false;
      });
  }
};

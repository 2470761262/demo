import api from "@/api/require.js";
export default {
  /**
   * @param {number} type 接口url
   * @param {number} replaceType 接口参数
   * @param {number} houseId 接口参数
   */
  isChecking(type, replaceType, houseId, memo = "") {
    let that = this;
    let params = {
      houseId: houseId,
      type: type,
      memo: memo
    };
    if (replaceType != 0) {
      params.replaceType = replaceType;
    }
    return api
      .get({
        url: "/agentHouse/propertyCheck/isChecking",
        data: params,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(e => {
        if (e.data.code == 200) {
          return false;
        } else {
          return true;
        }
      })
      .catch(e => {
        return true;
      });
  },
  /**
   * @param {string} url 接口url
   * @param {object} params 接口参数
   */
  insertCheck(url, params) {
    return api.post({
      url: url,
      data: params,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    });
  },
  /**
   * 删除图片
   * @param {number}  图片id
   * @param {string} fileUrl  图片路径
   */
  removeImg(id, fileUrl) {
    return api.delete({
      url: `/agentHouse/followPic/delete/${id}`,
      qs: true,
      data: {
        url: fileUrl
      }
    });
  }
};

export default {
  /**
   *
   * @param {Array} transitionList //重新赋值数组
   * @param {Array} moreSelectList //更多查询条件数组
   */
  getSelectParams(transitionList, moreSelectList) {
    let params = {};
    for (let key in moreSelectList) {
      let transition = false;
      transitionList.forEach(item => {
        if (item.key == key) {
          transition = true;
          item.value.forEach(item1 => {
            if (
              Array.isArray(moreSelectList[key]) &&
              moreSelectList[key].length > 0
            ) {
              params[item1.paramsKey] = moreSelectList[key][item1.index];
            } else {
              params[item1.paramsKey] = moreSelectList[key];
            }
          });
        }
      });
      if (!transition) {
        params[key] = moreSelectList[key];
      }
    }
    return params;
  }
};

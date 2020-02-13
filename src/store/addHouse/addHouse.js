//选择房源
export default {
  state: {
    formData: {
      // 基础信息
      step1: {
        floor: "", //
        tung: "", //栋座
        room: "", //房间号
        perName: "", //业主姓名
        sex: "", //业主称谓
        perTell: "", //业主电话号码
        tel1: "",//业主号码1
        tel2: "",//业主号码2
        tel3: "",//业主号码3
        price: "", //售价
        bottomPrice: "", //底价
        area: "", //面积
        houseRoom: "", //室
        houseHall: "", //厅
        houseToilet: "", //卫
        houseBalcony: "", //阳台
        orientation: "", //朝向
        renovation: "" //装修
      }
    }
  },
  mutations: {
    updateStep1 (state, val) {
      state.formData.step1 = val;
    }
  }
};

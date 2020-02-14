//选择房源
export default {
  state: {
    formData: {
      // 基础信息
      step1: {
        communityName: "", //楼盘
        communityId: "",//楼盘ID
        buildingNo: "", //栋座
        buildingId: "",//栋座ID
        roomNo: "", //房间号
        roomId: "",//房间号ID
        customerName: "", //业主姓名
        sex: "", //业主称谓
        tel: "", //业主电话号码
        tel1: "",//业主号码1
        tel2: "",//业主号码2
        tel3: "",//业主号码3
        price: "", //售价
        bottomPrice: "", //底价
        area: "", //面积
        room: "", //室
        hall: "", //厅
        toilet: "", //卫
        balcony: "", //阳台
        face: "", //朝向
        decoration: "" //装修
      }
    }
  },
  mutations: {
    updateStep1 (state, val) {
      state.formData.step1 = val;
    }
  }
};

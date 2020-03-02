//选择房源
let formDataJson = {
  id: '',
  // 基础信息
  step1: {
    communityName: "", //楼盘
    communityId: "", //楼盘ID
    buildingNo: "", //栋座
    buildingId: "", //栋座ID
    roomNo: "", //房间号
    roomId: "", //房间号ID
    customerName: "", //业主姓名
    sex: 0, //业主称谓
    tel: "", //业主电话号码
    tel1: "", //业主号码1
    tel2: "", //业主号码2
    tel3: "", //业主号码3
    price: "", //售价
    bottomPrice: "", //底价
    area: "", //面积
    room: "", //室
    hall: "", //厅
    toilet: "", //卫
    balcony: "", //阳台
    face: "", //朝向
    decoration: "", //装修
    title: "", //房源标题
    certificateType: "" //房屋证件类型
  },
  step2: {
    houseUse: "", //房屋用途
    houseStruct: "", //房屋结构
    property: "", //产权性质
    houseNow: "", //房屋现状
    houseSource: "", //房屋来源
    roomType: "", //户型结构
    sign: "", //户口情况
    isElevator: "", //电梯
    houseDelivery: "", //交房时间
    houseBelong: "", //附属配套
    landCharacteristic: "", //土地性质
    primarySchool: "", //划片小学
    primarySchoolUse: "", //小学学籍占用
    middleSchool: "", //划片中学
    middleSchoolUse: "", //中学学籍占用
    mortgage: "", //抵押情况
    mortgageBank: "", //抵押银行
    balance: "", //余贷
    monthlyMortgage: "", //月供
    lastSale: "", //上次交易日期
    lastPayment: "", //上次交易金额
    paymentMethod: "", //付款方式
    buildingTime: "" //竣工时间
  },
  step3: {
    communityDesc: "", //小区介绍
    roomDesc: '', //户型介绍
    taxDesc: "", //税费解析
    saleDesc: "", //核心卖点
    //saleReson: "", //卖房原因
  }
}

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
    isformDataNoCommit: false, //是否有些表单但是没有提交 false不提示 true 提示
    formData: JSON.parse(JSON.stringify(formDataJson))
  },
  mutations: {
    updateIsformDataNoCommit(state, val) {
      state.isformDataNoCommit = val;
    },
    resetFormData(state) {
      state.formData = formDataJson;
    },
    updateId(state, val) {
      state.formData.id = val;
    },
    updateStep1(state, val) {
      forSetStep(state, val, 'step1');
    },
    updateStep2(state, val) {
      forSetStep(state, val, 'step2');
    },
    updateStep3(state, val) {
      forSetStep(state, val, 'step3');
    }
  }
};

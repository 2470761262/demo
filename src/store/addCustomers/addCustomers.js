function getData() {
  return {
    step1: {
      Customers: "", //客户姓名
      sex: 0, //性别
      tels: [""], //客户号码
      desireIntensity: "", //购买意向
      nativePlace: "", //籍贯
      Source: 0, //客源来源
      sourceType: 0,
      myImpression: [], //印象的结果数组
      requirements: [], //客户需求（传后端用）
      sourceList: [], //客源来源列表
      provinceId: "", //省
      cityId: "", //市
      countyId: "", //区
      provinceName: "", //省
      cityName: "", //市
      countyName: "" //区
    },
    step2: [],
    //requirements内容
    demandTemplate: {
      requireType: 0, //需求类型(位运算（多选）：1买二手住宅，2买二手商铺，4买二手写字楼， 8买新房住宅，16买新房商铺，32买新房写字楼，64租赁住宅，128租赁商铺，256租赁写字楼)
      buildingNeeds: [], //	楼栋需求-买或租写字楼（位运算（多选）：1知名物业，2带客梯、4带货梯、8其他）
      buyDestination: null, //购买用途,单选(刚需，投资，办公，改善，教育，其他)
      community1: "", //期望楼盘
      community1Id: null, //期望楼盘 CommunityTbl的ID
      decoration: "", //期望装修（毛坯，简单装修，精装修）
      decorationList: [], //期望装修列表
      facilitys: [], //附属设施（位运算（多选）：1可明火、2可外摆、4停车位、8天然气、16网络、32中央空调、64其他）
      floors: [], //期望楼层（位运算（多选）:1低楼层,2中楼层，4高楼层，8不要一楼,16不要顶楼）
      manageCompanyType: null, //物业类型-买新房（1普通住宅、2别墅、4商铺、8写字楼、16其他）
      maxArea: null, //期望最大面积
      minArea: null, //期望最小面积
      maxFirstPrice: null, //期望首付最高价格
      minFirstPrice: null, //期望首付最低价格
      maxPrice: null, //期望最高价格
      minPrice: null, //期望最低价格
      maxUnitPrice: null, //期望最高单价
      minUnitPrice: null, //期望最低单价
      primarySchool: "", //期望小学，中文，最多三个（多个以$隔开）
      middleSchool: "", //期望中学，中文，最多三个（多个以$隔开）
      primarySchoolList: "", //期望小学列表
      middleSchoolList: "", //期望中学列表
      moveIntoTime: "", //入住日期-租赁住宅（年月日）
      otherNeeds: [], //其他需求-买或租商铺（位运算（多选）：1面积大、2层高大、4临街、5空铺、6其他）
      payMethod: null, //付款方式（1月付、2季付、3半年付、4年付、0不限）
      payWay: null, //付款方式，单选（1一次性,2商业贷款,4公积金贷款,8组合贷款）
      rentWay: null, //租赁方式（1合租、2整租、0不限）
      roomNeeds: [], //房间需求-买或租写字楼（位运算（多选）：1可注册公司、2有老板间、4有会议室、8带办公家具、16带停车位、32其他）
      rooms: [], //购买房型（多个以$隔开，如1房$2房$3房$4房及以上）
      roomsList: [], //购买房型列表
      shopTypes: [], //商铺类型-买或租商铺（位运算（多选）：1临街店面、2写字楼配套、4写字楼配套、8档口摊位、16其他）
      shopUses: [], //商铺用途-买或租商铺（位运算（多选）：1餐饮、2休闲娱乐、4生活服务、8零售、16批发、32酒店宾馆、64汽车服务、128美容美发、256其他）
      tradeHouseType: null, //交房类型-买新房（0不限，1期房，2现房）
      community: "", //期望楼盘列表
      businessCircle: "", //期望商圈（多个以$隔开）
      businessCircleList: "" //期望商圈列表
    }
  };
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
    formData: getData(),
    isCommit: false,
    demandData: {
      rendList: [], //接收渲染数组
      secondList: [], //二手需求数组
      newHouseList: [], //新房需求数组
      leaseList: [] //租赁需求数组
    },
    demandValue: {
      //客户需求value
      list0: [],
      list1: [],
      list2: []
    },
    communityList: [], //楼盘
    primarySchoolList: [], //小学
    middleSchoolList: [], //中学
    businessList: [] //商圈
  },
  mutations: {
    resetFormData(state) {
      state.formData = getData();
      state.demandData = {
        rendList: [], //接收渲染数组
        secondList: [], //二手需求数组
        newHouseList: [], //新房需求数组
        leaseList: [] //租赁需求数组
      };
      state.demandValue = {
        //客户需求value
        list0: [],
        list1: [],
        list2: []
      };
      state.communityList = []; //楼盘
      state.primarySchoolList = []; //小学
      state.middleSchoolList = []; //中学
      state.businessList = []; //商圈
    },
    updateIsCommit(state, val) {
      state.isCommit = val;
    },
    updateDemandData(state, val) {
      state.demandData = val;
    },
    updateDemandValue(state, val) {
      state.demandValue = val;
    },
    updateStep1(state, val) {
      forSetStep(state, val, "step1");
    },
    updateStep2(state, val) {
      state.formData.step2 = val;
    },
    updateCommunityList(state, val) {
      state.communityList = val;
    },
    updatePrimarySchoolList(state, val) {
      state.primarySchoolList = val;
    },
    updateMiddleSchoolList(state, val) {
      state.middleSchoolList = val;
    },
    updateBusinessList(state, val) {
      state.businessList = val;
    }
  },
  actions: {
    InitFormData({ commit }, value) {
      commit(value.commitName, value.json);
    }
  }
};

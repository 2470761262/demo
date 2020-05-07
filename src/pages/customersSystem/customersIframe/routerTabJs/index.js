export default [
  {
    name: "我的客源",
    icon: "iconwodefangyuan iconfont",
    active: "1",
    children: [
      { name: "全部私客", active: "/customersSystem/allCustomers" },
      { name: "7日内新增", active: "/customersSystem/days7New" },
      { name: "30日内带看", active: "/buySellSystem/myRelatedHouse" },
      { name: "30日以上未维护", active: "/buySellSystem/myHouseData" },
      { name: "已购", active: "/buySellSystem/myConcern" },
      { name: "暂不购", active: "/buySellSystem/houseBet" },
      { name: "回收站", active: "/buySellSystem/validateHouseList" }
    ]
  },
  {
    name: "小组公客",
    icon: "iconzaishouwugendan iconfont",
    active: "2",
    children: [{ name: "小组公客", active: "/buySellSystem/shopDisk" }]
  },
  {
    name: "区域公客",
    icon: "iconzaishouwugendan iconfont",
    active: "3",
    children: [{ name: "全部在售", active: "/buySellSystem/saleAll" }]
  },
  {
    name: "公司公客",
    icon: "iconzaishouwugendan iconfont",
    active: "4",
    children: [
      { name: "我司成交", active: "/buySellSystem/ourComDeal" },
      { name: "他司成交", active: "/buySellSystem/otherComDeal" },
      { name: "业主自售", active: "/buySellSystem/selfDeal" }
    ]
  }
];

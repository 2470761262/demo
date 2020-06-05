export default [
  {
    name: "我的房源",
    icon: "iconwodefangyuan iconfont",
    active: "1",
    children: [
      { name: "我的核心盘", active: "/buySellSystem/concernCommunity" },
      { name: "我的跟单", active: "/buySellSystem/myAgent" },
      { name: "我的相关", active: "/buySellSystem/myRelatedHouse" },
      { name: "我的数据", active: "/buySellSystem/myHouseData" },
      { name: "我的关注", active: "/buySellSystem/myConcern" },
      { name: "成交对赌", active: "/buySellSystem/houseBet" },
      { name: "验真列表", active: "/buySellSystem/validateHouseList" },
      { name: "审核列表", active: "/buySellSystem/checkHouseList" },
      { name: "外网房源", active: "/buySellSystem/releaseOutsideHouseList" },
      { name: "浏览记录", active: "/buySellSystem/browseLog" }
    ]
  },
  {
    name: "资源库",
    icon: "iconzaishouwugendan iconfont",
    active: "2",
    children: [
      { name: "店公共盘", active: "/buySellSystem/shopDisk" },
      { name: "在售无跟单", active: "/buySellSystem/saleNotTracking" },
      { name: "暂不售", active: "/buySellSystem/notSale" },
      { name: "无号码", active: "/buySellSystem/notPhone" },
      { name: "潜在出售", active: "/buySellSystem/potentialHouse" }
    ]
  },
  {
    name: "全部在售",
    icon: "iconzaishouwugendan iconfont",
    active: "3",
    children: [{ name: "全部在售", active: "/buySellSystem/saleAll" }]
  },
  {
    name: "成交房源",
    icon: "iconzaishouwugendan iconfont",
    active: "4",
    children: [
      { name: "我司成交", active: "/buySellSystem/ourComDeal" },
      { name: "他司成交", active: "/buySellSystem/otherComDeal" },
      { name: "业主自售", active: "/buySellSystem/selfDeal" }
    ]
  },
  {
    name: "锁定房源",
    icon: "iconzaishouwugendan iconfont",
    active: "5",
    children: [
      { name: "已锁定", active: "/buySellSystem/lockingList" }
      // { name: "锁定记录", active: "/buySellSystem/lockedRecords" }
    ]
  }
];

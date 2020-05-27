export default [
  {
    name: "我的客源",
    icon: "iconwodefangyuan iconfont",
    active: "1",
    children: [
      { name: "全部私客", active: "/customersSystem/allCustomers" },
      { name: "7日内新增", active: "/customersSystem/days7New" },
      { name: "30日内带看", active: "/customersSystem/lookIn30Days" },
      {
        name: "30日以上未维护",
        active: "/customersSystem/outOfContactOver30Days"
      },
      { name: "已购", active: "/customersSystem/isBuyCustomer" },
      { name: "暂不购", active: "/customersSystem/noBuyCustomer" },
      { name: "回收站", active: "/customersSystem/recycleBinCustomer" }
    ]
  },
  {
    name: "小组公客",
    icon: "iconzaishouwugendan iconfont",
    active: "2",
    children: [
      { name: "小组公客", active: "/customersSystem/groupPublicCustomer" }
    ]
  },
  {
    name: "区域公客",
    icon: "iconzaishouwugendan iconfont",
    active: "3",
    children: [
      { name: "区域公客", active: "/customersSystem/areaPublicCustomer" }
    ]
  },
  {
    name: "公司公客",
    icon: "iconzaishouwugendan iconfont",
    active: "4",
    children: [
      { name: "公司公客", active: "/customersSystem/companyPublicCustomer" }
    ]
  }
];

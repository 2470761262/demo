export default [
    {
        name: "我的房源", active: '1', children: [
            { name: "我的核心盘", active: '/buySellSystem/concernCommunity' },
            { name: "我的跟单", active: '/buySellSystem/myAgent' },
            { name: "我的相关", active: '/buySellSystem/myRelatedHouse' },
            { name: "我的数据", active: '/buySellSystem/myHouseData' },
            { name: "我的关注", active: '/buySellSystem/myConcern' },
            { name: "成交对赌", active: '/buySellSystem/loadDevelopment?o=1' },
            { name: "验真列表", active: '/buySellSystem/validateHouseList' },
            { name: "审核列表", active: '/buySellSystem/checkHouseList' },
            { name: "外网房源", active: '/buySellSystem/releaseOutsideHouseList' },
        ]
    },
    {
        name: "资源库", active: '2', children: [
            { name: "店公共盘", active: '/buySellSystem/shopDisk' },
            { name: "在售无跟单", active: '/buySellSystem/saleNotTracking' },
            { name: "暂不售", active: '/buySellSystem/notSale' },
            { name: "无号码", active: '/buySellSystem/notPhone' },
            { name: "潜在出售", active: '/buySellSystem/potentialHouse' }
        ]
    },
    {
        name: "全部在售", active: '3', children: [
            { name: "全部在售", active: '/buySellSystem/loadDevelopment?o=17' }
        ]
    },
    {
        name: "成交房源", active: '4', children: [
            { name: "我司成交", active: '/buySellSystem/ourComDeal' },
            { name: "他司成交", active: '/buySellSystem/otherComDeal' },
            { name: "业主自售", active: '/buySellSystem/selfDeal' }
        ]
    }
]
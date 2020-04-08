<style lang="less" scoped>
.page-back-color {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.nav-back {
  background: #fff;
  padding-bottom: 17px;
}
.page-house-cell {
  display: flex;
  .house-left-tips {
    width: 120px;
    display: flex;
    > span {
      writing-mode: vertical-lr;
      color: var(--color--primary);
      font-size: 18px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
    }
  }
  &.for-house-cell {
    flex-wrap: wrap;
    flex: 1;
    margin: 0 -26px;
    padding-top: 20px;
    .house-cell-item {
      flex: 0 0 16.666%;
      height: 60px;
      margin-top: 25px;
      padding: 0 26px;
      box-sizing: border-box;
      position: relative;
      min-width: 0;
      cursor: pointer;
      &.no-cell-top {
        margin-top: 0;
      }
      &.item-hot {
        &:after {
          position: absolute;
          content: "HOT";
          color: #fff;
          background: red;
          padding: 4px 8px;
          top: 0;
          left: 25px;
          transform: translateY(-50%);
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          font-weight: 600;
          font-size: 10px;
        }
      }
      .for-house-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--color--primary);
        width: 100%;
        height: 100%;
        border-radius: 4px;
        .icon {
          color: #fff;
          font-size: 30px;
        }
        .for-house-item-title {
          color: #fff;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
  &.but-flex-center {
    align-items: center;

    .house-cell-but {
      width: 170px;
      background: var(--color--primary);
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 60px;
      margin-right: 40px;
      border-radius: 4px;
      cursor: pointer;
      > i,
      > span {
        color: #fff;
        font-size: 24px;
      }
      i {
        font-size: 34px;
      }
      &:last-child {
        margin-left: 0px;
      }
    }
  }
}
.com-flex {
  display: flex;
  margin-top: 15px;
  flex: 1;
  .com-flex-cell {
    padding-top: 20px;
    flex: 1;
    background: #fff;
    margin-right: 20px;
    &.com-cell-posi {
      position: relative;
      padding-right: 40px;
      flex: 0 0 815px;
      box-sizing: border-box;
      .hide-query {
        position: absolute;
        right: 0;
        padding-right: 10px;
        top: 500px;
        font-size: 20px;
        cursor: pointer;
        color: var(--color--primary);
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.querySelectFlag {
  flex: 0 !important;
  margin-right: 0px !important;
  .hide-warp {
    display: none;
  }
}
.item-opacity {
  opacity: 0.7;
}
</style>
<template>
  <div class="page-back-color">
    <div class="page-house-cell nav-back">
      <div class="page-house-cell house-left-tips"><span>为你推荐</span></div>
      <div class="page-house-cell for-house-cell">
        <div class="house-cell-item"
             v-for="(item,index) in houseMenuList"
             :key="index"
             :class="[item.cellTop,{'item-hot':item.hot}]">
          <div :class="['for-house-item',{'item-opacity':item.flag}]"
               @click="setSelectNav(item)"
               @dblclick="navToPath(item.path)">
            <i :class="item.icon"
               class="icon"></i>
            <div class="for-house-item-title">{{item.title}}</div>
          </div>
        </div>
      </div>
      <div class="page-house-cell but-flex-center">
        <div class="house-cell-but"
             @click="navToPath('/buySellSystem/addHouse')">
          <i class="el-icon-plus"></i>
          <span>录入房源</span>
        </div>
        <div class="house-cell-but"
             @click="navToPath('/buySellSystem/concernCommunity')">
          <i class="iconguanli iconfont"></i>
          <span>管理入口</span>
        </div>
      </div>
    </div>
    <div class="com-flex">
      <div class="com-flex-cell com-cell-posi"
           :class="{'querySelectFlag':querySelectFlag}">
        <div class="hide-warp">
          <houselistlhousepair></houselistlhousepair>
        </div>
        <div class="hide-query"
             @click="()=> querySelectFlag = !querySelectFlag "
             :class="querySelectFlag ? 'el-icon-d-arrow-right': 'el-icon-d-arrow-left'  "></div>
      </div>
      <div class="com-flex-cell">
        <houseresultlist :querySelectFlag="querySelectFlag"></houseresultlist>
      </div>
    </div>
  </div>
</template>
<script>
//筛选

import houselistlhousepair from "@/pages/buySellSystem/houseList/components/houseLIstlHousePair";
//展示列表
import houseresultlist from "@/pages/buySellSystem/houseList/components/houseResultList";
const HosueList = [
  {
    title: "我的房源",
    icon: "iconwodefangyuan iconfont",
    path: "/buySellSystem/concernCommunity",
    hot: false,
    flag: false,
    type: 1,
    url: "/mateHouse/getMateHouse/myHouse",
    cellTop: "no-cell-top"
  },
  {
    title: "7天被带看",
    icon: "iconqitianbeidaikan iconfont",
    path: "/buySellSystem/sevenDaysFollowHouse",
    hot: true,
    flag: false,
    type: 2,
    url: "/mateHouse/getMateHouse/sevenDayHouse",
    cellTop: "no-cell-top"
  },
  {
    title: "新增房源",
    icon: "iconxinzeng iconfont",
    path: "/buySellSystem/newAgentHouse",
    hot: false,
    flag: false,
    type: 3,
    url: "/mateHouse/getMateHouse/addHouse",
    cellTop: "no-cell-top"
  },
  {
    title: "我的核心盘",
    icon: "iconhexin iconfont",
    path: "/buySellSystem/concernCommunity",
    hot: false,
    flag: false,
    type: 4,
    url: "/mateHouse/getMateHouse/myKernelHouse",
    cellTop: "no-cell-top"
  },
  {
    title: "成交对赌",
    icon: "iconfangyuan iconfont",
    path: "/buySellSystem/houseBet",
    hot: true,
    flag: false,
    type: 5,
    url: "/mateHouse/getMateHouse/gambling",
    cellTop: "no-cell-top"
  },
  {
    title: "总监推荐",
    icon: "iconzongjian iconfont",
    path: "/buySellSystem/chiefRecommendHouse",
    hot: true,
    flag: false,
    type: 6,
    url: "/mateHouse/getMateHouse/chiefRecommendHouse",
    cellTop: "no-cell-top"
  },
  // { title: "钥匙房源", icon: "el-icon-zoom-in", path: "", hot: false, flag: false ,url:"/mateHouse/getMateHouse/keyHouse"},
  {
    title: "独家房源",
    icon: "el-icon-zoom-in",
    path: "/buySellSystem/soleHouse",
    hot: false,
    flag: false,
    type: 8,
    url: "/mateHouse/getMateHouse/soleHouse"
  },
  {
    title: "店公共盘",
    icon: "icondiangonggongpan iconfont",
    path: "/buySellSystem/shopDisk",
    hot: false,
    flag: false,
    type: 9,
    url: "/mateHouse/getMateHouse/shopDisk"
  },
  {
    title: "我的关注",
    icon: "iconwodeguanzhu iconfont",
    path: "/buySellSystem/myConcern",
    hot: false,
    flag: false,
    type: 10,
    url: "/mateHouse/getMateHouse/myAttention"
  },
  {
    title: "在售无跟单",
    icon: "iconzaishouwugendan iconfont",
    path: "/buySellSystem/saleNotTracking",
    hot: false,
    flag: false,
    type: 11,
    url: "/mateHouse/getMateHouse/saleNotTrack"
  },
  {
    title: "全部在售",
    icon: "el-icon-zoom-in",
    path: "/buySellSystem/saleAll",
    hot: false,
    flag: false,
    type: 12,
    url: "/mateHouse/getMateHouse/soleAllHouse"
  },
  {
    title: "店长推荐",
    icon: "el-icon-zoom-in",
    path: "/buySellSystem/shopownerRecommendHouse",
    hot: false,
    flag: false,
    type: 13,
    url: "/mateHouse/getMateHouse/shopOwnerRecommendHouse"
  }
];
import getToken from "@/minxi/getUrlToken";
import getMenuRid from "@/minxi/getMenuRid";
import { TOKEN } from "@/util/constMap";
import util from "@/util/util";
export default {
  provide() {
    return {
      form: this.form,
      Slider: this.Slider
    };
  },
  name: "houseList",
  mixins: [getToken, getMenuRid],
  components: {
    houselistlhousepair,
    houseresultlist
  },
  data() {
    return {
      querySelectFlag: false,
      houseMenuList: HosueList,
      Slider: {
        priceSlider: [20, 20],
        areaSlider: [20, 20],
        flootSlider: [-2, -2]
      },
      form: {
        type: "13",
        title: "全部在售",
        business: [],
        houseType: [],
        renovation: [],
        purpose: [],
        orientation: [],
        primarySchool: [],
        middleSchool: [],
        comId: "",
        cbId: "",
        roomNo: "",
        minFloor: "",
        maxFloor: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: "",
        face: [],
        sortColumn: "id",
        sortType: "descending",
        searchInfo: "",
        isOnly: "",
        keyOwner: ""
      }
    };
  },
  created() {
    this.form.type = "12";
    this.form.title = "全部在售";
    this.form.action = "/mateHouse/getMateHouse/soleAllHouse";
  },
  methods: {
    setSelectNav(item, resetAll) {
      this.houseMenuList.forEach((items, index) => {
        if (resetAll) {
          items.flag = false;
        } else {
          if (items.type != item.type) items.flag = false;
        }
      });
      if (resetAll) {
        return;
      }
      item.flag = !item.flag;
      if (this.form.type == item.type) {
        this.form.type = "12";
        this.form.title = "全部在售";
        this.form.action = "/mateHouse/getMateHouse/soleAllHouse";
      } else {
        this.form.type = item.type;
        this.form.title = item.title;
        this.form.action = item.url;
      }
    },
    //跳转页面
    navToPath(path) {
      this.$router.push({ path: path });
    },

    GetRequest() {
      var href = window.location.href; //获取url中"?"符后的字串
      console.log("$$$$$$$", href);
      var str = href.substring(href.indexOf("?"));
      console.log("&&&&&", str);
      var theRequest = new URLSearchParams(str);
      console.log("*****", theRequest);
      var token = theRequest.get(TOKEN);
      if (token) {
        util.localStorageSet(TOKEN, token);
      }
      console.log("傻逼傻逼：从地址tk获取到后放到storage:" + token);
      return token;
    },
    handleClick(e) {
      console.log(e);
    },
    addHouse() {
      this.$router.push({ path: "/buySellSystem/addHouse" });
    }
  }
};
</script>

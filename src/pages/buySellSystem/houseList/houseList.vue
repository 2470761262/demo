<style lang="less" scoped>
.page-back-color {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.nav-back {
  background: #fff;
  padding-bottom: 20px;
}
.page-house-cell {
  display: flex;
  .house-left-tips {
    width: 140px;
    //  height: 200px;
    display: flex;
    align-items: center;
    > span {
      display: block;
      writing-mode: vertical-lr;
      width: fit-content;
      margin: 0 auto;
      color: var(--color--primary);
      font-size: 18px;
    }
  }
  &.for-house-cell {
    flex-wrap: wrap;
    flex: 1;
    margin: 0 -25px;
    .house-cell-item {
      flex: 0 0 16.666%;
      height: 60px;
      margin-top: 25px;
      padding: 0 25px;
      box-sizing: border-box;
      position: relative;
      min-width: 0;
      cursor: pointer;
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
          font-size: 22px;
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
      height: 70px;
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
      .hide-query {
        position: absolute;
        right: 0;
        padding-right: 10px;
        top: 500px;
        font-size: 20px;
        cursor: pointer;
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
             :class="{'item-hot':item.hot}">
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
        <div class="house-cell-but">
          <i class="el-icon-plus"></i>
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
import houseresultlist from '@/pages/buySellSystem/houseList/components/houseResultList';
const HosueList = [
  { title: "我的房源", icon: "el-icon-zoom-in", path: "/buySellSystem/myHouseList", hot: false, flag: false },
  { title: "7天被带看", icon: "el-icon-zoom-in", path: "/buySellSystem/sevenDaysFollowHouse", hot: true, flag: false },
  { title: "新增房源", icon: "el-icon-zoom-in", path: "/buySellSystem/newAgentHouse", hot: false, flag: false },
  { title: "我的核心盘", icon: "el-icon-zoom-in", path: "/buySellSystem/concernCommunity", hot: false, flag: false },
  { title: "成交对赌", icon: "el-icon-zoom-in", path: "", hot: true, flag: false },
  { title: "总监推荐", icon: "el-icon-zoom-in", path: "/buySellSystem/chiefRecommendHouse", hot: true, flag: false },
  { title: "钥匙房源", icon: "el-icon-zoom-in", path: "", hot: false, flag: false },
  { title: "独家房源", icon: "el-icon-zoom-in", path: "/buySellSystem/soleHouse", hot: false, flag: false },
  { title: "店公共盘", icon: "el-icon-zoom-in", path: "", hot: false },
  { title: "我的关注", icon: "el-icon-zoom-in", path: "/buySellSystem/myConcern", hot: false, flag: false },
  { title: "在售无跟单", icon: "el-icon-zoom-in", path: "", hot: false, flag: false },
  { title: "全部在售", icon: "el-icon-zoom-in", path: "", hot: false, flag: false },
  { title: "店长推荐", icon: "el-icon-zoom-in", path: "/buySellSystem/shopownerRecommendHouse", hot: false, flag: false },
];
import getToken from "@/minxi/getUrlToken";
export default {
  provide () {
    return {
      form: this.form,
      Slider: this.Slider
    }
  },
  name: "houseList",
  mixins: [getToken],
  components: {
    houselistlhousepair,
    houseresultlist
  },
  data () {
    return {
      querySelectFlag: false,
      houseMenuList: HosueList,
      Slider: {
        priceSlider: [20, 20],
        areaSlider: [20, 20],
        flootSlider: [-2, -2],
      },
      form: {
        business: [],
        houseType: [],
        renovation: [],
        purpose: [],
        orientation: [],
        primarySchool: [],
        middleSchool: [],
        comId: '',
        cbId: '',
        roomNo: '',
        minFloor: '',
        maxFloor: '',
        minInArea: '',
        maxInArea: '',
        minPrice: '',
        maxPrice: '',
        face: []
      }
    };
  },
  created () {
    console.log("===========" + JSON.stringify(this.GetRequest()));
  },
  methods: {
    setSelectNav (item) {
      item.flag = !item.flag;
    },
    //跳转页面
    navToPath (path) {
      this.$router.push({ path: path });
    },
    GetRequest () {
      var url = location.href; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
    handleClick (e) {
      console.log(e);
    },
    addHouse () {
      this.$router.push({ path: "/buySellSystem/addHouse" });
    }
  }
};
</script>

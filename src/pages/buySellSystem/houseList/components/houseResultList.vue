<style lang="less" scoped>
@import "~@/pages/customersSystem/addCustomers/less/form.less";
.page-result-content {
  padding: 0 24px;
  background: #fff;
  .page-result-head {
    display: flex;
    // justify-content: space-between;
    //padding: 24px 0;
    padding-top: 24px;
    .head-content-input {
      width: 494px;
      height: 48px;
      display: flex;
      .content-input {
        width: 411px;
        border: 1px solid rgba(206, 206, 206, 1);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        text-indent: 16px;
        // line-height: 48px;
        height: 100%;
        box-sizing: border-box;
        outline: none;
        font-size: @font16;
        &::placeholder {
          font-size: @font16;
        }
      }
      .inquire-content {
        flex: 1;
        background: @backgroud;
        outline: none;
        border: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        font-size: @font24;
        color: #fff;
      }
    }
    .head-fun-right {
      flex: 1;
      text-align: right;
      .btn-primary {
        color: @backgroud;
        border-radius: 4px;
        height: 100%;
        box-sizing: border-box;
        &.active {
          background: @backgroud;
        }
      }
    }
  }
  // <!-- nav类型切换 -->
  .tab-content {
    //  display: flex;
    &::after {
      content: "";
      display: block;
      height: 1px;
      margin-top: 13px;
      background: rgba(240, 242, 245, 1);
    }
    .tab-content-nav {
      display: flex;
      margin-top: 32px;
      .tab-content-item {
        font-size: @font16;
        margin-right: 32px;
        position: relative;
        color: rgba(96, 98, 102, 1);
        cursor: pointer;
        &.active {
          color: @backgroud;
          font-weight: bold;

          &::after {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 2px;
            background: @backgroud;
            width: 100%;
            left: 0;
          }
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  // <!-- 选择楼盘 & 楼栋 & 房间号 & 跟单人姓名 -->
  .cascader-content {
    display: flex;
    padding: 24px 0;
    border-bottom: 1px solid #f0f2f5;
    .input-content {
      @width: auto;
      margin-right: 24px;
      &:last-child {
        margin-right: 0;
      }
      .step-content > .input-group > .input-content;
    }
    .cascader-content-build {
      flex: 1;
    }
    .btn-primary-back {
      margin-left: 0;
    }
  }
  .search-content {
    &.no-frist {
      .search-content-item {
        &:first-child {
          margin-top: 19px;
        }
      }
    }
    .search-content-item {
      display: flex;
      margin-top: 19px;
      align-items: center;
      &:first-child {
        margin-top: 24px;
      }

      .search-item-title {
        width: 80px;
        font-size: @font14;
        font-weight: bold;
        color: rgba(48, 49, 51, 1);
        flex-shrink: 0;
      }
      .search-item-right {
        display: flex;
        align-items: center;
        &.is-samall {
          flex-wrap: wrap;
          @media screen and (max-width: 1450px) {
            .input-group,
            .btn-primary-back {
              // margin-bottom: 0px;
              margin-top: 10px;
            }
            .data-content {
              flex: 0 0 100%;
            }
          }
        }
        .input-group {
          @width: auto;
          margin-bottom: 5px;
          .step-content > .input-group;
          .input-content {
            width: 110px;
            height: 36px;
            @media screen and (max-width: 1450px) {
              width: 140px;
            }
          }
          margin-top: 0;

          /deep/.el-input__inner {
            line-height: 36px !important;
            height: 36px !important;
            padding-left: 10px;
            font-size: @font14 !important;
            padding-right: 36px !important;
            //min-width: 110px;
            &::placeholder {
              font-size: @font14 !important;
              //  line-height: 34px !important;
            }
          }
          .suffix-tips {
            line-height: 36px !important;
            font-size: @font14 !important;
            margin-right: 8px !important;
          }
        }
        /deep/.el-radio {
          margin-bottom: 5px;
          .el-radio__input {
            display: none;
          }
          &.is-checked {
            border-color: @backgroud !important;
          }
          &.is-bordered {
            padding: 9px 16px;
            height: auto;
            margin-right: 24px;
            margin-left: 0;
            border-color: transparent;
          }
          .el-radio__label {
            padding: 0;
            font-size: @font14;
          }
        }
        /deep/.el-checkbox-group {
          margin-bottom: 5px;
        }
        /deep/.el-checkbox {
          margin-right: 24px;
          .el-checkbox__label {
            font-size: @font14;
          }
        }
        .select-content {
          margin-bottom: 5px;
          .input-content {
            @width: auto;
            margin-right: 24px;
            height: 36px !important;
            &:last-child {
              margin-right: 0;
            }
            .step-content > .input-group > .input-content;
            /deep/.el-input__inner {
              height: 36px !important;
              line-height: 36px !important;
              font-size: @font14 !important;
              &::placeholder {
                font-size: @font14 !important;
              }
            }
            /deep/.el-input__icon {
              line-height: 36px !important;
            }
          }
        }
        .btn-primary-back {
          height: 36px;
          margin-bottom: 5px;
          font-size: @font14;
          flex-shrink: 0;
        }
      }
    }
  }
}
.change-content {
  text-align: center;
  padding-bottom: 24px;
  margin-top: 24px;
  cursor: pointer;
  color: @backgroud;
  font-size: @font16;
  .iconfont {
    margin-left: 8px;
    font-size: @font14;
    transition: transform 0.3s;
    transform: rotateZ(180deg);
    display: inline-block;
    &.rotate {
      transform: rotateZ(0deg) !important;
    }
  }
}
.btn-primary {
  .btn-primary();
}
.btn-primary-back {
  .btn-primary-back();
}
.options-item {
  .options-item;
}
</style>
<template>
  <div class="page-result-content">
    <div class="page-result-head">
      <div class="head-content-input">
        <input
          type="text"
          placeholder="请输入房源编号,楼盘名称"
          class="content-input"
        />
        <button class="inquire-content">
          <i class="el-icon-search"></i>
        </button>
      </div>
      <button class="btn-primary">录入客源</button>
      <div class="head-fun-right">
        <button class="btn-primary">管理入口</button>
        <button class="btn-primary">我的房源</button>
      </div>
    </div>
    <!-- nav类型切换 -->
    <div class="tab-content">
      <div class="tab-content-nav">
        <div
          class="tab-content-item "
          :class="{ active: typeActiveIndex == index }"
          v-for="(item, index) in typeList"
          :key="index"
          @click="changeNavTypeIndex(index)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <!-- 选择楼盘 & 楼栋 & 房间号 & 跟单人姓名 -->
    <div class="cascader-content">
      <div class="cascader-content-build">
        <!-- 楼栋 -->
        <el-select
          v-model="mock"
          placeholder="请输入楼盘名称"
          class="input-content"
          clearable
          filterable
          popper-class="options-item"
        >
          <el-option
            class="options-item"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- 栋座 -->
        <el-select
          v-model="mock"
          placeholder="请输入栋座"
          clearable
          filterable
          class="input-content"
          popper-class="options-item"
        >
          <el-option
            class="options-item"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- 房间号 -->
        <el-select
          v-model="mock"
          placeholder="请输入房间号"
          clearable
          filterable
          popper-class="options-item"
          class="input-content"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <el-input type="text" placeholder="跟单人姓名" class="input-content" />
      <button class="btn-primary-back">搜索</button>
    </div>
    <!-- 查询盒子 -->
    <div class="search-content">
      <!-- 范围 -->
      <div class="search-content-item">
        <div class="search-item-title">范围</div>
        <div class="search-item-right">
          <el-radio-group v-model="mock1" size="small">
            <el-radio label="1" border>不限</el-radio>
            <el-radio label="2" border>跟单房源</el-radio>
            <el-radio label="3" border>店公共盘</el-radio>
            <el-radio label="4" border>公司公盘</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 类型 -->
      <div class="search-content-item">
        <div class="search-item-title">类型</div>
        <div class="search-item-right">
          <el-radio-group v-model="mock1" size="small">
            <el-radio label="1" border>不限</el-radio>
            <el-radio label="2" border>我的相关</el-radio>
            <el-radio label="3" border>关注房源</el-radio>
            <el-radio label="4" border>3天新上房源</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 商圈 -->
      <div class="search-content-item">
        <div class="search-item-title">商圈</div>
        <div class="search-item-right">
          <el-radio-group v-model="mock1" size="small">
            <el-radio label="1" border>不限</el-radio>
            <el-radio label="2" border>中城</el-radio>
            <el-radio label="3" border>东城</el-radio>
            <el-radio label="4" border>南城</el-radio>
            <el-radio label="5" border>北城</el-radio>
            <el-radio label="6" border>莲东</el-radio>
            <el-radio label="7" border>曹溪</el-radio>
            <el-radio label="8" border>东肖</el-radio>
            <el-radio label="9" border>西城</el-radio>
            <el-radio label="10" border>大洋</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="search-content no-frist" v-show="panelChange">
      <!-- 范围 -->
      <div class="search-content-item">
        <div class="search-item-title">范围</div>
        <div class="search-item-right is-samall">
          <div class="data-content">
            <el-radio-group v-model="mock1" size="small">
              <el-radio label="1" border>不限</el-radio>
              <el-radio label="2" border>100万以下</el-radio>
              <el-radio label="3" border>100-150万</el-radio>
              <el-radio label="4" border>150-200万</el-radio>
              <el-radio label="5" border>200-250万</el-radio>
              <el-radio label="6" border>250-300万</el-radio>
              <el-radio label="7" border>300-500万</el-radio>
              <el-radio label="8" border>500-1000万</el-radio>
              <el-radio label="9" border>1000万以上</el-radio>
            </el-radio-group>
          </div>
          <div class="input-group">
            <div class="input-group-split">
              <el-input
                placeholder="最小值"
                class="input-content is-suffix"
                v-model="mock"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">万元</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                class="input-content is-suffix"
                v-model="mock"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">万元</i>
                </template>
              </el-input>
            </div>
          </div>
          <button class="btn-primary-back">确定</button>
        </div>
      </div>
      <!-- 面积 -->
      <div class="search-content-item">
        <div class="search-item-title">面积</div>
        <div class="search-item-right is-samall">
          <div class="data-content">
            <el-radio-group v-model="mock1" size="small">
              <el-radio label="1" border>不限</el-radio>
              <el-radio label="2" border>50㎡以下</el-radio>
              <el-radio label="3" border>50-70㎡</el-radio>
              <el-radio label="4" border>70-90㎡</el-radio>
              <el-radio label="5" border>90-110㎡</el-radio>
              <el-radio label="6" border>110-130㎡</el-radio>
              <el-radio label="7" border>130-150㎡</el-radio>
              <el-radio label="8" border>150-200㎡</el-radio>
              <el-radio label="9" border>200㎡以上</el-radio>
            </el-radio-group>
          </div>
          <div class="input-group">
            <div class="input-group-split">
              <el-input
                placeholder="最小值"
                class="input-content is-suffix"
                v-model="mock"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">㎡</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                class="input-content is-suffix"
                v-model="mock"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">㎡</i>
                </template>
              </el-input>
            </div>
          </div>
          <button class="btn-primary-back">确定</button>
        </div>
      </div>
      <!-- 房型 -->
      <div class="search-content-item">
        <div class="search-item-title">房型</div>
        <div class="search-item-right is-samall">
          <div class="data-content">
            <el-radio-group v-model="mock1" size="small">
              <el-radio label="1" border>不限</el-radio>
              <el-radio label="2" border>1房</el-radio>
              <el-radio label="3" border>2房</el-radio>
              <el-radio label="4" border>3房</el-radio>
              <el-radio label="5" border>4房</el-radio>
              <el-radio label="6" border>5房</el-radio>
              <el-radio label="7" border>5房以上</el-radio>
            </el-radio-group>
          </div>
          <div class="input-group">
            <div class="input-group-split">
              <el-input
                placeholder="最小值"
                class="input-content is-suffix"
                v-model="mock"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">房</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                class="input-content is-suffix"
                v-model="mock"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">房</i>
                </template>
              </el-input>
            </div>
          </div>
          <button class="btn-primary-back">确定</button>
        </div>
      </div>
      <!-- 房型 -->
      <div class="search-content-item">
        <div class="search-item-title">房型</div>
        <div class="search-item-right">
          <el-radio label="1" border v-model="mock3">不限</el-radio>
          <el-checkbox-group v-model="mock2">
            <el-checkbox label="东"></el-checkbox>
            <el-checkbox label="东南"></el-checkbox>
            <el-checkbox label="南"></el-checkbox>
            <el-checkbox label="西南"></el-checkbox>
            <el-checkbox label="西"></el-checkbox>
            <el-checkbox label="西北"></el-checkbox>
            <el-checkbox label="北"></el-checkbox>
            <el-checkbox label="东北"></el-checkbox>
            <el-checkbox label="南北"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 用途 -->
      <div class="search-content-item">
        <div class="search-item-title">用途</div>
        <div class="search-item-right">
          <el-radio label="1" border v-model="mock3">不限</el-radio>
          <el-checkbox-group v-model="mock2">
            <el-checkbox label="普通住宅"></el-checkbox>
            <el-checkbox label="车位"></el-checkbox>
            <el-checkbox label="别墅"></el-checkbox>
            <el-checkbox label="商业"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 小学 -->
      <div class="search-content-item">
        <div class="search-item-title">小学</div>
        <div class="search-item-right">
          <el-radio-group v-model="mock1" size="small">
            <el-radio label="1" border>不限</el-radio>
            <el-radio label="2" border>龙岩实验学校</el-radio>
            <el-radio label="3" border>西安小学</el-radio>
            <el-radio label="4" border>中街小学</el-radio>
          </el-radio-group>
          <div class="select-content">
            <el-select
              v-model="mock"
              placeholder="请输入划片小学"
              class="input-content"
              clearable
              filterable
              popper-class="options-item"
            >
              <el-option
                class="options-item"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <button class="btn-primary-back">确定</button>
        </div>
      </div>
      <!-- 中学 -->
      <div class="search-content-item">
        <div class="search-item-title">中学</div>
        <div class="search-item-right">
          <el-radio-group v-model="mock1" size="small">
            <el-radio label="1" border>不限</el-radio>
            <el-radio label="2" border>龙岩初级中学</el-radio>
            <el-radio label="3" border>龙岩七中</el-radio>
            <el-radio label="4" border>龙岩八中</el-radio>
          </el-radio-group>
          <div class="select-content">
            <el-select
              v-model="mock"
              placeholder="请输入划片中学"
              class="input-content"
              clearable
              filterable
              popper-class="options-item"
            >
              <el-option
                class="options-item"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <button class="btn-primary-back">确定</button>
        </div>
      </div>
    </div>
    <div class="change-content" @click="panelChangeBtn">
      展开选项/收起<i
        class="iconfont iconxingzhuangjiehe1"
        :class="{ rotate: panelChange }"
      ></i>
    </div>
  </div>
</template>

<script>
//切换tab类型
const TYPELIST = [
  {
    label: "全部房源",
    value: 0
  },
  {
    label: "学区找房",
    value: 1
  },
  {
    label: "成交房源",
    value: 2
  },
  {
    label: "成交对赌",
    value: 3
  },
  {
    label: "地图找房",
    value: 4
  }
];
export default {
  data() {
    return {
      typeList: TYPELIST,
      typeActiveIndex: 0, //nav类型激活Index
      panelChange: true, //折叠面板
      mock: "",
      mock1: "1",
      mock2: [],
      mock3: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      RegionList: [], //商圈
      faceList: [], //朝向
      PrimarySchoolList: [], //小学
      MiddleSchoolList: [], //中学
      RoomsList: [], //房型
      RenovationList: [], //装修
      PurposeList: [] //用途
    };
  },
  created() {
    this.mapGetPanelData();
  },
  methods: {
    /**
     * @example: 修改nav类型激活Index
     * @param {Number}  index
     */
    changeNavTypeIndex(index) {
      if (index != this.typeActiveIndex) {
        this.typeActiveIndex = index;
      }
    },
    /**
     * @example: 折叠面板
     */
    panelChangeBtn() {
      this.panelChange = !this.panelChange;
    },
    /**
     * @example: 获取筛选列表
     * @param {String}  constant 列表名称
     */
    queryConstant(constant) {
      return this.$api
        .get({
          url: "/mateHouse/queryConstant",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            constant: constant
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            return [e.data.data, constant];
          }
        });
    },
    /**
     * @example: 统一获取列表数据
     */
    mapGetPanelData() {
      //需要获取接口的数据对象
      //key 传递接口的数据参数
      //value 返回值结果对象名称
      const panelMap = new Map([
        ["Region", "RegionList"],
        ["face", "faceList"],
        ["PrimarySchoo", "PrimarySchoolList"],
        ["MiddleSchool", "MiddleSchoolList"],
        ["Rooms", "RoomsList"],
        ["Renovation", "RenovationList"],
        ["Purpose", "PurposeList"]
      ]);
      for (let item of panelMap.keys()) {
        this.queryConstant(item).then(([data, itemName]) => {
          this[panelMap.get(itemName)] = data;
        });
      }
    }
  }
};
</script>

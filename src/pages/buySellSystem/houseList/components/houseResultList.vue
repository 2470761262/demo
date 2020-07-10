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
        cursor: pointer;
      }
    }
    .head-fun-right {
      flex: 1;
      text-align: right;
      .fun-right-border {
        .btn-primary {
          min-width: 115px;
          margin-left: 0;
          border: none;
          color: @backgroud;
          border-radius: 4px;
          height: 100%;
          &.active {
            background: @backgroud;
          }
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
        &.small {
          font-size: @font14;
        }
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
      margin-right: 40px;
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
          .input-split {
            margin: 0 8px !important;
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
  color: @backgroud;
  font-size: @font16;
  span {
    cursor: pointer;
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
}
.btn-primary {
  .btn-primary;
}
.btn-primary-back {
  .btn-primary-back();
}
.options-item {
  .options-item;
}
.options-custom-item {
  .options-item;
  .el-select-dropdown__item {
    display: flex;
    /deep/span {
      flex: 1;
      width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
<template>
  <div class="page-result-content">
    <!-- 房屋类型 -->
    <div class="tab-content">
      <div class="tab-content-nav">
        <div
          class="tab-content-item small"
          :class="{ active: 0 == index }"
          v-for="(item, index) in navToPage"
          :key="index"
          @click="navToPageBtn(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <!-- 头部按钮, 搜索 -->
    <div class="page-result-head">
      <div class="head-content-input">
        <input
          type="text"
          placeholder="请输入房源编号,楼盘名称"
          class="content-input"
          v-model="houseNoOrName"
        />
        <button class="inquire-content" @click="handleHouseNoOrName">
          <i class="el-icon-search"></i>
        </button>
      </div>
      <div class="head-fun-right">
        <button
          class="btn-primary"
          @click="navToPath('/buySellSystem/addHouse')"
        >
          录入房源
        </button>
        <button
          class="btn-primary"
          @click="navToPath('/buySellSystem/concernCommunity')"
        >
          管理入口
        </button>
        <button
          class="btn-primary"
          @click="navToPath('/buySellSystem/myAgent')"
        >
          我的房源
        </button>
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
          v-model="buildOptData"
          placeholder="请输入楼盘名称"
          class="input-content"
          clearable
          filterable
          remote
          popper-class="options-custom-item"
          @focus="remoteBuildInput"
          @change="remoteBuildChange"
          :remote-method="buildRemoteMethod"
          :loading="buildLoading"
          value-key="value"
        >
          <el-option
            v-for="item in buildForList"
            :key="item.value"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
        <!-- 栋座 -->
        <el-select
          v-model="towerOptData"
          placeholder="请输入栋座"
          clearable
          filterable
          class="input-content"
          popper-class="options-custom-item"
          value-key="value"
          remote
          :remote-method="queryRoomNo"
          @change="remoteRoomNoChange"
          :loading="towerLoading"
        >
          <el-option
            v-for="item in towerForList"
            :key="item.value"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
        <!-- 房间号 -->
        <el-select
          v-model="roomOptData"
          placeholder="请输入房间号"
          clearable
          filterable
          popper-class="options-custom-item"
          class="input-content"
          remote
          :remote-method="queryRoomData"
          :loading="roomLoading"
          value-key="value"
          @change="queryRoomDataChange"
        >
          <el-option
            v-for="item in roomForList"
            :key="item.value"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>

      <el-input
        type="text"
        v-model="agentPerName"
        placeholder="跟单人姓名"
        class="input-content"
      />
      <button class="btn-primary-back" @click="handleAgentPerName">搜索</button>
    </div>
    <!-- 查询盒子 -->
    <div class="search-content">
      <!-- 范围 -->
      <div class="search-content-item">
        <div class="search-item-title">范围</div>
        <div class="search-item-right">
          <el-radio-group v-model="form.plate" size="small">
            <el-radio label="" border>不限</el-radio>
            <el-radio label="0" border>跟单房源</el-radio>
            <el-radio label="1" border>店公共盘</el-radio>
            <el-radio label="4" border>公司公盘</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 类型 -->
      <div class="search-content-item">
        <div class="search-item-title">类型</div>
        <div class="search-item-right">
          <el-radio-group v-model="form.type" size="small">
            <el-radio label="" border>不限</el-radio>
            <el-radio label="1" border>我的相关</el-radio>
            <el-radio label="2" border>关注房源</el-radio>
            <el-radio label="3" border>3天新上房源</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 商圈 -->
      <div class="search-content-item" v-if="RegionList.length != 0">
        <div class="search-item-title">商圈</div>
        <div class="search-item-right">
          <el-radio-group v-model="form.business" size="small">
            <el-radio label="" border>不限</el-radio>
            <el-radio
              :label="item.value"
              border
              v-for="item in RegionList"
              :key="item.value"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="search-content no-frist" v-show="panelChange">
      <!-- 价钱 -->
      <div class="search-content-item">
        <div class="search-item-title">价钱</div>
        <div class="search-item-right is-samall">
          <div class="data-content">
            <el-radio-group
              v-model="price.radioCheck"
              size="small"
              @change="
                packCheckChange(
                  'scopepricelist',
                  'minPrice',
                  'maxPrice',
                  'price',
                  $event
                )
              "
            >
              <el-radio
                :label="item.title"
                border
                v-for="item in scopepricelist"
                :key="item.title"
                >{{ item.title }}</el-radio
              >
            </el-radio-group>
          </div>
          <div class="input-group">
            <div class="input-group-split">
              <el-input
                placeholder="最小值"
                class="input-content is-suffix"
                v-model="price.minPrice"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">万元</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                class="input-content is-suffix"
                v-model="price.maxPrice"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">万元</i>
                </template>
              </el-input>
            </div>
          </div>
          <button
            class="btn-primary-back"
            @click="submitFormBtn('price', 'minPrice', 'maxPrice')"
          >
            确定
          </button>
        </div>
      </div>
      <!-- 面积 -->
      <div class="search-content-item">
        <div class="search-item-title">面积</div>
        <div class="search-item-right is-samall">
          <div class="data-content">
            <el-radio-group
              v-model="area.radioCheck"
              size="small"
              @change="
                packCheckChange(
                  'arealist',
                  'minInArea',
                  'maxInArea',
                  'area',
                  $event
                )
              "
            >
              <el-radio
                :label="item.title"
                border
                v-for="item in arealist"
                :key="item.title"
                >{{ item.title }}</el-radio
              >
            </el-radio-group>
          </div>
          <div class="input-group">
            <div class="input-group-split">
              <el-input
                placeholder="最小值"
                class="input-content is-suffix"
                v-model="area.minInArea"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">㎡</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                class="input-content is-suffix"
                v-model="area.maxInArea"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">㎡</i>
                </template>
              </el-input>
            </div>
          </div>
          <button
            class="btn-primary-back"
            @click="submitFormBtn('area', 'minInArea', 'maxInArea')"
          >
            确定
          </button>
        </div>
      </div>
      <!-- 房型 -->
      <div class="search-content-item" v-if="RoomsList.length != 0">
        <div class="search-item-title">房型</div>
        <div class="search-item-right is-samall">
          <div class="data-content">
            <el-radio-group
              v-model="room.value"
              size="small"
              @change="roomChange"
            >
              <el-radio label="不限" border>不限</el-radio>
              <el-radio
                :label="item.value"
                border
                v-for="item in RoomsList"
                :key="item.value"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </div>
          <div class="input-group">
            <div class="input-group-split">
              <el-input
                placeholder="最小值"
                class="input-content is-suffix"
                v-model="room.minRoom"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">房</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                class="input-content is-suffix"
                v-model="room.maxRoom"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">房</i>
                </template>
              </el-input>
            </div>
          </div>
          <button class="btn-primary-back" @click="roomSubmit">确定</button>
        </div>
      </div>
      <!-- 楼层 -->
      <div class="search-content-item">
        <div class="search-item-title">楼层</div>
        <div class="search-item-right is-samall">
          <div class="data-content">
            <el-radio-group
              v-model="floor.radioCheck"
              size="small"
              @change="
                packCheckChange(
                  'floorlist',
                  'minFloor',
                  'maxFloor',
                  'floor',
                  $event
                )
              "
            >
              <el-radio
                :label="item.title"
                border
                v-for="item in floorlist"
                :key="item.title"
                >{{ item.title }}</el-radio
              >
            </el-radio-group>
          </div>
          <div class="input-group">
            <div class="input-group-split">
              <el-input
                placeholder="最小值"
                class="input-content is-suffix"
                v-model="floor.minFloor"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">层</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                class="input-content is-suffix"
                v-model="floor.maxFloor"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">层</i>
                </template>
              </el-input>
            </div>
          </div>
          <button
            class="btn-primary-back"
            @click="submitFormBtn('floor', 'minFloor', 'maxFloor')"
          >
            确定
          </button>
        </div>
      </div>
      <!-- 朝向 -->
      <div class="search-content-item" v-if="faceList.length != 0">
        <div class="search-item-title">朝向</div>
        <div class="search-item-right">
          <el-radio
            label="不限"
            border
            v-model="faceRadio"
            @change="radioChange('face')"
            >不限</el-radio
          >
          <el-checkbox-group
            v-model="form.face"
            @change="formCheckBoxChange('faceRadio')"
          >
            <el-checkbox
              :label="item.name"
              v-for="item in faceList"
              :key="item.value"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 装修 -->
      <div class="search-content-item" v-if="RenovationList.length != 0">
        <div class="search-item-title">装修</div>
        <div class="search-item-right">
          <el-radio
            label="不限"
            border
            v-model="renovationRadio"
            @change="radioChange('renovation')"
            >不限</el-radio
          >
          <el-checkbox-group
            v-model="form.renovation"
            @change="formCheckBoxChange('renovationRadio')"
          >
            <el-checkbox
              :label="item.name"
              v-for="item in RenovationList"
              :key="item.value"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 用途 -->
      <div class="search-content-item" v-if="PurposeList.length != 0">
        <div class="search-item-title">用途</div>
        <div class="search-item-right">
          <el-radio
            label="不限"
            border
            v-model="purposeRadio"
            @change="radioChange('purpose')"
            >不限</el-radio
          >
          <el-checkbox-group
            v-model="form.purpose"
            @change="formCheckBoxChange('purposeRadio')"
          >
            <el-checkbox
              :label="item.name"
              v-for="item in PurposeList"
              :key="item.value"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 小学 -->
      <div class="search-content-item" v-if="PrimarySchoolList.length != 0">
        <div class="search-item-title">小学</div>
        <div class="search-item-right">
          <el-radio-group v-model="form.primarySchool" size="small">
            <el-radio label="" border>不限</el-radio>
            <el-radio border v-for="item in mathPrimary" :key="item.value">{{
              item.name
            }}</el-radio>
          </el-radio-group>
          <div class="select-content">
            <el-select
              v-model="primarySchool"
              placeholder="请输入划片小学"
              class="input-content"
              clearable
              filterable
              popper-class="options-custom-item"
              @change="schoolChange('primarySchool')"
            >
              <el-option
                class="options-item"
                v-for="item in mathPrimaryAfter"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <button class="btn-primary-back">确定</button>
        </div>
      </div>
      <!-- 中学 -->
      <div class="search-content-item" v-if="MiddleSchoolList.length != 0">
        <div class="search-item-title">中学</div>
        <div class="search-item-right">
          <el-radio-group v-model="form.middleSchool" size="small">
            <el-radio label="" border>不限</el-radio>
            <el-radio
              :label="item.value"
              border
              v-for="item in mathMiddle"
              :key="item.value"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
          <div class="select-content">
            <el-select
              v-model="middleSchool"
              placeholder="请输入划片中学"
              class="input-content"
              clearable
              filterable
              popper-class="options-custom-item"
              @change="schoolChange('middleSchool')"
            >
              <el-option
                class="options-item"
                v-for="item in mathMiddleAfter"
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
    <div class="change-content">
      <span @click="panelChangeBtn"
        >展开选项/收起<i
          class="iconfont iconxingzhuangjiehe1"
          :class="{ rotate: panelChange }"
        ></i
      ></span>
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
//范围价钱
const SCOPEPRICELIST = [
  { title: "不限", value: { minPrice: "", maxPrice: "" } },
  { title: "100万以下", value: { minPrice: "0", maxPrice: "100" } },
  { title: "100-150万", value: { minPrice: "100", maxPrice: "150" } },
  { title: "150-200万", value: { minPrice: "150", maxPrice: "200" } },
  { title: "200-250万", value: { minPrice: "200", maxPrice: "250" } },
  { title: "250-300万", value: { minPrice: "250", maxPrice: "300" } },
  { title: "300-500万", value: { minPrice: "300", maxPrice: "500" } },
  { title: "500-1000万", value: { minPrice: "500", maxPrice: "1000" } },
  { title: "1000万以上", value: { minPrice: "1000", maxPrice: "" } }
];
//范围面积
const AREALIST = [
  { title: "不限", value: { minInArea: "", maxInArea: "" } },
  { title: "50㎡以下", value: { minInArea: "0", maxInArea: "50" } },
  { title: "50-70㎡", value: { minInArea: "50", maxInArea: "70" } },
  { title: "70-90㎡", value: { minInArea: "70", maxInArea: "90" } },
  { title: "90-110㎡", value: { minInArea: "90", maxInArea: "110" } },
  { title: "110-130㎡", value: { minInArea: "110", maxInArea: "130" } },
  { title: "130-150㎡", value: { minInArea: "130", maxInArea: "150" } },
  { title: "150-200㎡", value: { minInArea: "150", maxInArea: "200" } },
  { title: "200㎡以上", value: { minInArea: "200", maxInArea: "" } }
];
//楼层
const FLOORLIST = [
  { title: "不限", value: { minFloor: "", maxFloor: "" } },
  { title: "地下室", value: { minFloor: "0", maxFloor: "-4" } },
  { title: "一层", value: { minFloor: "1", maxFloor: "1" } },
  { title: "顶层", value: { minFloor: "MAX_FLOOR", maxFloor: "MAX_FLOOR" } }
];
//跳转tab
const NAVTOPAGE = [
  { title: "买卖", private: true, url: "" },
  { title: "租赁", private: false, url: "" },
  { title: "新房", private: false, url: "" },
  { title: "商铺写字楼", private: false, url: "" },
  { title: "小区", private: false, url: "" }
];
export default {
  inject: ["form"],
  data() {
    return {
      navToPage: NAVTOPAGE, //顶部跳转tab
      agentPerName: "", //跟单人姓名
      houseNoOrName: "", //房源编号,楼盘名称
      primarySchool: "", //小学select
      middleSchool: "", //中学Select
      purposeRadio: "不限", //房屋用途radio不限
      renovationRadio: "不限", //装修radio不限
      faceRadio: "不限", //朝向radio不限
      price: {
        radioCheck: "不限", //单选
        minPrice: "", //最小价钱
        maxPrice: "" //最高价钱
      },
      area: {
        radioCheck: "不限", //单选
        minInArea: "", // 最小面积
        maxInArea: "" // 最高面积
      },
      floor: {
        radioCheck: "不限", //单选
        minFloor: "", //最低楼层
        maxFloor: "" //最高楼层
      },
      room: {
        value: "不限", //单选
        minRoom: "", //最低房型
        maxRoom: "" //最高房型
      },
      typeList: TYPELIST,
      floorlist: FLOORLIST, //楼层
      scopepricelist: SCOPEPRICELIST, //范围价钱
      arealist: AREALIST, //面积范围
      roomOptData: {}, //房间号选中数据
      roomForList: [], //房间号select数据
      roomLoading: false, //房间号select loading
      towerOptData: {}, //栋座选中数据
      towerForList: [], //栋座select数据
      towerLoading: false, //栋座select loading
      buildOptData: {}, //当前楼盘选择数据
      buildForList: [], //楼盘select数据
      buildLoading: false, //楼盘select loading
      typeActiveIndex: 0, //nav类型激活Index
      panelChange: true, //折叠面板
      RegionList: [], //商圈
      faceList: [], //朝向
      PrimarySchoolList: [], //小学
      MiddleSchoolList: [], //中学
      RoomsList: [], //房型
      RenovationList: [], //装修
      PurposeList: [] //用途
    };
  },
  computed: {
    mathPrimary() {
      if (this.PrimarySchoolList.length == 0) return [];
      return this.PrimarySchoolList.slice(0, 4);
    },
    mathPrimaryAfter() {
      if (this.PrimarySchoolList.length < 4) return [];
      return this.PrimarySchoolList.slice(4);
    },
    mathMiddle() {
      if (this.MiddleSchoolList.length == 0) return [];
      return this.MiddleSchoolList.slice(0, 4);
    },
    mathMiddleAfter() {
      if (this.MiddleSchoolList.length < 4) return [];
      return this.MiddleSchoolList.slice(4);
    }
  },
  created() {
    this.mapGetPanelData();
  },
  methods: {
    /**
     * @example: 顶部Tab点击
     * @param {Object} item
     */
    navToPageBtn(item) {
      if (!item.private) {
        this.$msgbox({
          title: "开发中",
          message: <div>开发中。。。</div>,
          showCancelButton: false
        });
      }
    },
    /**
     * @example: 搜索跟单人姓名
     */

    handleAgentPerName() {
      this.form.agentPerName = this.agentPerName;
    },
    //跳转页面
    navToPath(path) {
      this.$router.push({ path: path });
    },
    /**
     * @example: 处理房源编号，楼盘名称点击查询
     */

    handleHouseNoOrName() {
      this.form.keyWord = this.houseNoOrName;
    },
    /**
     * @example: 学校selectChange选择
     * @param {string } field
     * @param {string} e
     */
    schoolChange(field, e) {
      this.form[field] = e;
    },
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
    },
    /**
     * @example: 楼盘激活第一时获取数据
     */
    remoteBuildInput() {
      this.buildForList.length === 0 && this.buildRemoteMethod();
    },
    /**
     * @example: 楼盘选择更改触发事件
     * @param {Obejct} item 当前选中对象
     */
    remoteBuildChange(item) {
      const { name = undefined, value = undefined } = item;

      //如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      this.form.communityName = name ? name : "";
      this.form.comId = value ? value : "";

      //清理楼栋数据
      this.towerForList = [];
      this.form.cbId = "";
      this.form.queryRoomNo = "";
      this.towerOptData = {};

      //清理房间号数据
      this.form.roomNumber = "";
      this.form.roomNo = "";
      this.roomOptData = {};
      this.roomForList = [];

      //获取楼栋select
      this.queryRoomNo();
    },
    /**
     * @example: 远程获取楼盘信息
     */
    buildRemoteMethod(query) {
      var that = this;
      this.buildLoading = true;
      this.$api
        .get({
          url: "/community/houseList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            communityName: query
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.buildLoading = false;
            that.buildForList = e.data.data.list;
          }
        });
    },
    /**
     * @example: 获取栋座远程数据
     * @param {String} name 栋座名称
     */
    queryRoomNo(name) {
      this.towerLoading = true;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: this.form.comId,
            comBuildingName: name == undefined ? "" : name.trim(),
            limit: 300
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.towerForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.towerLoading = false;
        });
    },
    /**
     * @example: 楼栋选择更改触发事件
     * @param {Obejct} item 当前选中对象
     */
    remoteRoomNoChange(item) {
      const { name = undefined, value = undefined } = item;

      //如果删除或者手动删除传入空字符串将会把楼栋数据清理为空字符串
      this.form.queryRoomNo = name ? name : "";
      this.form.cbId = value ? value : "";

      //清理房间号数据
      this.form.roomNumber = "";
      this.form.roomNo = "";
      this.roomOptData = {};
      this.roomForList = [];

      //获取房间号数据
      this.queryRoomData();
    },
    /**
     * @example: 远程获取房间号信息
     * @param {String} e 输入搜索的文本
     */
    queryRoomData(e) {
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHousesBySale",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: this.form.comId,
            cbId: this.form.cbId,
            limit: 300,
            roomNo: e == undefined ? "" : e.trim()
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.roomForList = e.data.data.list;
          }
        })
        .finally(() => {
          this.roomLoading = false;
        });
    },
    /**
     * @example:房间号修改选中触发事件
     * @param {Ojbect} item 选中时选中的数据
     */
    queryRoomDataChange(item) {
      const { name = undefined, value = undefined } = item;

      this.form.roomNumber = name ? name : "";
      this.form.roomNo = value ? value : "";
    },
    /**
     * @example: 价钱范围,面积范围,面积范围,统一提交输入框的数据到form
     * @param { string } field  等于当前组件存放数据的父级对象名称
     * @param { string } min  等于form注入里的min名称 form 与 field min 对应
     * @param { string } max  等于form注入里的max名称 form 与 field max 对应
     */
    submitFormBtn(field, min, max) {
      if (this[field][min] === "" && this[field][max] === "") return;

      this[field].radioCheck = ""; //
      this.form[min] = this[field][min];
      this.form[max] = this[field][max];
    },
    /**
     * @example:传参封装方法 需要checkbox多选的统一封装
     * @param { stirng } scopeList 需要遍历的数组名称
     * @param { string } min 同上
     * @param { string } max 同上
     * @param { string } field 同上
     * @param { string } event change结果
     */
    packCheckChange(scopeList, min, max, field, event) {
      const [result] = this[scopeList].filter((fItem, fIndex) => {
        if (fItem.title == event) return fItem;
      });

      const { value } = result;

      this.form[min] = value[min];

      this.form[max] = value[max];

      this[field][min] = "";

      this[field][max] = "";
    },
    /**
     * @example: 房型的选择的change事件
     */
    roomChange(value) {
      this.room.maxRoom = "";
      this.room.minRoom = "";
      this.form.houseType = value == "不限" ? [] : [value];
    },
    /**
     * @example: room确定查询按钮事件
     */
    roomSubmit() {
      if (
        !(
          /^(-)?[1-9][0-9]*$/.test(this.room.minRoom) ||
          /^(-)?[1-9][0-9]*$/.test(this.room.maxRoom)
        )
      ) {
        this.$message.warning("请输入正负整数");
        return;
      }
      if (parseInt(this.room.minRoom) > parseInt(this.room.maxRoom)) {
        this.$message.warning("楼层最小值应该小于楼层最大值");
        return;
      }
      let result = [];
      for (
        let i = 0, end = this.room.maxRoom - this.room.minRoom;
        i <= end;
        i++
      ) {
        result.push(parseInt(this.room.minRoom) + i);
      }
      this.room.value = "";
      this.form.houseType = result;
    },
    /**
     * @example: 朝向radio change 事件
     * @param {string } field
     */
    radioChange(field) {
      this.form[field] = [];
    },
    /**
     * @example: 朝向checkboxChange事件
     *
     */
    formCheckBoxChange(field) {
      this[field] = "";
    }
  }
};
</script>

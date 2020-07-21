<style lang="less" scoped>
@import "~@/pages/customersSystem/addCustomers/less/form.less";
.page-result-content {
  //padding: 0 24px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  margin-bottom: 8px;
  .page-posi-sticky {
    background: #fff;
    z-index: 100;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 100;
  }
  .head-nav-type {
    background: #f6f7fb;
    display: flex;
    border-bottom: 1px solid #f0f2f5;
    .nav-type-item {
      font-size: @font16;
      font-weight: 600;
      color: #606266;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // prettier-ignore
      padding: 12PX 55PX;
      &.active {
        color: @backgroud;
        border-left: 1px solid #f0f2f5;
        border-right: 1px solid #f0f2f5;
        background: #fff;
      }
      &:first-child {
        border-left: none;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
  .page-result-head {
    display: flex;
    // justify-content: space-between;
    //padding: 24px 0;
    margin-top: 15px;
    padding: 0 15px;
    .head-content-input {
      // prettier-ignore
      width: 455PX;
      // prettier-ignore
      height: 40PX;
      display: flex;
      .content-input {
        // prettier-ignore
        width: 390PX;
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
          color: #a6aaaf;
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
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      margin-top: 15px;
      .btn-primary {
        display: flex;
        align-items: center;
        margin-left: 30px;
        font-size: @font16;
        border-radius: 30px;
        padding-top: 7px;
        padding-bottom: 7px;
        height: auto;
        i {
          font-size: @font16;
          margin-right: 5px;
        }
        &.house-back {
          background: @backgroud;
          color: #fff;
          box-shadow: 0 4px 10px @opacityBackground;
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
      // prettier-ignore
      margin-top: 9PX;
      background: rgba(240, 242, 245, 1);
    }
    .tab-content-nav {
      display: flex;
      // prettier-ignore
      margin-top: 15PX;
      // prettier-ignore
      padding: 0 15PX;
      .tab-content-item {
        font-size: @font18;
        // prettier-ignore
        margin-right: 32PX;
        position: relative;
        color: rgba(96, 98, 102, 1);
        cursor: pointer;
        &.small {
          font-size: @font14;
        }
        &.active {
          color: @backgroud;
          //   font-weight: bold;
          display: flex;
          align-items: center;
          &::after {
            content: "";
            position: absolute;
            // prettier-ignore
            bottom: -10PX;

            height: 2px;
            background: @backgroud;
            width: 100%;
            left: 0;
          }
          &::before {
            content: "";
            margin-right: 8px;
            background: @backgroud;
            // prettier-ignore
            width: 6PX;
            // prettier-ignore
            height: 6PX;
            border-radius: 50%;
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
    // prettier-ignore
    padding: 15PX;

    border-bottom: 1px solid #f0f2f5;
    // prettier-ignore
    @height35:35PX;
    .input-content {
      @width: auto;
      // prettier-ignore
      margin-right: 18PX;
      height: @height35 !important;
      &:last-child {
        margin-right: 0;
      }
      .step-content > .input-group > .input-content;
      &.input_180 {
        // prettier-ignore
        width: 180PX;
      }
      &.input_120 {
        // prettier-ignore
        width: 120PX;
      }
      &.input_102 {
        // prettier-ignore
        width: 102PX;
      }
      /deep/.el-input__inner {
        text-align: center;
        background: #f0f7fc;
        border: none;
        font-size: @font14;
        height: @height35;
        line-height: @height35;
        // box-shadow: ;
        &::placeholder {
          font-size: @font14;
          color: #a6aaaf;
        }
      }
      /deep/.el-icon-circle-close {
        line-height: @height35 !important;
      }
    }
    .cascader-content-build {
      // prettier-ignore
      margin-right: 18PX;
    }
    .btn-primary-back {
      margin-left: 0;
      height: @height35;
      padding: 0 35px;
    }
  }
  .search-content {
    &.no-frist {
      .search-content-item {
        &:first-child {
          // prettier-ignore
          margin-top: 19PX;
        }
      }
    }
    .search-content-item {
      display: flex;
      // prettier-ignore
      margin-top: 20PX;
      align-items: center;
      padding: 0 15px;
      &:first-child {
        margin-top: 18px;
      }

      .search-item-title {
        margin-right: 20px;
        font-size: @font16;
        color: black;
        flex-shrink: 0;
        margin-bottom: 5px;
      }
      .search-item-right {
        display: flex;
        align-items: center;
        /deep/.el-radio-group {
          white-space: nowrap;
        }
        // prettier-ignore
        @height26: 26PX;
        .input-group {
          @width: auto;
          margin-bottom: 5px;

          .step-content > .input-group;
          .input-content {
            // prettier-ignore
            width: 90PX;

            height: @height26;
            @media screen and (max-width: 1450px) {
              width: 140px;
            }
          }
          .input-split {
            margin: 0 8px !important;
          }
          margin-top: 0;

          /deep/.el-input__inner {
            line-height: @height26 !important;
            height: @height26 !important;
            padding-left: 10px;
            font-size: @font12 !important;
            padding-right: 24px !important;
            //min-width: 110px;
            &::placeholder {
              font-size: @font12 !important;
              //  line-height: 34px !important;
            }
          }
          .suffix-tips {
            line-height: @height26 !important;
            font-size: @font12 !important;
            margin-right: 8px !important;
          }
        }
        /deep/.el-radio {
          margin-bottom: 5px;
          &:first-child {
            margin-right: 25px;
          }
          margin-right: 41px;
          .el-radio__input {
            display: none;
          }
          &.is-checked {
            background: @backgroud;
            .el-radio__label {
              color: #fff;
            }
          }
          &.is-bordered {
            height: auto;
            padding: 4px 5px;
            //  margin-right: 30px;
            margin-left: 0;
            border: none;
          }
          .el-radio__label {
            padding: 0;
            font-size: @font16;
            font-weight: 400;
          }
        }
        /deep/.el-checkbox-group {
          margin-bottom: 5px;
        }
        /deep/.el-checkbox {
          margin-right: 24px;
          .el-checkbox__label {
            font-size: @font16;
          }
        }

        .select-content {
          margin-bottom: 5px;
          .input-content {
            // prettier-ignore
            @width: 140PX;
            // prettier-ignore
            margin-right: 24PX;
            // prettier-ignore
            height: @height26 !important;
            &:last-child {
              margin-right: 0;
            }
            .step-content > .input-group > .input-content;
            /deep/.el-input__inner {
              height: @height26 !important;
              line-height: @height26 !important;
              font-size: @font12 !important;
              &::placeholder {
                font-size: @font12!important;
              }
            }
            /deep/.el-input__icon {
              line-height: @height26 !important;
            }
          }
        }
        .btn-primary-back {
          // prettier-ignore
          height: 26PX;
          // prettier-ignore
          padding: 0 6PX;
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
  margin-bottom: 4px;
  margin-top: 10px;
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
  &.btn-reset {
    // prettier-ignore
    height: 40PX;
    // prettier-ignore
    width: 65PX;
  }
}
.options-item {
  .options-item;
}
.options-custom-item {
  .options-item;
  .el-select-dropdown__item {
    display: flex;
    // prettier-ignore
    height: 40PX;
    /deep/span {
      flex: 1;
      width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: @font14;
    }
  }
}
</style>
<template>
  <div class="page-result-content">
    <div class="page-posi-sticky filex-content">
      <!-- 房屋类型 -->
      <div class="head-nav-type">
        <div
          class="nav-type-item anchor-point"
          :class="{ active: index == 0 }"
          v-for="(item, index) in navToPage"
          :key="index"
          :data-anchor="'首页类型:' + item.title"
          @click="navToPageBtn(item)"
        >
          {{ item.title }}
        </div>
      </div>
      <!-- 头部按钮, 搜索 -->
      <div class="page-result-head">
        <div class="head-content-input">
          <input
            type="text"
            placeholder="请输入房源编号,楼盘名称"
            data-anchor="首页房源编号,楼盘名称输入框"
            class="content-input anchor-point"
            v-model="houseNoOrName"
            @keydown.enter="handleHouseNoOrName"
          />
          <button class="inquire-content anchor-point" @click="handleHouseNoOrName" :data-anchor="'首页房源编号,楼盘名称搜索{' + houseNoOrName + '}'">
            <i class="el-icon-search"></i>
          </button>
        </div>
        <button class="btn-primary-back btn-reset anchor-point" @click="resetData" data-anchor="首页搜索框重置">
          重置
        </button>
        <div class="head-fun-right">
          <button
            class="btn-primary anchor-point"
            data-anchor="首页管理入口"
            @click="navToPath('/buySellSystem/concernCommunity')"
          >
            <i class=" iconjichuguanli1 iconfont"></i>
            管理入口
          </button>
          <button
            class="btn-primary anchor-point"
            data-anchor="首页我的房源"
            @click="navToPath('/buySellSystem/myAgent')"
          >
            <i class="icondaohang_wodefangyuan1 iconfont"></i>
            我的房源
          </button>
          <button
            class="btn-primary house-back anchor-point"
            data-anchor="首页录入房源"
            @click="navToPath('/buySellSystem/addHouse')"
          >
            <i class=" iconluru iconfont"></i>
            录入房源
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="placeholder-filex" :style="{ height: isFixedHeight }"></div> -->

    <div class="search-content no-frist" v-show="panelChange">
      <!-- nav类型切换 -->
      <div class="tab-content">
        <div class="tab-content-nav">
          <div
            class="tab-content-item anchor-point"
            :class="{ active: typeActiveIndex == index }"
            v-for="(item, index) in typeList"
            :data-anchor="'首页找房:' + item.label"
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
            class="input-content input_180 anchor-point"
            clearable
            filterable
            remote
            popper-class="options-custom-item anchor-point"
            data-anchor="首页楼盘 => select"
            @click.native="log_socket.sendUserActionData"
            @focus="remoteBuildInput"
            @change="remoteBuildChange"
            :remote-method="buildRemoteMethod"
            :loading="buildLoading"
            value-key="value"
          >
            <el-option
              v-for="item in buildForList"
              class="anchor-point"
              :data-anchor="'首页列表楼盘 => select => option:' + item.name"
              @click.native="log_socket.sendUserActionData"
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
            class="input-content input_120 anchor-point"
            popper-class="options-custom-item anchor-point"
            data-anchor="首页栋座 => select"
            @click.native="log_socket.sendUserActionData"
            value-key="value"
            remote
            :remote-method="queryRoomNo"
            @change="remoteRoomNoChange"
            :loading="towerLoading"
          >
            <el-option
              v-for="item in towerForList"
              class="anchor-point"
              :data-anchor="'首页列表栋座 => select => option:' + item.name"
              @click.native="log_socket.sendUserActionData"
              :key="item.value"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- 房间号 -->
          <el-select
            v-model="roomOptData"
            placeholder="请输入房号"
            clearable
            filterable
            popper-class="options-custom-item anchor-point"
            class="input-content input_120 anchor-point"
            data-anchor="首页房号 => select"
            @click.native="log_socket.sendUserActionData"
            remote
            :remote-method="queryRoomData"
            :loading="roomLoading"
            value-key="value"
            @change="queryRoomDataChange"
          >
            <el-option
              v-for="item in roomForList"
              class="anchor-point"
              :data-anchor="'首页列表房号 => select => option:' + item.name"
              @click.native="log_socket.sendUserActionData"
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
          class="input-content input_102 anchor-point"
          :data-anchor="'首页搜索 跟单人姓名:' + agentPerName"
        />
        <button class="btn-primary-back anchor-point" @click="handleAgentPerName" :data-anchor="'首页跟单人搜索{' + agentPerName + '}'">
          搜索
        </button>
      </div>
      <!-- 范围 -->
      <div class="search-content-item">
        <div class="search-item-title">范围</div>
        <div class="search-item-right">
          <el-radio-group v-model="form.plate" size="small">
            <el-radio class="anchor-point" data-anchor="首页选项 范围：不限" label="" border>不限</el-radio>
            <el-radio class="anchor-point" data-anchor="首页选项 范围：跟单房源" label="0" border>跟单房源</el-radio>
            <el-radio class="anchor-point" data-anchor="首页选项 范围：店公共盘" label="1" border>店公共盘</el-radio>
            <el-radio class="anchor-point" data-anchor="首页选项 范围：公司公盘" label="4" border>公司公盘</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 类型 -->
      <div class="search-content-item">
        <div class="search-item-title">类型</div>
        <div class="search-item-right">
          <el-radio-group v-model="form.type" size="small">
            <el-radio class="anchor-point" data-anchor="首页选项 类型:不限" label="" border>不限</el-radio>
            <el-radio class="anchor-point" data-anchor="首页选项 类型:我的相关" label="1" border>我的相关</el-radio>
            <el-radio class="anchor-point" data-anchor="首页选项 类型:关注房源" label="2" border>关注房源</el-radio>
            <el-radio class="anchor-point" data-anchor="首页选项 类型:3天新上房源" label="3" border>3天新上房源</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 商圈 -->
      <div class="search-content-item" v-if="RegionList.length != 0">
        <div class="search-item-title">商圈</div>
        <div class="search-item-right">
          <el-radio-group v-model="form.bussinessDistrict" size="small">
            <el-radio class="anchor-point" data-anchor="首页选项 商圈:不限" label="" border>不限</el-radio>
            <el-radio
              :label="item.value"
              class="anchor-point"
              :data-anchor="'首页选项 商圈:' + item.name"
              border
              v-for="item in RegionList"
              :key="item.value"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </div>
      </div>
      <!-- 价钱 -->
      <div class="search-content-item">
        <div class="search-item-title">价格</div>
        <div class="search-item-right ">
          <div class="data-content">
            <el-radio-group
              v-model="price.radioCheck"
              size="small"
              @change="
                packCheckChange(
                  'priceList',
                  'minPrice',
                  'maxPrice',
                  'price',
                  $event,
                  true,
                  'name'
                )
              "
            >
              <el-radio
                :label="item.name"
                class="anchor-point"
                :data-anchor="'首页选项 价格:' + item.name"
                border
                v-for="item in priceList"
                :key="item.name"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </div>
          <div class="input-group">
            <div class="input-group-split">
              <el-input
                placeholder="最小值"
                :data-anchor="'首页选项 价格:' + price.minPrice"
                class="input-content is-suffix anchor-point"
                v-model="price.minPrice"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">万元</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                :data-anchor="'首页选项 价格:' + price.maxPrice"
                class="input-content is-suffix anchor-point"
                v-model="price.maxPrice"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">万元</i>
                </template>
              </el-input>
            </div>
          </div>
          <button
            class="btn-primary-back anchor-point"
            :data-anchor="'首页选项 价格:确定{' + (price.minPrice&&price.maxPrice ?  ( price.minPrice + '~' + price.maxPrice ) : price.radioCheck) + '}'"
            @click="submitFormBtn('price', 'minPrice', 'maxPrice')"
          >
            确定
          </button>
        </div>
      </div>
      <!-- 面积 -->
      <div class="search-content-item">
        <div class="search-item-title">面积</div>
        <div class="search-item-right ">
          <div class="data-content">
            <el-radio-group
              v-model="area.radioCheck"
              size="small"
              @change="
                packCheckChange(
                  'areaList',
                  'minInArea',
                  'maxInArea',
                  'area',
                  $event,
                  true,
                  'name'
                )
              "
            >
              <el-radio
                :label="item.name"
                class="anchor-point"
                :data-anchor="'首页选项 面积:' + item.name"
                border
                v-for="item in areaList"
                :key="item.name"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </div>
          <div class="input-group">
            <div class="input-group-split">
              <el-input
                placeholder="最小值"
                class="input-content is-suffix anchor-point"
                :data-anchor="'首页选项 面积:' + area.minInArea"
                v-model="area.minInArea"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">㎡</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                class="input-content is-suffix anchor-point"
                :data-anchor="'首页选项 面积:' + area.maxInArea"
                v-model="area.maxInArea"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">㎡</i>
                </template>
              </el-input>
            </div>
          </div>
          <button
            class="btn-primary-back anchor-point"
            :data-anchor="'首页选项 面积:确定{' + (area.minInArea&&area.maxInArea ?  ( area.minInArea + '~' + area.maxInArea ) : area.radioCheck) + '}'"
            @click="submitFormBtn('area', 'minInArea', 'maxInArea')"
          >
            确定
          </button>
        </div>
      </div>
      <!-- 房型 -->
      <div class="search-content-item" v-if="RoomsList.length != 0">
        <div class="search-item-title">房型</div>
        <div class="search-item-right ">
          <div class="data-content">
            <el-radio-group
              v-model="room.value"
              size="small"
              @change="roomChange"
            >
              <el-radio label="不限" border>不限</el-radio>
              <el-radio
                :label="item.value"
                class="anchor-point"
                :data-anchor="'首页选项 房型:' + item.name"
                border
                v-for="(item, index) in RoomsList"
                :key="index"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </div>
          <div class="input-group">
            <div class="input-group-split">
              <el-input
                placeholder="最小值"
                class="input-content is-suffix anchor-point"
                :data-anchor="'首页选项 房型:' + room.minRoom"
                v-model="room.minRoom"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">房</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                class="input-content is-suffix anchor-point"
                :data-anchor="'首页选项 房型:' + room.maxRoom"
                v-model="room.maxRoom"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">房</i>
                </template>
              </el-input>
            </div>
          </div>
          <button class="btn-primary-back anchor-point"
                  :data-anchor="'首页选项 房型:确定{' + (room.minRoom&&room.maxRoom ?  ( room.minRoom + '~' + room.maxRoom ) : room.value) + '}'" @click="roomSubmit">确定</button>
        </div>
      </div>
      <!-- 楼层 -->
      <div class="search-content-item">
        <div class="search-item-title">楼层</div>
        <div class="search-item-right ">
          <div class="data-content">
            <el-radio-group
              v-model="floor.radioCheck"
              size="small"
              @change="floorChange"
            >
              <el-radio
                :label="item.title"
                class="anchor-point"
                :data-anchor="'首页选项 楼层:' + item.title"
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
                class="input-content is-suffix anchor-point"
                :data-anchor="'首页选项 楼层:' + floor.minFloor"
                v-model="floor.minFloor"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">层</i>
                </template>
              </el-input>
              <i class="input-split"></i>
              <el-input
                placeholder="最大值"
                class="input-content is-suffix anchor-point"
                :data-anchor="'首页选项 楼层:' + floor.maxFloor"
                v-model="floor.maxFloor"
              >
                <template v-slot:suffix>
                  <i class="suffix-tips">层</i>
                </template>
              </el-input>
            </div>
          </div>
          <button class="btn-primary-back anchor-point"
                  :data-anchor="'首页选项 楼层:确定{' + (floor.minFloor&&floor.maxFloor ?  ( floor.minFloor + '~' + floor.maxFloor ) : floor.radioCheck) + '}'" @click="floorBtn">
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
            class="anchor-point"
            data-anchor="首页选项 朝向:不限"
            border
            v-model="faceRadio"
            @change="radioChange('faceList')"
            >不限</el-radio
          >
          <el-checkbox-group
            v-model="form.faceList"
            @change="formCheckBoxChange('faceRadio')"
          >
            <el-checkbox
              :label="item.name"
              class="anchor-point"
              :data-anchor="'首页选项 朝向:' + item.name"
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
            class="anchor-point"
            data-anchor="首页选项 装修:不限"
            border
            v-model="renovationRadio"
            @change="radioChange('decorationList')"
            >不限</el-radio
          >
          <el-checkbox-group
            v-model="form.decorationList"
            @change="formCheckBoxChange('renovationRadio')"
          >
            <el-checkbox
              :label="item.name"
              class="anchor-point"
              :data-anchor="'首页选项 装修:' + item.name"
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
            class="anchor-point"
            data-anchor="首页选项 用途:不限"
            border
            v-model="purposeRadio"
            @change="radioChange('houseUseList')"
            >不限</el-radio
          >
          <el-checkbox-group
            v-model="form.houseUseList"
            @change="formCheckBoxChange('purposeRadio')"
          >
            <el-checkbox
              :label="item.name"
              class="anchor-point"
              :data-anchor="'首页选项 用途:' + item.name"
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
          <!-- <el-radio-group v-model="form.primarySchool" size="small">
            <el-radio label="" border>不限</el-radio>
            <el-radio border v-for="item in mathPrimary" :key="item.value">{{
              item.name
            }}</el-radio>
          </el-radio-group> -->
          <el-radio
            label="不限"
            class="anchor-point"
            :data-anchor="'首页选项 小学:不限'"
            border
            v-model="primarySchoolRadio"
            @change="radioChange('primarySchoolList', true)"
            >不限</el-radio
          >
          <el-checkbox-group
            v-model="form.primarySchoolList"
            @change="formCheckBoxChange('primarySchoolRadio')"
          >
            <el-checkbox
              :label="item.name"
              class="anchor-point"
              :data-anchor="'首页选项 小学:' + item.name"
              v-for="item in mathPrimary"
              :key="item.value"
            ></el-checkbox>
          </el-checkbox-group>
          <div class="select-content">
            <el-select
              v-model="primarySchool"
              placeholder="请输入划片小学"
              class="input-content anchor-point"
              :data-anchor="'首页选项 小学 => select'"
              @click.native="log_socket.sendUserActionData"
              clearable
              filterable
              popper-class="options-custom-item"
              @change="schoolChange('primarySchoolList', $event)"
            >
              <el-option
                class="options-item anchor-point"
                v-for="item in mathPrimaryAfter"
                :data-anchor="'首页选项 小学 => select => option:' + item.name"
                @click.native="log_socket.sendUserActionData"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <button
            class="btn-primary-back anchor-point"
            :data-anchor="'首页选项 小学:确定{' + form.primarySchoolList + '}'"
            @click="pushSelectSchool('primarySchoolList', 'primarySchool')"
          >
            确定
          </button>
        </div>
      </div>
      <!-- 中学 -->
      <div class="search-content-item" v-if="MiddleSchoolList.length != 0">
        <div class="search-item-title">中学</div>
        <div class="search-item-right">
          <!-- <el-radio-group v-model="form.middleSchool" size="small">
            <el-radio label="" border>不限</el-radio>
            <el-radio
              :label="item.value"
              border
              v-for="item in mathMiddle"
              :key="item.value"
              >{{ item.name }}</el-radio
            >
          </el-radio-group> -->
          <el-radio
            label="不限"
            class="anchor-point"
            :data-anchor="'首页选项 中学:不限'"
            border
            v-model="middleSchoolRadio"
            @change="radioChange('middleSchoolList', true)"
            >不限</el-radio
          >
          <el-checkbox-group
            v-model="form.middleSchoolList"
            @change="formCheckBoxChange('middleSchoolRadio')"
          >
            <el-checkbox
              :label="item.name"
              class="anchor-point"
              :data-anchor="'首页选项 中学:' + item.name"
              v-for="item in mathMiddle"
              :key="item.value"
            ></el-checkbox>
          </el-checkbox-group>
          <div class="select-content">
            <el-select
              v-model="middleSchool"
              placeholder="请输入划片中学"
              class="input-content anchor-point"
              :data-anchor="'首页选项 中学 => select'"
              @click.native="log_socket.sendUserActionData"
              clearable
              filterable
              popper-class="options-custom-item"
              @change="schoolChange('middleSchoolList', $event)"
            >
              <el-option
                class="options-item anchor-point"
                v-for="item in mathMiddleAfter"
                :data-anchor="'首页选项 中学 => select => option:' + item.label"
                @click.native="log_socket.sendUserActionData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <button class="btn-primary-back anchor-point"
                  :data-anchor="'首页选项 中学:确定{' + form.middleSchoolList + '}'"
                  @click="pushSelectSchool('middleSchoolList', 'middleSchool')">确定</button>
        </div>
      </div>
    </div>
    <div class="change-content">
      <span @click="panelChangeBtn" class="anchor-point"  data-anchor="首页展开选项/收起"
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
//楼层
const FLOORLIST = [
  { title: "不限", value: { minFloor: "", maxFloor: "" } },
  { title: "地下室", value: { minFloor: "-4", maxFloor: "-1" } },
  { title: "一层", value: { minFloor: "1", maxFloor: "1" } },
  { title: "顶层", value: { isTopFloor: "1" } }
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
      temporaryPrimaryValue: "", //临时记录小学select结果,用于删除筛选
      temporaryMiddleValue: "", //临时记录中学select结果,用于删除筛选
      isFixedHeight: "0px",
      navToPage: NAVTOPAGE, //顶部跳转tab
      agentPerName: "", //跟单人姓名
      houseNoOrName: "", //房源编号,楼盘名称
      primarySchool: "", //小学select
      middleSchool: "", //中学Select
      middleSchoolRadio: "不限", //中学不限
      purposeRadio: "不限", //房屋用途radio不限
      primarySchoolRadio: "不限", //小学校radio
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
      // arealist: AREALIST, //面积范围
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
      panelChange: false, //折叠面板
      RegionList: [], //商圈
      faceList: [], //朝向
      areaList: [], //面积
      priceList: [], //价钱
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
     * @example: 重置
     */
    resetData() {
      //Object.assign(this.$data, this.$options.data.call(this));
      Object.assign(this.$parent.$data.form, this.$parent.$options.data().form);
      Object.assign(this.$data.price, this.$options.data().price);
      Object.assign(this.$data.area, this.$options.data().area);
      Object.assign(this.$data.floor, this.$options.data().floor);
      Object.assign(this.$data.room, this.$options.data().room);
      this.typeActiveIndex = 0;
      this.roomOptData = {};
      this.towerOptData = {};
      this.buildOptData = {};
      this.roomForList = [];
      this.towerForList = [];
      this.buildForList = [];
      this.agentPerName = ""; //跟单人姓名
      this.houseNoOrName = ""; //房源编号,楼盘名称
      this.primarySchool = ""; //小学select
      this.middleSchool = ""; //中学Select
      this.middleSchoolRadio = "不限"; //中学不限
      this.purposeRadio = "不限"; //房屋用途radio不限
      this.primarySchoolRadio = "不限"; //小学校radio
      this.renovationRadio = "不限"; //装修radio不限
      this.faceRadio = "不限"; //朝向radio不限
      this.temporaryPrimaryValue = "";
      this.temporaryMiddleValue = "";
    },
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
     * @example: 添加select选中到筛选结果
     * @param {string} field
     * @param {string} selectFieldValue
     */
    pushSelectSchool(field, selectFieldValue) {
      if (this[selectFieldValue] !== "") {
        this.form[field].push(this[selectFieldValue]);
      }
    },
    /**
     * @example: 学校selectChange选择
     * @param {string } field
     * @param {string} e
     */
    schoolChange(field, e) {
      let index = -1;
      switch (field) {
        case "primarySchoolList":
          index = this.form[field].findIndex(
            item => item == this.temporaryPrimaryValue
          );
          break;
        case "middleSchoolList":
          index = this.form[field].findIndex(
            item => item == this.temporaryMiddleValue
          );
          break;
      }

      if (e !== "") {
        switch (field) {
          case "primarySchoolList":
            this.temporaryPrimaryValue = e;
            break;
          case "middleSchoolList":
            this.temporaryMiddleValue = e;
            break;
        }
      }

      if (index == -1) return;
      this.form[field].splice(index, 1);
    },
    /**
     * @example: 修改nav类型激活Index
     * @param {Number}  index
     */
    changeNavTypeIndex(index) {
      if (index == 1 || index == 4 || index == 2) {
        this.navToPageBtn({ private: false });
        return;
      }
      this.resetData();
      if (index != this.typeActiveIndex) {
        this.typeActiveIndex = index;
      }
      switch (index) {
        case 3:
          this.form.isBet = "1";
          break;
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
        ["PrimarySchool", "PrimarySchoolList"],
        ["MiddleSchool", "MiddleSchoolList"],
        ["Rooms", "RoomsList"],
        ["Renovation", "RenovationList"],
        ["Purpose", "PurposeList"],
        ["Price", "priceList"],
        ["Area", "areaList"]
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
      this.form.comId = value ? value : "";

      //清理楼栋数据
      this.towerForList = [];
      this.form.cbId = "";
      this.towerOptData = {};

      //清理房间号数据
      this.form.bhId = "";
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
            limit: 20
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
      this.form.cbId = value ? value : "";

      //清理房间号数据
      this.form.bhId = "";
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
            limit: 20,
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

      this.form.bhId = value ? value : "";
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
    floorBtn() {
      if (this.form.isTopFloor == "1") {
        this.form.isTopFloor = "";
        this.floor.radioCheck = "";
        return;
      }
      this.submitFormBtn("floor", "minFloor", "maxFloor");
    },
    floorChange(e) {
      if (e == "顶层") {
        this.form.isTopFloor = "1";
        this.form.minFloor = "";
        this.form.maxFloor = "";
        this.floor.minFloor = "";
        this.floor.maxFloor = "";
      } else {
        if (this.form.isTopFloor == "1") {
          this.form.isTopFloor = "";
        }
        this.packCheckChange("floorlist", "minFloor", "maxFloor", "floor", e);
      }
    },
    /**
     * @example:传参封装方法 需要checkbox多选的统一封装
     * @param { stirng } scopeList 需要遍历的数组名称
     * @param { string } min 同上
     * @param { string } max 同上
     * @param { string } field 同上
     * @param { string } event change结果
     */
    packCheckChange(
      scopeList,
      min,
      max,
      field,
      event,
      IsParse = false,
      properName = "title"
    ) {
      const [result] = this[scopeList].filter((fItem, fIndex) => {
        if (fItem[properName] == event) return fItem;
      });

      const value = IsParse ? JSON.parse(result.value) : result.value;

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
      this.form.roomTypeList = value == "不限" ? [] : [value];
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
      this.form.roomTypeList = result;
    },
    /**
     * @example: 朝向radio change 事件
     * @param {string } field
     */
    radioChange(field, isClear) {
      this.form[field] = [];
      if (isClear) {
        this[field] = "";
      }
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

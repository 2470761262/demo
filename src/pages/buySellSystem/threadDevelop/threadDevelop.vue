<style lang="less" scoped>
@import "~@/pages/customersSystem/addCustomers/less/form.less";
.page-result-content {
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
  /************ 面包屑 ************/
  .nav-flex {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 0;
  }
  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      color: var(--color--primary);
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: #606266;
      }
    }
  }
  /deep/.isBack {
    .el-breadcrumb__inner {
      cursor: pointer !important;
    }
  }
  .nav-row-panel{
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid #f0f2f5;
    // prettier-ignore
    padding: 15PX;
    /************ 选择楼盘 & 栋座 & 房号 ************/
    .cascader-content {
      display: inline-flex;
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
        &.input_210 {
          // prettier-ignore
          width: 210PX;
        }
        &.input_130 {
          // prettier-ignore
          width: 130PX;
        }
        &.input_175 {
          // prettier-ignore
          width: 175PX;
        }
        /deep/.el-input__inner {
          text-align: center;
          background: #f0f7fc;
          border: none;
          font-size: @font14;
          height: @height35;
          line-height: @height35;
          padding: 0 10px;
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
  /************ 过滤项 ************/
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
              width: 170px;
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
          /deep/.el-select__tags{
            flex-wrap: nowrap;
            overflow: hidden;
          }
          .input-content {
            // prettier-ignore
            @width: 170PX;
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
  /************ 折叠按钮 ************/
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
}
.page-content {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 0;
  .scroll-tab {
    flex: 1;
    height: 0;
    overflow: auto;
    min-height: 400px;
  }
}

</style>
<template>
  <div class="page-content">
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
          >{{ item.title }}</div>
        </div>
      </div>
      <!-- 面包屑 -->
      <div class="nav-flex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumbList"
            :key="index"
            :to="{ path: item.url }"
          >{{ item.title }}</el-breadcrumb-item>
          <el-breadcrumb-item
            class="isBack anchor-point"
            v-if="breadcrumbList.length > 1 && isShowReturn"
            @click.native="goBack"
          >返回</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="nav-row-panel">
        <!-- 选择楼盘 & 栋座 & 房号搜索 -->
        <div class="cascader-content">
          <div class="cascader-content-build">
            <!-- 楼栋 -->
            <el-select
              v-model="buildOptData"
              placeholder="请输入楼盘名称"
              class="input-content input_210 anchor-point"
              clearable
              filterable
              remote
              popper-class="options-custom-item anchor-point"
              data-anchor="开发线索楼盘 => select"
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
                :data-anchor="'开发线索楼盘 => select => option:' + item.name"
                @click.native="log_socket.sendUserActionData"
                :key="item.value"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            <!-- 栋座 -->
            <el-select
              v-model="towerOptData"
              placeholder="请输入栋座"
              clearable
              filterable
              class="input-content input_175 anchor-point"
              popper-class="options-custom-item anchor-point"
              data-anchor="开发线索栋座 => select"
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
                :data-anchor="'开发线索栋座 => select => option:' + item.name"
                @click.native="log_socket.sendUserActionData"
                :key="item.value"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            <!-- 房间号 -->
            <el-select
              v-model="roomOptData"
              placeholder="请输入房号"
              clearable
              filterable
              popper-class="options-custom-item anchor-point"
              class="input-content input_130 anchor-point"
              data-anchor="开发线索房号 => select"
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
                :data-anchor="'开发线索房号 => select => option:' + item.name"
                @click.native="log_socket.sendUserActionData"
                :key="item.value"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <button
            class="btn-primary-back anchor-point"
            @click="handleAgentPerName"
            data-anchor="搜索"
          >搜索</button>
        </div>
        <div>
          <el-radio-group v-model="form.listSwitchRadio" size="small">
            <el-radio-button label="开发线索"></el-radio-button>
            <el-radio-button label="我的记录"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="search-content no-frist" v-show="panelChange">
        <!-- 类型 -->
        <div class="search-content-item">
          <div class="search-item-title">类型</div>
          <div class="search-item-right">
            <el-radio-group v-model="form.type" size="small">
              <el-radio
                class="anchor-point"
                data-anchor="开发线索选项 类型:不限"
                label=""
                border
                >不限</el-radio
              >
              <el-radio
                class="anchor-point"
                data-anchor="开发线索选项 时间:成交120天转入"
                label="0"
                border
                >成交120天转入</el-radio
              >
              <el-radio
                class="anchor-point"
                data-anchor="开发线索选项 时间:暂不售转入"
                label="1"
                border
                >暂不售转入</el-radio
              >
              <el-radio
                class="anchor-point"
                data-anchor="开发线索选项 时间:30天内导入号码"
                label="4"
                border
                >30天内导入号码</el-radio
              >
            </el-radio-group>
          </div>
        </div>
        <!-- 时间 -->
        <div class="search-content-item">
          <div class="search-item-title">时间</div>
          <div class="search-item-right">
            <el-radio-group v-model="form.time" size="small">
              <el-radio
                class="anchor-point"
                data-anchor="首页选项 时间:不限"
                label=""
                border
                >不限</el-radio
              >
              <el-radio
                class="anchor-point"
                data-anchor="首页选项 时间:30日以上来回访"
                label="0"
                border
                >30日以上来回访</el-radio
              >
              <el-radio
                class="anchor-point"
                data-anchor="首页选项 时间:30日内有回访"
                label="1"
                border
                >30日内有回访</el-radio
              >
              <el-radio
                class="anchor-point"
                data-anchor="首页选项 时间:今日有回访"
                label="4"
                border
                >今日有回访</el-radio
              >
            </el-radio-group>
          </div>
        </div>
        <!-- 商圈 -->
        <div class="search-content-item" v-if="RegionList.length != 0">
          <div class="search-item-title">商圈</div>
          <div class="search-item-right">
            <el-radio
              label="不限"
              class="anchor-point"
              data-anchor="首页选项 商圈:不限"
              border
              v-model="bussinessDistrictRadio"
              @change="radioChange('bussinessDistrictList')"
              >不限</el-radio
            >
            <el-checkbox-group
              v-model="form.bussinessDistrictList"
              @change="formCheckBoxChange('bussinessDistrictRadio')"
            >
              <el-checkbox
                :label="item.name"
                class="anchor-point"
                :data-anchor="'首页选项 商圈:' + item.name"
                v-for="item in RegionList"
                :key="item.value"
              ></el-checkbox>
            </el-checkbox-group>
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
                  :data-anchor="'开发线索选项 面积:' + item.name"
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
                  :data-anchor="'开发线索选项 面积最小值:' + area.minInArea"
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
                  :data-anchor="'开发线索选项 面积最大值:' + area.maxInArea"
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
              :data-anchor="
                '开发线索选项 面积:确定{' +
                  (area.minInArea && area.maxInArea
                    ? area.minInArea + '~' + area.maxInArea
                    : area.radioCheck) +
                  '}'
              "
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
                  :data-anchor="'开发线索选项 房型:' + item.name"
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
                  :data-anchor="'开发线索选项 房型最小值:' + room.minRoom"
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
                  :data-anchor="'开发线索选项 房型最大值:' + room.maxRoom"
                  v-model="room.maxRoom"
                >
                  <template v-slot:suffix>
                    <i class="suffix-tips">房</i>
                  </template>
                </el-input>
              </div>
            </div>
            <button
              class="btn-primary-back anchor-point"
              :data-anchor="
                '开发线索选项 房型:确定{' +
                  (room.minRoom && room.maxRoom
                    ? room.minRoom + '~' + room.maxRoom
                    : room.value) +
                  '}'
              "
              @click="roomSubmit"
            >
              确定
            </button>
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
              :data-anchor="'开发线索选项 小学:不限'"
              border
              v-model="primarySchoolRadio"
              @change="radioChange('primarySchoolList', true, 'primarySchool')"
              >不限</el-radio
            >
            <el-checkbox-group
              v-model="form.primarySchoolList"
              @change="formCheckBoxChange('primarySchoolRadio')"
            >
              <el-checkbox
                :label="item.name"
                class="anchor-point"
                :data-anchor="'开发线索选项 小学:' + item.name"
                v-for="item in mathPrimary"
                :key="item.value"
                @change="formCheckChange('primarySchool', item.name, $event)"
              ></el-checkbox>
            </el-checkbox-group>
            <div class="select-content">
              <el-select
                v-model="primarySchool"
                placeholder="请输入划片小学"
                class="input-content anchor-point"
                :data-anchor="'开发线索选项 小学 => select'"
                @click.native="log_socket.sendUserActionData"
                clearable
                filterable
                popper-class="options-custom-item"
                @change="schoolChange('primarySchoolList', $event)"
                multiple
                collapse-tags
              >
                <el-option
                  class="options-item anchor-point"
                  v-for="item in mathPrimaryAfter"
                  :data-anchor="'开发线索选项 小学 => select => option:' + item.name"
                  @click.native="log_socket.sendUserActionData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <!-- <button
              class="btn-primary-back anchor-point"
              :data-anchor="'首页选项 小学:确定{' + form.primarySchoolList + '}'"
              @click="pushSelectSchool('primarySchoolList', 'primarySchool')"
            >
              确定
            </button> -->
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
              :data-anchor="'开发线索选项 中学:不限'"
              border
              v-model="middleSchoolRadio"
              @change="radioChange('middleSchoolList', true, 'middleSchool')"
              >不限</el-radio
            >
            <el-checkbox-group
              v-model="form.middleSchoolList"
              @change="formCheckBoxChange('middleSchoolRadio')"
            >
              <el-checkbox
                :label="item.name"
                class="anchor-point"
                :data-anchor="'开发线索选项 中学:' + item.name"
                v-for="item in mathMiddle"
                :key="item.value"
                @change="formCheckChange('middleSchool', item.name, $event)"
              ></el-checkbox>
            </el-checkbox-group>
            <div class="select-content">
              <el-select
                v-model="middleSchool"
                placeholder="请输入划片中学"
                class="input-content anchor-point"
                :data-anchor="'开发线索选项 中学 => select'"
                @click.native="log_socket.sendUserActionData"
                clearable
                filterable
                popper-class="options-custom-item"
                @change="schoolChange('middleSchoolList', $event)"
                multiple
                collapse-tags
              >
                <el-option
                  class="options-item anchor-point"
                  v-for="item in mathMiddleAfter"
                  :data-anchor="'开发线索选项 中学 => select => option:' + item.name"
                  @click.native="log_socket.sendUserActionData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <!-- <button
              class="btn-primary-back anchor-point"
              :data-anchor="'首页选项 中学:确定{' + form.middleSchoolList + '}'"
              @click="pushSelectSchool('middleSchoolList', 'middleSchool')"
            >
              确定
            </button> -->
          </div>
        </div>
      </div>
      <div class="change-content">
        <span
          @click="panelChangeBtn"
          class="anchor-point"
          data-anchor="开发线索展开选项/收起"
          >展开选项/收起<i
            class="iconfont iconxingzhuangjiehe1"
            :class="{ rotate: panelChange }"
          ></i
        ></span>
      </div>
    </div>
    <div class="scroll-tab" ref="scrollTab">
      <thread-develop-table></thread-develop-table>
    </div>
  </div>
</template>
<script>
//跳转tab
const NAVTOPAGE = [
  { title: "买卖", private: true, url: "" },
  { title: "租赁", private: false, url: "" },
  { title: "新房", private: false, url: "" },
  { title: "商铺写字楼", private: false, url: "" },
  { title: "小区", private: false, url: "" }
];
import threadDevelopTable from "./components/threadDevelopTable";
export default {
  provide() {
    return {
      form: this.form
    };
  },
  components: {
    threadDevelopTable
  },
  activated() {
    this.$nextTick(() => {
      this.$refs.scrollTab.addEventListener("scroll", this.ListeningScroll);
      document
        .querySelector(".el-main")
        .addEventListener("scroll", this.elMainScroll);
    });
    this.$refs.scrollTab.scrollTop = this.scrollTop;
  },
  deactivated() {
    if (document.querySelector(".el-main")) {
      this.$refs.scrollTab.removeEventListener("scroll", this.ListeningScroll);
      document
        .querySelector(".el-main")
        .removeEventListener("scroll", this.elMainScroll);
    }
  },
  beforeDestroy() {
    this.$refs.scrollTab.removeEventListener("scroll", this.ListeningScroll);
    document
      .querySelector(".el-main")
      .removeEventListener("scroll", this.elMainScroll);
  },
  watch: {
    $route(newValue) {
      this.breadcrumbSet(newValue.matched);
    }
  },
  data() {
    return {
      navToPage: NAVTOPAGE, //顶部跳转tab
      breadcrumbList: [],
      isShowReturn: true,
      panelChange: true, //折叠过滤项
      towerLoading: false, //栋座select loading
      buildOptData: {}, //当前楼盘选择数据
      buildForList: [], //楼盘select数据
      buildLoading: false, //楼盘select loading
      roomOptData: {}, //房间号选中数据
      roomForList: [], //房间号select数据
      roomLoading: false, //房间号select loading
      towerOptData: {}, //栋座选中数据
      towerForList: [], //栋座select数据
      primarySchool: [], //小学select
      middleSchool: [], //中学Select
      primarySchoolRadio: "不限", //小学校radio
      middleSchoolRadio: "不限", //中学不限
      RegionList: [], //商圈
      bussinessDistrictRadio: "不限", //商圈radio不限
      area: {
        radioCheck: "不限", //单选
        minInArea: "", // 最小面积
        maxInArea: "" // 最高面积
      },
      areaList: [], //面积
      RoomsList: [], //房型
      room: {
        value: "不限", //单选
        minRoom: "", //最低房型
        maxRoom: "" //最高房型
      },
      PrimarySchoolList: [], //小学
      MiddleSchoolList: [], //中学
      form: {
        listSwitchRadio: "开发线索",
        type: "", //类型
        time: "", //时间
        bussinessDistrictList: [], //商圈
        roomTypeList: [],
        decorationList: [],
        houseUseList: [],
        primarySchoolList: [],
        middleSchoolList: [],
        comId: "",
        cbId: "",
        bhId: "",
        minFloor: "",
        maxFloor: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: "",
        faceList: [],
        sortColumn: "addTime",
        sortType: 1,
        keyWord: "", //keyword
        isTopFloor: "", //是否是顶层
        isBet: "" //对赌
      }
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
    this.breadcrumbSet(this.$route.matched);
    var url = window.location.href; //获取url中"?"符后的字串
    if (
      url.indexOf("/houseDetails/") != -1 ||
      url.indexOf("/potentialHouseDetail/") != -1 ||
      url.indexOf("/buildingHouseDetail/") != -1 ||
      url.indexOf("/historyDetails/") != -1 ||
      url.indexOf("/validateHouseDetails/") != -1
    ) {
      this.isShowReturn = false;
    }
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
     * @example: 折叠面板
     */
    panelChangeBtn() {
      this.panelChange = !this.panelChange;
    },
    breadcrumbSet(matched) {
      //需要过滤的Path;
      this.breadcrumbList = [];
      let filterPath = ["/buySellSystem/houseList"];

      if (matched.length > 0) {
        matched.forEach(item => {
          if (!filterPath.includes(item.path)) {
            this.breadcrumbList.push({
              title: item.meta.title,
              url: item.path
            });
          }
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    /**
     * @example: 楼盘激活第一时获取数据
     */
    remoteBuildInput() {
      this.buildForList.length === 0 && this.buildRemoteMethod();
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
     * @example: 搜索
     */
    handleAgentPerName() {},
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
     * @example: 朝向radio change 事件
     * @param {string } field
     */
    radioChange(field, isClear, field2) {
      this.form[field] = [];
      if (isClear) {
        this[field] = "";
        this[field2] = "";
      }
    },
    /**
     * @example: 朝向checkboxChange事件
     *
     */
    formCheckBoxChange(field) {
      this[field] = "";
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
     * @example: room确定查询按钮事件
     */
    roomSubmit() {
      if (
        !(
          /^[1-9][0-9]*$/.test(this.room.minRoom) ||
          /^[1-9][0-9]*$/.test(this.room.maxRoom)
        )
      ) {
        this.$message.warning("请输入正整数");
        return;
      }
      if (parseInt(this.room.minRoom) > parseInt(this.room.maxRoom)) {
        this.$message.warning("房型最小值应该小于房型最大值");
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
     * @example: 房型的选择的change事件
     */
    roomChange(value) {
      this.room.maxRoom = "";
      this.room.minRoom = "";
      this.form.roomTypeList = value == "不限" ? [] : [value];
    },
    /**
     * @example: 学校selectChange选择
     * @param {string } field
     * @param {string} e
     */
    schoolChange(field, e) {
      let temporaryField;
      switch (field) {
        case "primarySchoolList":
          temporaryField = "temporaryPrimaryList";
          this["primarySchoolRadio"] = "";
          break;
        case "middleSchoolList":
          temporaryField = "temporaryMiddleList";
          this["middleSchoolRadio"] = "";
          break;
      }
      if (!this[temporaryField]) this[temporaryField] = [];
      if (e.length > this[temporaryField].length) {
        this.form[field].push(e[e.length - 1]);
      } else {
        let oprateIndex = this[temporaryField].findIndex(
          item => e.indexOf(item) == -1
        );
        let oprateField = this[temporaryField][oprateIndex];
        let originIndex = this.form[field].indexOf(oprateField);
        this.form[field].splice(originIndex, 1);
      }
      this[temporaryField] = e;
    },
    ListeningScroll(e) {
      this.scrollTop = e ? e.target.scrollTop : 0;
    },
    /** 
     * @example: 学校多选项值改变事件(判断下拉多选框是否存在相同选项，存在则数据联动)
     * @param {string } type 学校类型
     * @param {string } name 选项字段
     * @param {string } val 值
     */
    formCheckChange(type, name, val) {
      let temporaryCheckListFiled,temporaryAllListFiled,temporaryField;
      switch (type) {
        case "primarySchool":
          temporaryCheckListFiled = "primarySchool";
          temporaryAllListFiled = "mathPrimaryAfter";
          temporaryField = "temporaryPrimaryList";
          break;
        case "middleSchool":
          temporaryCheckListFiled = "middleSchool";
          temporaryAllListFiled = "mathMiddleAfter";
          temporaryField = "temporaryMiddleList";
          break;
      }
      if (!val && this[temporaryCheckListFiled].indexOf(name) != -1) {
        this[temporaryCheckListFiled].splice(this[temporaryCheckListFiled].indexOf(name), 1);
      } else if (val && this[temporaryAllListFiled].findIndex(item => item.name == name) != -1) {
        this[temporaryCheckListFiled].push(name);
      }
      this[temporaryField] = this[temporaryCheckListFiled];
    }
  }
};
</script>

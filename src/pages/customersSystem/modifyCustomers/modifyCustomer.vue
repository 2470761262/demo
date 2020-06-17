<style lang="less" scoped>
.add-content {
  min-height: 100%;
  background: #fff;
  /deep/.el-collapse-item__header {
    .el-collapse-item__arrow {
      display: none;
    }
  }
  .collapse-title {
    width: 100%;
    background: var(--color--primary);
    font-size: 14px;
    padding-left: 45px;
    color: #fff;
    height: 100%;
    position: relative;
    &.collapse-title-active {
      &::after {
        color: #fff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        content: "(点击展开)";
      }
    }
  }
  .add-cust-step {
    padding: 40px 0 40px 265px;
    .cust-step-row {
      display: flex;
      margin-bottom: 30px;
      &:last-child {
        margin-bottom: 0;
      }
      .step-item-block {
        .step-item-inline;
        width: 100%;
        margin-right: 0;
        .step-row-query {
          width: auto;
          &.flex-auto {
            flex: 1;
          }
        }
      }
      .step-item-inline {
        display: flex;
        align-items: center;
        margin-right: 137px;
        &:last-child {
          margin-right: 0;
        }
        .step-row-title {
          font-size: 15px;
          width: 92px;
          position: relative;
          flex-shrink: 0;
          padding-left: 10px;
          box-sizing: border-box;
          &.title-required {
            &::before {
              content: "*";
              color: red;
              left: 0;
              position: absolute;
            }
          }
          &.title-top {
            align-self: flex-start;
          }
        }
        .step-row-query {
          width: 314px;
          &.step-flex-group {
            display: flex;
            text-align: center;
            position: relative;
            /deep/.el-input__inner {
              text-align: center;
            }
            .input-space {
              width: 50px;
              text-align: center;
              flex-shrink: 0;
              align-self: center;
              font-size: 0;
              &::after {
                content: "";
                width: 15px;
                height: 1px;
                background: #656565;
                display: inline-block;
              }
            }
            &::after {
              content: attr(data-unit);
              position: absolute;
              right: -10px;
              color: black;
              top: 50%;
              transform: translate(100%, -50%);
            }
          }
          &.border {
            border: 1px solid #dcdfe6;
            height: 40px;
            box-sizing: border-box;
            padding: 0 15px;
            font-size: 0;
            line-height: 40px;
          }
          /deep/.el-input__inner {
            border-radius: 0;
          }
          /deep/.el-select {
            width: 100%;
            .el-input__inner {
              padding-right: 40px;
              height: 40px !important;
            }
            .is-focus {
              .el-input__suffix {
                border-left-color: var(--color--primary);
                .el-icon-arrow-up::before {
                  content: "\E790";
                }
              }
            }
            .el-input__suffix {
              right: 1px;
              top: 1px;
              bottom: 1px;
              width: 40px;
              border-left: 1px solid #dcdfe6;
              background: #fafafa;
              height: auto;
              box-sizing: border-box;
              .el-icon-arrow-up::before {
                color: #b4b4b4;
                content: "\e78f";
              }
            }
          }
          /deep/.input-olny-botttom {
            width: 120px;
            height: 26px;
            .el-input__inner {
              border: none;
              border-bottom: 1px solid #dcdfe6;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
.add-foot {
  text-align: center;
  margin-top: 35px;
}
.content-857 {
  width: 857px !important;
}
</style>
<template>
  <section class="add-content">
    <el-collapse accordion v-model="collapseActive">
      <!-- 客户信息 -->
      <el-collapse-item :name="1">
        <!-- collapse title -->
        <template slot="title">
          <div
            class="collapse-title"
            :class="{ 'collapse-title-active': collapseActive != 1 }"
          >
            客户信息<i
              :class="
                collapseActive == 1 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
              "
            ></i>
          </div>
        </template>
        <section class="add-cust-step">
          <!-- 客户姓名 & 客户性别  content -->
          <div class="cust-step-row">
            <!-- 客户姓名 -->
            <div class="step-item-inline">
              <div class="step-row-title title-required">客户姓名:</div>
              <div class="step-row-query">
                <el-input
                  v-model="formData.customers"
                  placeholder="请输入客户姓名"
                ></el-input>
              </div>
            </div>
            <!-- 客户性别 -->
            <div class="step-item-inline ">
              <div class="step-row-title title-required">客户性别:</div>
              <div class="step-row-query border">
                <el-radio-group v-model="formData.sex">
                  <el-radio
                    :label="item.value"
                    v-for="item in sex"
                    :key="item.value"
                    >{{ item.key }}</el-radio
                  >
                </el-radio-group>
              </div>
            </div>
          </div>
          <!-- 客户电话 &  客户籍贯 content -->
          <div class="cust-step-row">
            <!-- 客户电话 -->
            <div class="step-item-inline">
              <div class="step-row-title title-required">客户电话:</div>
              <div class="step-row-query">
                <el-input
                  v-model="formData.tel"
                  maxlength="11"
                  show-word-limit
                  @input="inputPhone"
                  placeholder="请输入客户电话号码"
                ></el-input>
              </div>
            </div>
            <!-- 客户籍贯 -->
            <div class="step-item-inline ">
              <div class="step-row-title title-required">客户籍贯:</div>
              <div class="step-row-query">
                <el-input
                  v-model="formData.nativePlace"
                  maxlength="8"
                  show-word-limit
                  placeholder="请输入客户籍贯"
                ></el-input>
              </div>
            </div>
          </div>
          <!-- 客户来源  content -->
          <div class="cust-step-row">
            <!-- 客户来源 -->
            <div class="step-item-inline ">
              <div class="step-row-title title-required">客户来源:</div>
              <div class="step-row-query">
                <el-select
                  v-model="formData.source"
                  clearable
                  placeholder="请选择客户来源"
                >
                  <el-option
                    v-for="item in customerSource"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <!--  客源特性 -->
            <div class="step-item-inline ">
              <!-- <div class="step-row-title title-required">客源特性:</div>
              <div class="step-row-query">
                <el-select
                  v-model="formData.resourceType"
                  clearable
                  placeholder="请选择客源特性"
                >
                  <el-option
                    v-for="item in customerCharacter"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div> -->
            </div>
          </div>
          <!-- 购房意向 content -->
          <div class="cust-step-row">
            <!-- 购房意向 -->
            <div class="step-item-inline ">
              <div class="step-row-title title-required">购房意向:</div>
              <div class="step-row-query">
                <el-rate
                  v-model="formData.desireIntensity"
                  :max="3"
                  :texts="['较弱', '一般', '强烈']"
                  show-text
                >
                </el-rate>
              </div>
            </div>
            <!-- 付款方式 -->
            <div class="step-item-inline">
              <div class="step-row-title  title-required">付款方式:</div>
              <div class="step-row-query">
                <el-select
                  v-model="formData.payWay"
                  placeholder="请选择付款方式"
                >
                  <el-option
                    v-for="item in payWayList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <!-- 客户印象 conetnt-->
          <div class="cust-step-row">
            <!-- 客户印象 -->
            <div class="step-item-block">
              <div class="step-row-title">客户印象</div>
              <div class="step-row-query">
                <el-input
                  v-model="myImpression"
                  class="input-olny-botttom"
                ></el-input>
                <el-button type="text" @click="addCusImpression"
                  >添加</el-button
                >
              </div>
            </div>
          </div>
          <div class="cust-step-row">
            <el-tag
              v-for="(item, index) in formData.myImpression"
              :key="index"
              size="small"
              @close="closeImpression(item)"
              class="scroll-content-tag"
              closable
              >{{ item }}</el-tag
            >
          </div>
        </section>
      </el-collapse-item>

      <!-- 求购信息  -->
      <el-collapse-item :name="2">
        <!-- collapse title -->
        <template slot="title">
          <div
            class="collapse-title"
            :class="{ 'collapse-title-active': collapseActive != 2 }"
          >
            求购信息<i
              :class="
                collapseActive == 2 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
              "
            ></i>
          </div>
        </template>
        <section class="add-cust-step">
          <!-- 购买用途 & 期望装修 content -->
          <div class="cust-step-row">
            <!-- 购买用途 -->
            <div class="step-item-inline">
              <div class="step-row-title">购买用途:</div>
              <div class="step-row-query">
                <el-select
                  v-model="formData.buildType"
                  clearable
                  placeholder="请选择购买用途"
                >
                  <el-option
                    v-for="item in buildTypeList"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <!-- 期望装修 -->
            <div class="step-item-inline">
              <div class="step-row-title">期望装修:</div>
              <div class="step-row-query">
                <el-radio-group v-model="formData.decoration">
                  <el-radio
                    :label="item.value"
                    v-for="item in decorationList"
                    :key="item.value"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="cust-step-row">
            <div class="step-item-block">
              <div class="step-row-title">期望房型:</div>
              <div class="step-row-query  step-flex-group">
                <el-checkbox-group v-model="roomList">
                  <el-checkbox label="1房"></el-checkbox>
                  <el-checkbox label="2房"></el-checkbox>
                  <el-checkbox label="3房"></el-checkbox>
                  <el-checkbox label="4房"></el-checkbox>
                  <el-checkbox label="5房以上"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <!-- 首付金额 & 期望总价 content-->
          <div class="cust-step-row">
            <!-- 首付金额 -->
            <div class="step-item-inline">
              <div class="step-row-title">首付金额:</div>
              <div class="step-row-query step-flex-group" data-unit="万">
                <el-input
                  v-model="formData.minFirstPrice"
                  placeholder="最小值"
                  oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <span class="input-space"></span>
                <el-input
                  v-model="formData.maxFirstPrice"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="最大值"
                ></el-input>
              </div>
            </div>
            <!-- 期望总价 -->
            <div class="step-item-inline">
              <div class="step-row-title">期望总价:</div>
              <div class="step-row-query step-flex-group" data-unit="万">
                <el-input
                  v-model="formData.minPrice"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="最小值"
                ></el-input>
                <span class="input-space"></span>
                <el-input
                  v-model="formData.maxPrice"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="最大值"
                ></el-input>
              </div>
            </div>
          </div>
          <!-- 首付面积 & 付款方式-->
          <div class="cust-step-row">
            <!-- 首付面积 -->
            <div class="step-item-inline">
              <div class="step-row-title">期望面积:</div>
              <div class="step-row-query step-flex-group" data-unit="平方">
                <el-input
                  v-model="formData.minArea"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="最小值"
                ></el-input>
                <span class="input-space"></span>
                <el-input
                  v-model="formData.maxArea"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="最大值"
                ></el-input>
              </div>
            </div>
          </div>
        </section>
      </el-collapse-item>

      <!-- 其他需求 -->
      <el-collapse-item :name="3">
        <!-- collapse title -->
        <template slot="title">
          <div
            class="collapse-title"
            :class="{ 'collapse-title-active': collapseActive != 3 }"
          >
            其他需求<i
              :class="
                collapseActive == 3 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
              "
            ></i>
          </div>
        </template>
        <section class="add-cust-step">
          <!-- 期望小学 & 客源特性 content  -->
          <div class="cust-step-row">
            <!-- 期望小学 -->
            <div class="step-item-inline ">
              <div class="step-row-title ">期望小学:</div>
              <div class="step-row-query">
                <el-select
                  v-model="formData.school1Array"
                  clearable
                  filterable
                  remote
                  @focus="queryPrimarySchoolByKeyWord"
                  :remote-method="queryPrimarySchoolByKeyWord"
                  :loading="searchLoading"
                  multiple
                  placeholder="请选择客户期望小学(可多选)"
                >
                  <el-option
                    v-for="(item, index) in primarySchool"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <!--  客源特性 -->
            <div class="step-item-inline ">
              <div class="step-row-title ">期望中学:</div>
              <div class="step-row-query">
                <el-select
                  v-model="formData.school2Array"
                  clearable
                  filterable
                  remote
                  @focus="queryMiddleSchoolByKeyWord"
                  :remote-method="queryMiddleSchoolByKeyWord"
                  :loading="searchLoading"
                  multiple
                  placeholder="请选择客户期望中学(可多选)"
                >
                  <el-option
                    v-for="(item, index) in middleSchool"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <!-- 期望楼盘 content -->
          <div class="cust-step-row">
            <div class="step-item-inline ">
              <div class="step-row-title ">期望楼盘:</div>
              <div class="step-row-query">
                <el-select
                  v-model="formData.community"
                  clearable
                  filterable
                  remote
                  @focus="queryCommunityByKeyWord"
                  :remote-method="queryCommunityByKeyWord"
                  :loading="searchLoading"
                  multiple
                  placeholder="请选择客户期望楼盘(可多选)"
                >
                  <el-option
                    v-for="item in communityList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <!-- 看房经历 content -->
          <div class="cust-step-row">
            <!-- 看房经历 -->
            <div class="step-item-block">
              <div class="step-row-title title-top">看房经历:</div>
              <div class="step-row-query content-857">
                <el-input
                  type="textarea"
                  placeholder="请输入客户看房经历"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  v-model="formData.remark"
                ></el-input>
              </div>
            </div>
          </div>
        </section>
      </el-collapse-item>
    </el-collapse>
    <div class="add-foot">
      <el-button type="primary" @click="modifyCusSubmit" :disabled="canSubmit"
        >修改</el-button
      >
    </div>
  </section>
</template>

<script>
import { DECORATION } from "@/util/constMap";
import but from "@/evenBus/but";
export default {
  data() {
    return {
      searchLoading: false,
      formData: {
        // school1Array: ["北城小学"]
        // myImpression: [],
        // desireIntensity: 0,
        // customers: "",
        //sex: 0,
        // tel: "",
        // resourceType: "",
        // source: "",
        // buildType: "",
        // minFirstPrice: "",
        // maxFirstPrice: "",
        // minPrice: "",
        // maxPrice: "",
        // minArea: "",
        // maxArea: "",
        // school1: "",
        // school2: "",
        // community: "",
        // remark: ""
      },
      payWayList: [
        {
          name: "一次性",
          value: "一次性"
        },
        {
          name: "商业贷款",
          value: "商业贷款"
        },
        {
          name: "公积金贷款",
          value: "公积金贷款"
        },
        {
          name: "组合贷款",
          value: "组合贷款"
        }
      ],
      decorationList: [
        {
          value: "毛胚",
          label: "毛胚"
        },
        {
          value: "简单装修",
          label: "简单装修"
        },
        {
          value: "精装修",
          label: "精装修"
        }
      ],
      buildTypeList: [
        {
          value: "投资",
          label: "投资"
        },
        {
          value: "自住",
          label: "自住"
        },
        {
          value: "办公",
          label: "办公"
        },
        {
          value: "改善",
          label: "改善"
        },
        {
          value: "就学",
          label: "就学"
        }
      ],
      customerCharacter: [
        {
          value: "私客",
          label: "私客"
        },
        {
          value: "小组公客",
          label: "小组公客"
        }
      ],
      customerSource: [
        {
          value: "朋友",
          label: "朋友"
        },
        {
          value: "老乡",
          label: "老乡"
        },
        {
          value: "亲戚",
          label: "亲戚"
        },
        {
          value: "鑫家网",
          label: "鑫家网"
        },
        {
          value: "58",
          label: "58"
        },
        {
          value: "安居客",
          label: "安居客"
        },
        {
          value: "朋友圈",
          label: "朋友圈"
        },
        {
          value: "摆排",
          label: "摆排"
        },
        {
          value: "转介绍",
          label: "转介绍"
        },
        {
          value: "业主转客户",
          label: "业主转客户"
        },
        {
          value: "重复购买",
          label: "重复购买"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      roomList: [],
      primarySchool: [],
      middleSchool: [],
      communityList: [],
      sex: [
        //性别
        {
          value: 0,
          key: "男"
        },
        {
          value: 1,
          key: "女"
        }
      ], //性别
      myImpression: "",
      collapseActive: 1, //折叠面板当前激活name
      canSubmit: false
    };
  },
  created() {
    if (this.$route.params.customer) {
      //开始回显数据
      let customer = this.$route.params.customer;
      //执行ajax请求，获取基础信息
      this.$api
        .post({
          url: "/saleCustomerDetail/getACusDetail",
          data: { id: customer.id },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          console.log("获取客户详情结果", result.data);
          if (result.code == 200) {
            this.formData = result.data.data;
            this.$set(
              this.formData,
              "myImpression",
              this.$route.params.myImpression || []
            );
            console.log("印象印象", this.$route.params.myImpression);
            const filexBuild = [
              this.formData.community1,
              this.formData.community2,
              this.formData.community3
            ].filter(item => item != undefined && item != null && item != "");
            this.$set(this.formData, "community", filexBuild);
            if (this.formData.school1) {
              this.$set(
                this.formData,
                "school1Array",
                this.formData.school1.split("$")
              );
            }
            if (this.formData.school2) {
              this.$set(
                this.formData,
                "school2Array",
                this.formData.school2.split("$")
              );
            }
            if (this.formData.rooms) {
              this.roomList = this.formData.rooms.split("$");
            }
            console.log(this.formData, "this.formData", "回显数据");
          }
        })
        .catch(e => {
          console.log("获取客户详情异常失败");
          console.log(e);
        })
        .finally(() => {});
      //结束回显数据
    }
  },
  methods: {
    inputPhone(vv) {
      this.formData.tel = vv;
      //value=value.replace(/[^\d]/g,'')
    },
    queryPrimarySchoolByKeyWord(query) {
      if (query instanceof Object) {
        query = "";
      }
      let _that = this;
      this.searchLoading = true;
      _that.$api
        .get({
          url: "/community/primarySchoolList",
          qs: true,
          data: { primarySchoolName: query }
        })
        .then(e => {
          _that.searchLoading = false;
          let result = e.data;
          if (result.code == 200) {
            console.log(result, "查询小学");
            _that.primarySchool = result.data.list;
          } else {
            console.log("查询小学" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          _that.searchLoading = false;
          console.log("查询小学失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    queryMiddleSchoolByKeyWord(query) {
      if (query instanceof Object) {
        query = "";
      }
      let _that = this;
      this.searchLoading = true;
      _that.$api
        .get({
          url: "/community/middleSchoolList",
          qs: true,
          data: { middleSchoolName: query }
        })
        .then(e => {
          _that.searchLoading = false;
          let result = e.data;
          if (result.code == 200) {
            console.log(result, "查询中学");
            _that.middleSchool = result.data.list;
          } else {
            console.log("查询中学" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          _that.searchLoading = false;
          console.log("查询中学失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    queryCommunityByKeyWord(query) {
      if (query instanceof Object) {
        query = "";
      }
      let _that = this;
      this.searchLoading = true;
      _that.$api
        .get({
          url: "/community/houseList",
          qs: true,
          data: { communityName: query }
        })
        .then(e => {
          _that.searchLoading = false;
          let result = e.data;
          if (result.code == 200) {
            console.log(result, "查询楼盘");
            _that.communityList = result.data.list;
          } else {
            console.log("查询楼盘" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          _that.searchLoading = false;
          console.log("查询楼盘失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    closeImpression(name) {
      let index = this.formData.myImpression.indexOf(name);
      if (index > -1) {
        this.formData.myImpression.splice(index, 1);
      }
    },
    addCusImpression() {
      if (!this.myImpression) {
        this.$message({
          type: "info",
          message: "请输入印象"
        });
        return;
      }
      if (this.formData.myImpression.includes(this.myImpression)) {
        this.$message({
          type: "info",
          message: "已存在印象"
        });
        return;
      }
      if (this.myImpression.length > 5) {
        this.$message({
          type: "info",
          message: "印象字数不能超过五个"
        });
        return;
      }
      this.formData.myImpression.push(this.myImpression);
      this.myImpression = "";
    },
    validateParams() {
      if (!this.formData.customers) {
        return "客户姓名不能为空";
      }
      if (this.formData.customers.length > 10) {
        return "客户姓名不能超过10个字符";
      }
      if (
        this.formData.tel == null ||
        this.formData.tel == undefined ||
        this.formData.tel == ""
      ) {
        return "客户电话不能为空";
      }
      if (!/^1[3456789]\d{9}$/.test(this.formData.tel)) {
        return "客户电话有误";
      }
      console.log(this.formData);
      if (
        !this.formData.hasOwnProperty("sex") ||
        this.formData.sex == null ||
        this.formData.sex == undefined
      ) {
        return "客户性别为空";
      }
      if (
        !this.formData.desireIntensity ||
        this.formData.desireIntensity == 0
      ) {
        return "购房意向为空";
      }
      if (!this.formData.payWay) {
        return "付款方式为空";
      }

      if (
        this.formData.minFirstPrice &&
        this.formData.maxFirstPrice &&
        Number(this.formData.maxFirstPrice) <
          Number(this.formData.minFirstPrice)
      ) {
        return "首付金额最大值不能小于最小值";
      }
      if (this.formData.minPrice && Number(this.formData.minPrice) > 2000) {
        return "期望总价最小值不能超过2000万";
      }
      if (this.formData.maxPrice && Number(this.formData.maxPrice) > 2000) {
        return "期望总价最大值不能超过2000万";
      }
      if (
        this.formData.minPrice &&
        this.formData.maxPrice &&
        Number(this.formData.maxPrice) < Number(this.formData.minPrice)
      ) {
        return "期望总价最大值不能小于最小值";
      }
      let n = this.formData.minPrice || this.formData.maxPrice || 0;
      let m = this.formData.maxFirstPrice || this.formData.minFirstPrice || 0;
      if (Number(m) > Number(n)) {
        return "首付金额不能大于期望总价";
      }
      if (
        this.formData.minArea &&
        this.formData.maxArea &&
        Number(this.formData.maxArea) < Number(this.formData.minArea)
      ) {
        return "期望面积最大值不能小于最小值";
      }
      return "";
    },
    modifyCusSubmit() {
      let _that = this;
      if (
        _that.formData.school1Array &&
        _that.formData.school1Array instanceof Array
      ) {
        if (_that.formData.school1Array.length > 3) {
          _that.$message({
            type: "info",
            message: "最多只能选三个小学"
          });
          return;
        }
        _that.formData.school1 = _that.formData.school1Array.join("&");
      }
      if (
        _that.formData.school2Array &&
        _that.formData.school2Array instanceof Array
      ) {
        if (_that.formData.school2Array.length > 3) {
          _that.$message({
            type: "info",
            message: "最多只能选三个中学"
          });
          return;
        }
        _that.formData.school2 = _that.formData.school2Array.join("&");
      }
      if (_that.formData.community.length > 3) {
        _that.$message({
          type: "info",
          message: "最多只能选三个楼盘"
        });
        return;
      }
      let rooms = "";
      _that.roomList.forEach((item, index) => {
        rooms += item + "$";
      });
      _that.formData.rooms = rooms;
      _that.formData.community1 = "";
      _that.formData.community2 = "";
      _that.formData.community3 = "";

      _that.formData.community.forEach((item, index, array) => {
        _that.formData["community" + (index + 1)] = item;
      });
      console.log(_that.formData, "修改客户参数");
      let tt = _that.validateParams();
      if (tt) {
        _that.$message({
          type: "info",
          message: tt
        });
        return;
      }
      _that.canSubmit = true;
      _that.$api
        .post({
          url: "/saleCustomer/modifyCustomer",
          data: _that.formData,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          _that.$message({
            type: "info",
            message: result.message
          });
          if (result.code == 200) {
            console.log(result, "修改客源");
            _that.$router.push({
              name: "addOrModifyCustomerResult",
              params: {
                customer: { id: _that.formData.id },
                flag: "modify"
              }
            });
          } else {
            console.log("修改客源" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
            _that.canSubmit = false;
          }
        })
        .catch(e => {
          console.log("录入客源失败catch");
          console.log(e);
          _that.canSubmit = false;
        })
        .finally(() => {});
    }
  }
};
</script>

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
                  clearable
                  placeholder="请输入客户电话号码"
                ></el-input>
              </div>
            </div>
            <!-- 客户籍贯 -->
            <div class="step-item-inline ">
              <div class="step-row-title title-required">客户籍贯:</div>
              <div class="step-row-query">
                <el-select
                  v-model="sssValue"
                  clearable
                  placeholder="请选择客户籍贯"
                >
                  <el-option
                    v-for="item in ssslist"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
                  v-model="sssValue"
                  clearable
                  placeholder="请选择客户来源"
                >
                  <el-option
                    v-for="item in ssslist"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <!--  客源特性 -->
            <div class="step-item-inline ">
              <div class="step-row-title title-required">客源特性:</div>
              <div class="step-row-query">
                <el-select
                  v-model="sssValue"
                  clearable
                  placeholder="请选择客源特性"
                >
                  <el-option
                    v-for="item in ssslist"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
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
          </div>
          <!-- 客户印象 conetnt-->
          <div class="cust-step-row">
            <!-- 客户印象 -->
            <div class="step-item-block">
              <div class="step-row-title">客户印象</div>
              <div class="step-row-query">
                <el-input
                  v-model="sssValue"
                  class="input-olny-botttom"
                ></el-input>
                <el-button type="text">添加</el-button>
              </div>
            </div>
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
                  v-model="sssValue"
                  clearable
                  placeholder="请选择购买用途"
                >
                  <el-option
                    v-for="item in ssslist"
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
                <el-radio-group v-model="sssValue">
                  <el-radio
                    :label="item.value"
                    v-for="item in decoration"
                    :key="item.value"
                    >{{ item.key }}</el-radio
                  >
                </el-radio-group>
              </div>
            </div>
          </div>
          <!-- 首付金额 & 期望总价 content-->
          <div class="cust-step-row">
            <!-- 首付金额 -->
            <div class="step-item-inline">
              <div class="step-row-title">首付金额:</div>
              <div class="step-row-query step-flex-group" data-unit="万">
                <el-input v-model="sssValue" placeholder="最小值"></el-input>
                <span class="input-space"></span>
                <el-input v-model="sssValue" placeholder="最小值"></el-input>
              </div>
            </div>
            <!-- 期望总价 -->
            <div class="step-item-inline">
              <div class="step-row-title">期望总价:</div>
              <div class="step-row-query step-flex-group" data-unit="万">
                <el-input v-model="sssValue" placeholder="最小值"></el-input>
                <span class="input-space"></span>
                <el-input v-model="sssValue" placeholder="最小值"></el-input>
              </div>
            </div>
          </div>
          <!-- 首付面积 & 付款方式-->
          <div class="cust-step-row">
            <!-- 首付面积 -->
            <div class="step-item-inline">
              <div class="step-row-title">首付面积:</div>
              <div class="step-row-query step-flex-group" data-unit="万">
                <el-input v-model="sssValue" placeholder="最小值"></el-input>
                <span class="input-space"></span>
                <el-input v-model="sssValue" placeholder="最小值"></el-input>
              </div>
            </div>
            <!-- 付款方式 -->
            <div class="step-item-inline">
              <div class="step-row-title">付款方式:</div>
              <div class="step-row-query">
                <el-select
                  v-model="sssValue"
                  clearable
                  placeholder="请选择付款方式"
                >
                  <el-option
                    v-for="item in ssslist"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
                  v-model="sssValue1"
                  clearable
                  multiple
                  placeholder="请选择客户期望小学(可多选)"
                >
                  <el-option
                    v-for="item in ssslist"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <!--  客源特性 -->
            <div class="step-item-inline ">
              <div class="step-row-title ">期望中学:</div>
              <div class="step-row-query">
                <el-select
                  v-model="sssValue1"
                  clearable
                  multiple
                  placeholder="请选择客户期望中学(可多选)"
                >
                  <el-option
                    v-for="item in ssslist"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <!-- 期望楼盘 content -->
          <div class="cust-step-row">
            <!-- 期望楼盘 -->
            <div class="step-item-inline ">
              <div class="step-row-title ">期望楼盘:</div>
              <div class="step-row-query">
                <el-select
                  v-model="sssValue1"
                  clearable
                  multiple
                  placeholder="请选择客户期望楼盘(可多选)"
                >
                  <el-option
                    v-for="item in ssslist"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
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
                  v-model="sssValue"
                ></el-input>
              </div>
            </div>
          </div>
        </section>
      </el-collapse-item>
    </el-collapse>
    <div class="add-foot">
      <el-button type="primary" @click="addCusSubmit">提交</el-button>
    </div>
  </section>
</template>

<script>
import { SEX, DECORATION } from "@/util/constMap";
import but from "@/evenBus/but";
export default {
  data() {
    return {
      formData: {
        desireIntensity: 0,
        customers: "",
        sex: 0,
        tel: ""
      },
      sssValue1: [], //请按照实际字段名进行修改，
      sssValue: "", //请按照实际字段名进行修改，
      ssslist: [
        //请按照实际字段名进行修改，
        {
          value: "选项1",
          label: "辛苦了"
        },
        {
          value: "选项2",
          label: "谢谢你"
        }
      ],
      decoration: DECORATION, //装修
      sex: SEX, //性别
      collapseActive: 1 //折叠面板当前激活name
    };
  },
  methods: {
    addCusSubmit() {
      let _that = this;
      _that.$api
        .post({
          url: "/saleCustomer/addCustomer",
          data: _that.formData,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result, "录入客源");
          } else {
            console.log("录入客源" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("录入客源失败catch");
          console.log(e);
        })
        .finally(() => {});
    }
  }
};
</script>

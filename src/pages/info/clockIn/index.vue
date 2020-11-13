<style lang="less" scoped>
.content {
  flex: 1;
  background: #f0f7f7;
  display: flex;
  justify-content: center;
  .center {
    padding: 24px 24px 32px 24px;
    .clock-title {
      font-size: @font24;
    }
    .layout-warper {
      margin-top: 24px;
      display: flex;
      .clock-content {
        width: 852px;
        background: #fff;
        box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
        border-radius: 8px;
        padding: 24px;
        box-sizing: border-box;
        .col-title {
          font-size: @font16;
          display: flex;
          align-items: center;
          color: #303133;
          font-weight: bold;
          margin-top: 24px;
          &:first-child {
            margin-top: 0;
          }
          &.is-require {
            &::before {
              content: "";
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #f62f2f;
              margin-right: 4px;
            }
            &::after {
              content: attr(data-tips);
              font-size: @font14;
              margin-left: 20px;
              color: red;
            }
          }
        }
        .col-content {
          .col-check {
            display: flex;
            margin-top: 16px;
            .col-check-item {
              height: 48px;
              width: 103px;
              background: #f0f2f5;
              border-radius: 4px;
              font-size: @font16;
              text-align: center;
              line-height: 48px;
              margin-right: 16px;
              cursor: pointer;
              color: #909399;
              input {
                display: none;
              }
              &.active {
                background: @backgroud;
                color: #fff;
              }
            }
          }
          .col-textarea {
            margin-top: 16px;
            width: 579px;
            height: 162px;
            /deep/.el-textarea {
              height: 100%;
              .el-textarea__inner {
                height: 100%;
                padding: 16px;
                font-size: @font16;
                font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
                //   &::placeholder {
                //     font-size: @font16;
                //   }
              }
              .el-input__count {
                bottom: 16px;
                right: 16px;
                font-size: @font16;
              }
            }
          }
        }
        .clock-foot {
          display: flex;
          margin-top: 24px;
          button {
            width: 109px;
            height: 40px;
            background: #f4f4f5;
            border-radius: 4px;
            outline: none;
            border: 0;
            font-size: @font16;
            margin-right: 16px;
            cursor: pointer;
            &:last-child {
              margin-right: 0;
            }
          }
          .btn-reset {
            background: #f4f4f5;
          }
          .btn-submit {
            color: #fff;
            background: @backgroud;
          }
        }
      }
      .clock-righ {
        margin-left: 24px;
      }
    }
  }
}
</style>
<template>
  <div class="content">
    <div class="center" v-loading="root.loading">
      <h3 class="clock-title">忙碌一日后，不妨写一点什么记录一下今天！</h3>
      <div class="layout-warper">
        <div class="clock-content">
          <div
            class="col-title is-require"
            :data-tips="errorBags.first('activeScore')"
          >
            自评分
          </div>
          <div class="col-content">
            <div class="col-check">
              <label
                class="col-check-item"
                v-for="item in root.score"
                :key="item"
                :class="{ active: root.form.activeScore == item }"
              >
                <input
                  type="radio"
                  v-model="root.form.activeScore"
                  :value="item"
                  name="activeScore"
                  v-validate="'required'"
                  data-vv-name="activeScore"
                  data-vv-as="自评分"
                />
                <span>{{ item }}分</span>
              </label>
            </div>
          </div>
          <template v-if="root.config.growth">
            <div
              class="col-title is-require"
              :data-tips="errorBags.first('summary')"
            >
              今日成长与问题
            </div>
            <div class="col-content">
              <div class="col-textarea">
                <el-input
                  type="textarea"
                  placeholder="请输入今日总结"
                  v-model="root.form.summary"
                  maxlength="50"
                  v-validate="'required'"
                  data-vv-name="summary"
                  data-vv-as="今日总结"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </div>
            </div>
          </template>
          <template v-if="root.config.share">
            <div
              class="col-title is-require"
              :data-tips="errorBags.first('share')"
            >
              今日案例分享
            </div>
            <div class="col-content">
              <div class="col-textarea">
                <el-input
                  type="textarea"
                  placeholder="请输入今日案例分享"
                  v-model="root.form.share"
                  maxlength="50"
                  show-word-limit
                  resize="none"
                  v-validate="'required'"
                  data-vv-name="share"
                  data-vv-as="今日案例分享"
                >
                </el-input>
              </div>
            </div>
          </template>
          <template v-if="root.config.excavate">
            <div class="col-title">今日挖掘优质房源</div>
            <div class="col-content">
              <div class="col-textarea">
                <el-input
                  type="textarea"
                  placeholder="请输入今日挖掘优质房源"
                  v-model="root.form.excavate"
                  maxlength="50"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </div>
            </div>
          </template>
          <template v-if="root.config.clientDemand">
            <div class="col-title ">急购客户需求</div>
            <div class="col-content">
              <div class="col-textarea">
                <el-input
                  type="textarea"
                  placeholder="请输入急购客户需求"
                  v-model="root.form.clientDemand"
                  maxlength="50"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </div>
            </div>
          </template>
          <template v-if="root.config.plan">
            <div class="col-title">明日计划</div>
            <div class="col-content">
              <div class="col-textarea">
                <el-input
                  type="textarea"
                  placeholder="请输入明日计划"
                  v-model="root.form.plan"
                  maxlength="50"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </div>
            </div>
          </template>

          <div class="clock-foot">
            <button class="btn-reset" @click="resetForm">重置</button>
            <button class="btn-submit" @click="validateForm">提交日志</button>
          </div>
        </div>
        <div class="clock-righ">
          <clock-time />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { V2Init } from "vcomposition2";
import { enter } from "./realization/index";
import clockTime from "../components/clockTime";
export default V2Init({
  created: [enter],
  $_veeValidate: {
    validator: "new"
  },
  components: {
    clockTime
  }
});
</script>

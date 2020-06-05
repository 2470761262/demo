<style lang="less" scoped>
.look-record-content {
  width: 610px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 40px;
  box-sizing: border-box;
  max-height: 710px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  .record-title {
    display: flex;
    padding-bottom: 35px;
    .record-content-title {
      font-size: 18px;
      color: #999;
      margin-left: 50px;
      font-weight: normal;
      position: relative;
      cursor: pointer;
      &.is-active {
        font-weight: 600;
        color: black;
        &::after {
          content: "";
          position: absolute;
          height: 2px;
          width: 100%;
          left: 0;
          bottom: -8px;
          background: #ddd;
        }
      }
      &:first-child {
        margin-left: 0px;
      }
    }
  }
  .record-content-scroll {
    flex: 1;
    height: 0;
    overflow: auto;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: #999;
      border-radius: 50px;
    }
  }
  .record-content-foot {
    display: flex;
    padding: 0 20px;
    margin: 25px -15px 0;
    justify-content: center;
    .task-button {
      flex: 0 0 calc((100% - 90px) / 3);
      // margin: 0 15px;
      /deep/span {
        font-size: 18px;
        color: black;
      }
    }
  }
}
.follow-content {
  padding-bottom: 45px;
  .follow-content-head {
    font-size: 20px;
  }
  .follow-content-foot {
    display: flex;
    font-size: 18px;
    align-items: center;
    margin-top: 25px;
    .follow-fool-title {
      color: #dddddd;
      margin-right: 20px;
      flex-shrink: 0;
    }
    .follow-fool-msg {
      color: black;
      word-break: break-all;
    }
  }
}
.recommend-content {
  padding: 0 10px 30px 0;
  .recommend-head {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    align-items: center;
    .el-icon-close {
      padding: 0;
      width: 25px;
      height: 25px;
      background: #52ae6e;
      color: #fff;
      text-align: center;
      line-height: 25px;
      border-radius: 50%;
    }
  }
  .recommend-body {
    margin-top: 20px;
    display: flex;
    .recommend-body-image {
      width: 150px;
      height: 95px;
      border-radius: 10px;
      margin-right: 20px;
      flex-shrink: 0;
    }
    .recommend-body-data {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .body-data-head {
        display: flex;
        align-items: center;
        .head-title {
          flex: 1;
          font-size: 20px;
          color: #333;
          width: 0;
        }
        .head-no {
          margin-left: 10px;
          color: #999;
          font-size: 15px;
        }
      }
      .body-data-foot {
        display: flex;
        justify-content: space-between;

        .foot-left {
          font-size: 17px;
          color: #333;
          // display: flex;
          // flex-direction: column;
          // justify-content: space-between;
          > div:first-child {
            margin-bottom: 15px;
          }
          span {
            &.unit {
              color: red;
            }
            &.price {
              .unit;
              font-size: 24px;
            }
            &:last-child {
              margin-right: 20px;
            }
          }
        }
        .foot-right {
          display: flex;
          align-items: center;
          .foot-right-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 15px;
          }
          .foot-right-name {
            font-size: 16px;
            color: #333;
          }
        }
      }
    }
  }
}
.text-area {
  box-shadow: inset 2px 4px 10px rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  margin-bottom: 10px;
  textarea {
    width: 100%;
    resize: none;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
  }
  .text-area-button {
    margin-left: auto;
    display: block;
    background: rgba(227, 71, 72);
    color: #fff;
  }
}
</style>
<template>
  <div class="look-record-content">
    <div class="record-title">
      <h3
        class="record-content-title"
        :class="{ 'is-active': showBox == 0 }"
        @click="showBox = 0"
      >
        跟进记录
      </h3>
      <h3
        class="record-content-title"
        :class="{ 'is-active': showBox == 1 }"
        @click="showBox = 1"
      >
        推荐记录
      </h3>
    </div>
    <div class="record-content-scroll" v-show="showBox == 0">
      <div class="text-area">
        <textarea
          rows="5"
          placeholder="对这个客户想说点什么?请写下来吧"
          v-model="message"
        ></textarea>
        <el-button class="text-area-button" @click="confirm">提交</el-button>
      </div>
      <left-progress v-for="(item, index) in list" :key="index">
        <template>
          <div class="follow-content">
            <div class="follow-content-head">{{ item.FollowTime }}</div>
            <div class="follow-content-foot">
              <div class="follow-fool-title">
                {{ item.perName }}( {{ item.deptName }}):
              </div>
              <div class="follow-fool-msg">{{ item.Memo }}</div>
            </div>
          </div>
        </template>
      </left-progress>
      <div v-if="list.length == 0">
        暂无数据.
      </div>
    </div>
    <div class="record-content-scroll" v-show="showBox == 1">
      <left-progress v-for="(item, index) in 7" :key="index">
        <template>
          <div class="recommend-content">
            <div class="recommend-head">
              <div class="recommend-head-title">2001-09-06 11:04:21</div>
              <el-button type="text" class="el-icon-close"></el-button>
            </div>
            <div class="recommend-body">
              <el-image
                class="recommend-body-image"
                src="http://img.0be.cn/FileUpload/PicFile_Agent2020/PicFile_Agent202003/20200323/base6420200323200224615_35024.jpg?x-oss-process=style/thumb"
              ></el-image>
              <div class="recommend-body-data">
                <div class="body-data-head">
                  <div class="head-title">
                    国贸天琴湾-天悦
                  </div>
                  <div class="head-no">X+CS201910096157</div>
                </div>
                <div class="body-data-foot">
                  <div class="foot-left">
                    <div><span>157㎡</span>4室2厅2卫</div>
                    <div>
                      <span class="price">328</span
                      ><span class="unit">万</span>20878平
                    </div>
                  </div>
                  <div class="foot-right">
                    <img
                      class="foot-right-img"
                      src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epTLLaOTYK4DlMakQOhLVUkTxTCyheeo9sskl0ZcppyC8YUKibh5ictz6XCZBGIntsxrIfvF4MQf6rQ/132"
                      alt=""
                    />
                    <h3 class="foot-right-name">谢谢你</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </left-progress>
      <div v-if="list.length == 0">
        暂无数据.
      </div>
    </div>
    <div class="record-content-foot">
      <el-button
        class="task-button"
        v-show="showBox === 1"
        @click="openPop('addPop')"
        >添加推荐</el-button
      >
    </div>
    <!-- 添加推荐 -->
    <add-recommend
      :visible.sync="addPop"
      v-if="addPop"
      title="添加推荐"
      style-type="0"
      width="7.5rem"
    >
    </add-recommend>
  </div>
</template>

<script>
import leftProgress from "../otherCom/leftProgress";
import { mapState, mapMutations } from "vuex";
import moment from "moment";
import util from "@/util/util";
export default {
  components: {
    leftProgress,
    //添加推挤
    addRecommend: () => import("../didLog/addRecommend/addRecommend")
  },
  data() {
    return {
      message: "", //写跟进内容
      list: [],
      showBox: 0,
      addPop: false, //添加推荐弹出层开关
      formData: { EntructId: "", Memo: "" }
    };
  },
  methods: {
    openPop(popName) {
      this[popName] = true;
    },
    confirm() {
      let _that = this;
      _that.formData.EntructId = util.sessionLocalStorageGet("cosDetail:id");
      _that.formData.Memo = _that.message;
      _that.$api
        .post({
          url: "/saleCustomer/addSaleCusFlower",
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
            console.log(result, "写跟进");
            _that.$message({
              type: "success",
              message: result.message
            });
            //重新加载ajax
            _that.$api
              .post({
                url: "/saleCustomerDetail/getSaleCusFlower",
                data: { id: util.sessionLocalStorageGet("cosDetail:id") },
                headers: { "Content-Type": "application/json" }
              })
              .then(e => {
                let result = e.data;
                console.log("获取跟进记录", e);
                if (result.code == 200) {
                  //result.data.pageSum
                  this.$store.commit("updateFollow", {
                    cusFollow: result
                  });
                }
              })
              .catch(e => {
                console.log("获取跟进记录失败");
                console.log(e);
              })
              .finally(() => {});
          } else {
            console.log("写跟进" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("写跟进失败catch");
          console.log(e);
        })
        .finally(() => {
          //清除输入框的值
          _that.message = "";
        });
    }
  },
  watch: {
    detail: {
      deep: true,
      handler(newValue) {
        console.log("follow", newValue);
        if (newValue.code == 200) {
          //设置带看进度
          this.list = newValue.data;
        } else {
          this.$message({
            type: "info",
            message: newValue.message
          });
        }
      }
    }
  },
  computed: {
    ...mapState({
      detail: value => {
        return value.customers.follow.cusFollow;
      }
    })
  }
};
</script>

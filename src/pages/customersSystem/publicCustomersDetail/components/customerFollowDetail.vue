<style lang="less" scoped>
.part-Warp {
  padding: 24px;
}
.MainTitleRow {
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f2f5;
  .MainTitle {
    font-size: @font24;
    line-height: 36px;
    font-weight: bold;
  }
  .AddFollow {
    width: 96px;
    height: 36px;
    border: 0;
    border-radius: 4px;
    background: @backgroud;
    color: #ffffff;
    font-size: @font16;
  }
}
.FollowCardZone {
  padding: 24px 0;
  .FollowCell {
    .cellTilRow {
      display: flex;
      .cellTil {
        // prettier-ignore
        font-size: 16PX;
        font-weight: bold;
        line-height: 24px;
      }
      .fristCellDot,
      .cellDot {
        margin: 0 16px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        > div {
          margin: 5px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
        }
      }
      .fristCellDot {
        background: @opacityBackground;
        > div {
          background: @backgroud;
        }
      }
      .cellDot {
        background: #e9e9eb;
        > div {
          background: #909399;
        }
      }
      .cellTime {
        // prettier-ignore
        font-size: 16PX;
        line-height: 24px;
      }
    }
    .cellMsgBox {
      margin-top: 24px;
      margin-bottom: 24px;
      margin-left: 91px;
      border-left: 2px solid #909399;
      padding: 20px 30px;
      .cellMsg {
        padding: 4px 16px;
        background: #f8f8f8;
        .cellMsgRow {
          padding: 12px 0;
          display: flex;
          .cellMsgTil {
            font-size: @font14;
            width: 94px;
            color: #606266;
          }
          .cellMsgText {
            margin-right: 120px;
            font-size: @font14;
          }
        }
      }
    }
    .lastCellMsgBox {
      border-left: 2px solid #ffffff !important;
    }
  }
}
</style>
<template>
  <div class="part-Warp">
    <div class="MainTitleRow">
      <div class="MainTitle">跟进记录</div>
      <button class="AddFollow">写跟进</button>
    </div>
    <div class="FollowCardZone">
      <div class="FollowCell" v-for="(item, index) in FollowData" :key="index">
        <div class="cellTilRow">
          <div class="cellTil">跟进信息</div>
          <div :class="index == 0 ? 'fristCellDot' : 'cellDot'">
            <div></div>
          </div>
          <div class="cellTime">{{ item.Time }}</div>
        </div>
        <div
          class="cellMsgBox"
          :class="index == FollowData.length - 1 ? 'lastCellMsgBox ' : ''"
        >
          <div class="cellMsg">
            <div class="cellMsgRow">
              <div class="cellMsgTil">跟进人：</div>
              <div class="cellMsgText">{{ item.Per }}</div>
            </div>
            <div class="cellMsgRow">
              <div class="cellMsgTil">跟进类型：</div>
              <div class="cellMsgText">{{ item.Type }}</div>
            </div>
            <div class="cellMsgRow">
              <div class="cellMsgTil">跟进方式：</div>
              <div class="cellMsgText">{{ item.Way }}</div>
            </div>
            <div class="cellMsgRow">
              <div class="cellMsgTil">跟进内容：</div>
              <div class="cellMsgText">
                {{ item.Text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      FollowData: [
        {
          Time: "2020-10-10 22:22:22",
          Per: "林俊杰",
          Type: "日常回访",
          Way: "电话",
          Text:
            "跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容"
        },
        {
          Time: "2020-10-10 22:22:22",

          Per: "林俊杰",
          Type: "日常回访",
          Way: "电话",
          Text:
            "跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容"
        },
        {
          Time: "2020-10-10 22:22:22",

          Per: "林俊杰",
          Type: "日常回访",
          Way: "电话",
          Text:
            "跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容跟进内容"
        }
      ]
    };
  }
};
</script>

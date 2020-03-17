<style lang="less" scoped>
.page-content-heard {
  display: flex;
  .heard-message {
    width: 480px;
    .heard-message-title {
      font-size: 24px;
      color: black;
      font-weight: 600;
    }
    .heard-message-position {
      font-size: 14px;
      margin: 8px 0;
      .icon {
        font-size: 16px;
      }
    }
    .heard-scroll-tag {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 10px;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-button,
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-track-piece {
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        background: #c9c9c9;
        border-radius: 50px;
      }
      .tag-content {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        background: #11a760;
        position: relative;
        margin-right: 20px;
        &:hover {
          margin-right: 35px;
          .icon {
            display: block;
          }
        }
        span {
          color: #fff;
          line-height: 1;
          font-size: 14px;
          white-space: nowrap;
        }
        .icon {
          padding-left: 4px;
          display: none;
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translate(100%, -50%);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
  }
  .heard-item {
    display: flex;
    flex: 1;
    height: 70px;
    align-self: center;
    border-right: 1px solid #d5d5d5;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:nth-child(2) {
      border-left: 1px solid #d5d5d5;
      margin-left: 25px;
    }
    &:last-child {
      border-right: none;
      flex: 0 0 300px;
      cursor: auto;
    }
    > .icon {
      font-size: 50px;
      color: #d2d2d2;
      margin-right: 25px;
    }
    > span {
      color: #b8b8b8;
      font-size: 20px;
      font-weight: 600;
    }
    .qr-content {
      display: flex;
      .qr-img {
        width: 65px;
        height: 65px;
        margin-right: 30px;
      }
      .qr-code-msg {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .qr-title {
          color: #8f8f8f;
        }
        .qr-NO {
          color: #686868;
        }
        .qr-tips {
          color: #e3726c;
        }
      }
    }
  }
}
</style>
<template>
  <section>
    <section class="page-content-heard">
      <!-- 房源信息 -->
      <section class="heard-message">
        <h3 class="heard-message-title overText">89平琴瑟金装 中搞成 3房2厅 车位零售16万</h3>
        <div class="heard-message-position overText"><i class="el-icon-map-location icon"></i> 新罗区-夏新博士管</div>
        <div class="heard-scroll-tag">
          <div class="tag-content">
            <span>装修漂亮</span>
            <i class="el-icon-close icon"></i>
          </div>
          <div class="tag-content">
            <span>较适合年轻人居住</span>
            <i class="el-icon-close icon"></i>
          </div>
          <div class="tag-content">
            <span>较适合年轻人居住</span>
            <i class="el-icon-close icon"></i>
          </div>
          <div class="tag-content">
            <span>无心</span>
            <i class="el-icon-close icon"></i>
          </div>
          <div class="tag-content">
            <span>流行</span>
            <i class="el-icon-close icon"></i>
          </div>
          <div class="tag-content">
            <span>流行</span>
            <i class="el-icon-close icon"></i>
          </div>
          <div class="tag-content">
            <span>流行</span>
            <i class="el-icon-close icon"></i>
          </div>
        </div>
      </section>
      <!-- 房源印象 -->
      <section class="heard-item"
               @click="nodePop">
        <i class="el-icon-sunny icon"></i>
        <span>房源印象</span>
      </section>
      <!-- 写跟进 -->
      <section class="heard-item"
               @click="openPopUp('followUpFlag')">
        <i class="el-icon-edit icon"></i>
        <span>写跟进</span>
      </section>
      <!-- 已关注 -->
      <section class="heard-item">
        <i class="el-icon-sunny icon"></i>
        <span>已关注</span>
      </section>
      <!-- 举报 -->
      <section class="heard-item"
               @click="openPopUp('reportFlag')">
        <i class="el-icon-sunny icon"></i>
        <span>举报</span>
      </section>
      <!-- 二维码 -->
      <article class="heard-item">
        <div class="qr-content">
          <img class="qr-img"
               src="http://sys.lsxjy.com.cn/images/androidDownload.png"
               alt="">
          <div class="qr-code-msg">
            <h3 class="qr-title">房源编号:</h3>
            <div class="qr-NO">X+CS2008GFSDFDF</div>
            <div class="qr-tips">微信扫一扫,立即分享房源</div>
          </div>
        </div>
      </article>
    </section>
    <!-- 写跟进 -->
    <followUp :visible.sync="followUpFlag"
              v-if="followUpFlag"></followUp>
    <!-- 举报 -->
    <report :visible.sync="reportFlag"
            v-if="reportFlag"
            typeClass="error"
            title="!举报"></report>
  </section>
</template>
<script>
//写跟进弹出层 
import followUp from '../didLog/followUp';
//举报弹出层
import report from '../didLog/report';
export default {
  components: {
    followUp,
    report
  },
  data () {
    return {
      followUpFlag: false, //跟进开关
      reportFlag: false, //举报开关
      vvsd: ''
    }
  },
  methods: {
    openPopUp (PopName) {
      this[PopName] = true;
    },
    nodePop () {
      this.$prompt(null, '房源印象显示在房源左上角,仅自己可见', {
        confirmButtonText: '添加',
        cancelButtonText: '取消',
        inputPlaceholder: '推荐5个字以内',
        lockScroll: false,
        inputValidator: (e) => {
          if (e && e.length > 10)
            return '精简点.'
        },
        beforeClose (action, instance, done) {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              instance.confirmButtonLoading = false;
            }, 3000);
          } else {
            done();
          }
        }
      }).then((value) => {
        console.log(action, instance, done);
      }).catch(() => {

      })
    }
  },
}
</script>

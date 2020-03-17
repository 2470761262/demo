<style lang="less" scoped>
.page-button-group {
  display: flex;
  justify-content: center;
  padding-top: 28px;
  padding-bottom: 60px;
  .button-set {
    margin-left: 0;
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
    /deep/span {
      font-size: 22px;
    }
  }
  /deep/ .el-button {
    /deep/span {
      font-size: 22px;
    }
  }
}
.node-centent {
  text-align: center;
  i {
    font-size: 60px;
    color: #fec354;
  }
  p {
    margin-top: 15px;
  }
}
</style>
<template>
  <section>
    <div class="page-button-group">
      <!-- 发布外网 -->
      <div class="button-set">
        <el-button @click="openPopUp('releasePopFlag')">
          <i class="el-icon-s-promotion el-icon--left"></i>发布外网
        </el-button>
      </div>
      <!-- 成交对赌 -->
      <div class="button-set">
        <el-button @click="openPopUp('betPopFlag')">
          <i class="el-icon-s-promotion el-icon--left"></i>成交对赌
        </el-button>
      </div>
      <!-- 转房源状态 -->
      <div class="button-set">
        <el-button @click="openPopUp('typeFlag')">
          <i class="el-icon-s-promotion el-icon--left"></i>转房源状态
        </el-button>
      </div>
      <!-- 取消作业方 -->
      <div class="button-set">
        <el-button @click="openPopUp('cencelTaskFlag')">
          <i class="el-icon-s-promotion el-icon--left"></i>取消作业方
        </el-button>
      </div>
      <!-- 锁定房源 -->
      <div class="button-set">
        <el-button>
          <i class="el-icon-s-promotion el-icon--left"></i>锁定房源
        </el-button>
      </div>
      <!-- 修改钥匙存放门店 -->
      <div class="button-set">
        <el-button @click="keyStorage">
          <i class="el-icon-s-promotion el-icon--left"></i>修改钥匙存放门店
        </el-button>
      </div>
    </div>
    <!-- 发布外网 -->
    <releasePop :visible.sync="releasePopFlag"
                width="300px"
                title=""
                maskHideEvent
                v-if="releasePopFlag"></releasePop>
    <!-- 成交对赌 -->
    <betPop :visible.sync="betPopFlag"
            v-if="betPopFlag"
            title="说明"
            maskHideEvent
            width="600px"></betPop>
    <!-- 转房源状态 -->
    <changeHouseType title=""
                     :visible.sync="typeFlag"
                     width="580px"
                     maskHideEvent
                     v-if="typeFlag"></changeHouseType>
    <!-- 取消作业方 -->
    <cancelTask title=""
                :visible.sync="cencelTaskFlag"
                width="680px"
                maskHideEvent
                v-if="cencelTaskFlag">
    </cancelTask>
  </section>
</template>

<script>
//举报弹出层
import releasePop from '../didLog/releasePop';
//成交对赌
import betPop from '../didLog/betPop';
//转房源状态
import changeHouseType from '../didLog/changeHouseType';
//取消作业方
import cancelTask from '../didLog/cancelTask';
export default {
  components: {
    releasePop,
    betPop,
    changeHouseType,
    cancelTask
  },
  data () {
    return {
      releasePopFlag: false,
      betPopFlag: false,
      typeFlag: false,
      cencelTaskFlag: false,
    }
  },
  methods: {
    openPopUp (PopName) {
      this[PopName] = true;
    },
    //钥匙存储
    keyStorage () {
      this.$prompt(null, '您的钥匙要存放哪个门店?', {
        confirmButtonText: '确定',
        showCancelButton: false,
        lockScroll: false,
      }).then((value) => {
        console.log(value);
      }).catch(() => {

      })
    },
    message (icon, text) {
      const h = this.$createElement;
      return this.$msgbox({
        title: '',
        lockScroll: false,
        customClass: 'mini-message-box but-center',
        message: h('div', {
          attrs: {
            class: 'node-centent'
          }
        }, [
          h('i', {
            attrs: {
              class: icon
            }
          }),
          h('p', null, text)
        ]),
        showCancelButton: false,
        confirmButtonText: '确定',
      }).then(() => {

      }).catch(() => {

      })
    }
  },
}
</script>

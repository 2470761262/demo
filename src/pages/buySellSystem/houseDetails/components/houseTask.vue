<style lang="less" scoped>
.task-content {
  margin-left: 20px;
}
.other-title {
  font-size: 30px;
  font-weight: 600;
  margin-top: 80px;
}
.task-pro-flex {
  display: flex;
  &.seat {
    &::after {
      content: "";
      .task-pro-content;
      visibility: hidden;
    }
  }
  .task-pro-content {
    margin-top: 30px;
    height: 85px;
    flex: 1;
    margin-right: 25px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    position: relative;
    display: flex;
    align-items: center;
    width: 0;
    flex-shrink: 0;
    &.flex-center {
      justify-content: center;
      .el-button {
        padding: 0 5px;
        width: auto;
        margin-right: 0;
      }
    }
    &:after {
      content: attr(data-detail);
      position: absolute;
      top: 0;
      left: 0;
      background: #a5a5a5;
      color: #fff;
      font-weight: 600;
      font-size: 15px;
      padding: 2px 4px;
      border-radius: 4px;
    }
    .task-pro-img {
      width: 67px;
      height: 67px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      margin-left: 55px;
    }
    .task-pro-message {
      margin-left: 15px;
      flex: 1;
      width: 0;
      .task-pro-name {
        font-size: 24px;
        color: #515151;
        font-weight: 600;
      }
      .task-pro-options {
        color: #bbbbbb;
        font-size: 16px;
        margin-top: 5px;
      }
    }
    /deep/.el-button {
      margin-right: 8px;
      flex-shrink: 0;
      width: 100px;
      height: 35px;
      line-height: 35px;
      padding: 0;
      background-image: linear-gradient(115deg, #0d8f51 60%, #10a65f);
      letter-spacing: 4px;
      .icon {
        font-size: 20px;
        vertical-align: middle;
      }
      span {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>
<template>
  <div class="task-content">
    <h3 class="other-title">房源作业方</h3>
    <div class="task-pro-flex">
      <div class="task-pro-content"
           data-detail="录入人">
        <el-image class="task-pro-img"
                  src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201908/20190811/20190811111530328_34985.jpg?x-oss-process=style/thumb"
                  fit="cover">
          <div slot="placeholder"
               class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
        <div class="task-pro-message">
          <div class="task-pro-name overText">张三</div>
          <div class="task-pro-options overText">天晴玩点</div>
        </div>
      </div>
      <div class="task-pro-content"
           data-detail="委托人">
        <el-image class="task-pro-img"
                  src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201908/20190811/20190811111530328_34985.jpg?x-oss-process=style/thumb"
                  fit="cover">
          <div slot="placeholder"
               class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
        <div class="task-pro-message">
          <div class="task-pro-name overText">龙王</div>
          <div class="task-pro-options overText">紫荆二店</div>
        </div>
      </div>
    </div>
    <div class="task-pro-flex">
      <div class="task-pro-content"
           data-detail="跟单人">
        <el-image class="task-pro-img"
                  src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201908/20190811/20190811111530328_34985.jpg?x-oss-process=style/thumb"
                  fit="cover">
          <div slot="placeholder"
               class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
        <div class="task-pro-message">
          <div class="task-pro-name overText">李四</div>
          <div class="task-pro-options overText">紫荆二店</div>
        </div>
        <el-button> <i class="el-icon-sunny icon"></i> <span>取代</span> </el-button>
      </div>
      <div class="task-pro-content"
           data-detail="钥匙人">
        <el-image class="task-pro-img"
                  src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201908/20190811/20190811111530328_34985.jpg?x-oss-process=style/thumb"
                  fit="cover">
          <div slot="placeholder"
               class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
        <div class="task-pro-message">
          <div class="task-pro-name overText">朱国武</div>
          <div class="task-pro-options overText">宇宙懂点</div>
        </div>
        <el-button> <i class="el-icon-sunny icon"></i> <span>取代</span> </el-button>
      </div>
    </div>
    <div class="task-pro-flex seat">
      <div class="task-pro-content flex-center"
           data-detail="实勘人">
        <el-button>申请实勘人</el-button>
      </div>
    </div>
    <!--取代 -->
    <replacePop :visible.sync="replacePopFlag"
                v-if="replacePopFlag"
                width="620px"
                title=""></replacePop>
    <!-- <el-dialog :visible.sync="supplementflag">
      <supplement></supplement>
    </el-dialog> -->
  </div>
</template>

<script>
import supplement from '@/pages/buySellSystem/addHouse/components/supplement.vue';
//取代
import replacePop from '../didLog/replacePop';
export default {
  components: {
    supplement,
    replacePop
  },
  data () {
    return {
      supplementflag: false,
      replacePopFlag: true
    }
  },
  methods: {
    openSupplement () {

    }
  },
}
</script>


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
  <div class="task-content"
       v-if="resultData.agentHouseMethod">
    <h3 class="other-title">房源作业方</h3>
    <div class="task-pro-flex">
      <div class="task-pro-content"
           data-detail="录入人">
        <el-image class="task-pro-img"
                  v-if="resultData"
                  :src=" resultData.agentHouseMethod.addPerHeadImg | defaultImg"
                  fit="cover">
          <div slot="placeholder"
               class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
        <div class="task-pro-message">
          <div class="task-pro-name overText">{{resultData.agentHouseMethod.addPerName | emptyRead}}</div>
          <div class="task-pro-options overText">{{resultData.agentHouseMethod.addPerDepartmentName | emptyRead}}</div>
        </div>
      </div>
      <div class="task-pro-content"
           data-detail="跟单人"
           v-if="resultData.agentPerName!=null ">
        <el-image class="task-pro-img"
                  :src="resultData.agentPerHeadImg |  defaultImg"
                  fit="cover">
          <div slot="placeholder"
               class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
        <div class="task-pro-message">
          <div class="task-pro-name overText">{{resultData.agentPerName}}</div>
          <div class="task-pro-options overText">{{resultData.agentPerDepartmentName}}</div>
        </div>
      </div>
    </div>
    <div class="task-pro-flex">
      <div :class="['task-pro-content',{'flex-center':resultData.agentHouseMethod.keyOwnerName==null}]"
           data-detail="钥匙人">
        <template v-if="resultData.agentHouseMethod.keyOwnerName!=null">
          <el-image class="task-pro-img"
                    :src="resultData.agentHouseMethod.keyOwnerHeadImg |  defaultImg"
                    fit="cover">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <div class="task-pro-message">
            <div class="task-pro-name overText">{{resultData.agentHouseMethod.keyOwnerName}}</div>
            <div class="task-pro-options overText">{{resultData.agentHouseMethod.keyOwnerDepartmentName}}</div>
          </div>
          <el-button> <i class="el-icon-sunny icon"></i> <span>取代</span> </el-button>
        </template>
        <el-button v-else><span>申请钥匙人</span> </el-button>
      </div>
      <div :class="['task-pro-content',{'flex-center':resultData.agentHouseMethod.onlyOwnerName==null}]"
           data-detail="委托人">
        <template v-if="resultData.agentHouseMethod.onlyOwnerName!=null">
          <el-image class="task-pro-img"
                    :src="resultData.agentHouseMethod.onlyOwnerHeadImg | defaultImg "
                    fit="cover">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <div class="task-pro-message">
            <div class="task-pro-name overText">{{resultData.agentHouseMethod.onlyOwnerName}}</div>
            <div class="task-pro-options overText">{{resultData.agentHouseMethod.onlyOwnerName}}</div>
          </div>
          <el-button> <i class="el-icon-sunny icon"></i> <span>取代</span> </el-button>
        </template>
        <el-button v-else><span>申请委托人</span> </el-button>
      </div>
    </div>
    <div class="task-pro-flex seat">
      <div :class="['task-pro-content',{'flex-center':resultData.agentHouseMethod.realOwnerName==null}]"
           data-detail="实勘人">
        <template v-if="resultData.agentHouseMethod.realOwnerName!=null">
          <el-image class="task-pro-img"
                    :src="resultData.agentHouseMethod.realOwnerHeadImg | defaultImg "
                    fit="cover">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <div class="task-pro-message">
            <div class="task-pro-name overText">{{resultData.agentHouseMethod.realOwnerName}}</div>
            <div class="task-pro-options overText">{{resultData.agentHouseMethod.realOwnerDepartmentName}}</div>
          </div>
          <el-button> <i class="el-icon-sunny icon"></i> <span>取代</span> </el-button>
        </template>
        <el-button v-else>申请实勘人</el-button>
      </div>
    </div>

    <!-- <el-dialog :visible.sync="supplementflag">
      <supplement></supplement> 
      <houseUploadExtends></houseUploadExtends>
    </el-dialog> -->
  </div>
</template>

<script>
import supplement from '@/pages/buySellSystem/addHouse/components/supplement.vue';
import houseUploadExtends from './houseUploadExtends';
export default {
  inject: ["houseDetails", "houseId"],
  computed: {
    resultData () {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data
      } else {
        return {};
      }
    }
  },
  components: {
    supplement,
    houseUploadExtends
  },
  data () {
    return {
      supplementflag: true
    }
  },
  methods: {
    openSupplement () {

    }
  },
}
</script>


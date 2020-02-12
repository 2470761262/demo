<style lang="less" scoped>
.page-cell {
  padding-left: 60px;
  padding-top: 60px;
  .page-cell-title {
    font-size: 24px;
    color: #333;
    font-weight: 600;
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
  .page-cell-item {
    margin-top: 20px;
    display: flex;
    /deep/.el-input-group {
      width: auto;
    }
    /deep/.el-input-group__prepend,
    /deep/.el-input-group__append {
      border: none;
      background: none;
    }
    /deep/.el-input-group__prepend {
      padding: 0;
    }
    /deep/.el-input__inner {
      border-radius: 4px;
      width: 210px;
    }
    .item-after {
      color: #1c7334;
      font-size: 14px;
      cursor: pointer;
    }
    .item-before {
      font-size: 16px;
      color: #606266;
      width: 80px;
      align-self: center;
      white-space: nowrap;
      &:before {
        content: attr(data-before);
        color: red;
      }
    }
  }
}
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-title">房屋坐落</div>
    <!-- 楼盘名称 -->
    <div class="page-cell-item">
      <el-input placeholder="请输入楼盘名称"
                v-model="formData.floor">
        <div slot="prepend"
             class="item-before"
             data-before="*">楼盘</div>
        <div slot="append"
             class="item-after">
          补充楼盘<i class="el-icon-question"></i></div>
      </el-input>
    </div>
    <!-- 栋座 -->
    <div class="page-cell-item">
      <div class="item-before"
           data-before="*">栋座</div>
      <el-select filterable
                 v-model="formData.tung"
                 placeholder="请选择栋座">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!-- 房间号 -->
    <div class="page-cell-item">
      <div class="item-before"
           data-before="*">房间号</div>
      <el-select filterable
                 v-model="formData.room"
                 placeholder="请选择房间号">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="page-cell-title">业主信息</div>
    <!-- 业主姓名 -->
    <div class="page-cell-item">
      <el-input placeholder="请输入业主姓名"
                v-model="formData.perName">
        <div slot="prepend"
             class="item-before"
             data-before="*">业主姓名</div>
      </el-input>
    </div>
    <!-- 称谓 -->
    <div class="page-cell-item">
      <div slot="prepend"
           class="item-before"
           data-before="*">称谓</div>
      <el-radio-group v-model="formData.sex"
                      size="mini">
        <el-radio :label="item"
                  border
                  v-for="(item,index) in sexList"
                  :key="index">{{item}}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
//商圈
let sex = ['男', '女'];
export default {
  data () {
    return {
      formData: {
        floor: '',
        tung: '',
        room: '',
        perName: '',
        sex: ''
      },
      sexList: sex,
      options: [
        { value: 1, label: 1 },
        { value: 2, label: 2 }
      ]
    }
  }
}
</script>
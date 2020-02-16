<style lang="less" scoped >
.page-form-inline {
  display: flex;
  /deep/.el-input-group__append {
    color: #606266;
    background: none;
    border: none;
  }
  &::after {
    content: attr(data-tips);
    line-height: 40px;
    font-size: 14px;
    margin-left: 20px;
    color: #606266;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.page-form-tips {
  height: 50px;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 20px;
  //line-height: 50px;
  display: table-cell;
  vertical-align: middle;
}
.dividingLine {
  height: 1px;
  background: #c0c4cc;
  width: 10px;
  align-self: center;
  margin: 0 10px 20px;
}
/deep/.is-bordered {
  margin-left: 0 !important;
}
.marLeft20 {
  margin-left: 20px;
}
</style>
<template >
  <div>
    <div class="page-form-tips">Tips：请根据自己的房源需求，来匹配相应的房源，匹配项多选，不填则视为该选项不查询；</div>
    <el-form ref="form"
             @submit.native.prevent
             :model="form"
             label-width="80px"
             label-position="right">
      <!-- 楼盘 -->
      <div class="page-form-inline">
        <el-form-item label="楼盘名称1">
          
        </el-form-item>
        <el-form-item label="栋座">
         
        </el-form-item>
        <el-form-item label="房间号">
         
        </el-form-item>
      </div>
     
    </el-form>
  </div>
</template>
<script>


export default {
  data () {
    
  },
  mounted () {
    console.log(this.$route.query)
  },
  methods: {
    
  }
}
</script>
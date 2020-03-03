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
             label-width="80px"
             label-position="right">
      <!-- 楼盘 -->
      <div v-for="(item,index) in mate"
           :key="index">
        <div class="page-form-inline">
          <el-form-item label="id：">
            {{item.id}}
          </el-form-item>
          <el-form-item label="houseNo：">
            {{item.houseNo}}
          </el-form-item>
          <el-form-item label="title：">
            {{item.title}}
          </el-form-item>
        </div>
        <div class="page-form-inline">
          <el-form-item label="inArea：">
            {{item.inArea}}㎡
          </el-form-item>
          <el-form-item label="price：">
            {{item.price}}万元
          </el-form-item>
          <el-form-item label="rooms：">
            {{item.rooms}}室
          </el-form-item>
        </div>

        <div class="page-form-inline">
          <el-form-item label="unitpaice：">
            {{item.unitpaice}}元/㎡
          </el-form-item>
          <el-form-item label="PicUrl：">
            {{item.PicUrl}}
          </el-form-item>
          <el-form-item label="brokerName：">
            {{item.brokerName}}
          </el-form-item>
        </div>
        <div class="page-form-inline">
          -------------------------------------------------------------
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>


import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  data () {
    return {
      mate: []
    }
  },
  mounted () {
    var param = JSON.parse(this.$route.query.params);
    var that = this
    var faceStr;
    var businessStr;
    var houseTypeStr;
    var renovationStr;
    var purposeStr;
    var orientationStr;
    var primarySchoolStr;
    var middleSchoolStr;
    if (param.face != null) {
      faceStr = param.face.join(',');
    }
    if (param.business != null) {
      businessStr = param.business.join(',');
    }
    if (param.houseType != null) {
      houseTypeStr = param.houseType.join(',');
    }
    if (param.renovation != null) {
      renovationStr = param.renovation.join(',');
    }
    if (param.purpose != null) {
      purposeStr = param.purpose.join(',');
    }
    if (param.orientation != null) {
      orientationStr = param.orientation.join(',');
    }
    if (param.primarySchool != null) {
      primarySchoolStr = param.primarySchool.join(',');
    }
    if (param.middleSchool != null) {
      middleSchoolStr = param.middleSchool.join(',');
    }

    that.$api.get({
      url: "/mateHouse",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      token: false,
      qs: true,
      data: {
        page: '1',
        limit: '10',
        comId: param.comId,
        cbId: param.cbId,
        minFloor: param.minFloor,
        maxFloor: param.maxFloor,
        minInArea: param.minInArea,
        maxInArea: param.maxInArea,
        minPrice: param.minPrice,
        maxPrice: param.maxPrice,
        face: faceStr,
        business: businessStr,
        houseType: houseTypeStr,
        renovation: renovationStr,
        purpose: purposeStr,
        orientation: orientationStr,
        primarySchool: primarySchoolStr,
        middleSchool: middleSchoolStr
      }
    }).then((e) => {
      console.log(e)
      if (e.data.code == 200) {
        that.mate = e.data.data.list
      }
    })
  },
  methods: {

  }
}
</script>
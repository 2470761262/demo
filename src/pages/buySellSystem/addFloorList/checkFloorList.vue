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
  flex-shrink: 0;
}
</style>
<template >
  <div>
    <div class="page-form-tips">Tips：楼盘信息补充成功后，管理员将尽快进行审核！</div>
    <el-form ref="form"
             @submit.native.prevent
             :model="form"
             label-width="80px"
             label-position="right">

      <div class="page-form-inline">
        <el-form-item label="楼盘名称">
          <el-input placeholder="请输入楼盘名称"
                    v-model="form.communityName">
          </el-input>
        </el-form-item>
      </div>

      <div class="page-form-inline">
        <el-form-item label="楼栋">
          <el-input placeholder="请输入楼栋名称"
                    v-model="form.comBuildingName">
          </el-input>
        </el-form-item>
      </div>

      <div class="page-form-inline">
        <el-form-item label="房间号">
          <el-input placeholder="请输入房间号"
                    v-model="form.buildIngHouses">
          </el-input>
        </el-form-item>
      </div>

      <div class="page-form-inline">
        <el-form-item label="材料说明">
          <el-input placeholder="请输入材料说明"
                    v-model="form.ReplenishRemark">
          </el-input>
        </el-form-item>
      </div>

      <div class="demo-image__lazy">
        <el-image v-for="url in urls"
                  :key="url"
                  :src="url"
                  lazy></el-image>
      </div>
      <div class="page-form-inline">
        <el-form-item label="审核状态">
          <el-select v-model="form.isCheck"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="page-form-inline">
        <el-form-item label="审核备注">
          <el-input placeholder="请输入审核备注"
                    v-model="form.checkRemark">
          </el-input>
        </el-form-item>
      </div>

      <el-button-group>
        <el-button type="primary"
                   @click="apply()">提交审核</el-button>
      </el-button-group>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
  </div>
</template>
<script>

import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  data () {
    return {
      form: {
        communityName: '',
        comBuildingName: '',
        buildIngHouses: '',
        ReplenishRemark: '',
        isCheck: '',
        id: '',
        proveImg: [],
        prove: [],
        checkRemark: ''
      },
      options: [{
        value: '1',
        label: '审核通过'
      }, {
        value: '2',
        label: '审核不通过'
      }],
      urls: [],
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  mounted () {
    var id = JSON.parse(this.$route.query.id);
    console.log(id)
    this.$api.get({
      url: "/CommunityReplenish/queryCommunityReplenishById",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      token: false,
      qs: true,
      data: {
        id: id
      }
    }).then((e) => {
      console.log(e.data);
      if (e.data.code == 200) {
        var that = this;
        that.form.communityName = e.data.data.communityName;
        that.form.comBuildingName = e.data.data.comBuildingName;
        that.form.buildIngHouses = e.data.data.buildIngHouses;
        that.form.ReplenishRemark = e.data.data.replenishRemark;
        that.form.id = e.data.data.id;
        //that.urls=e.data.data.proveImg.spilt(",");
        if (e.data.data.proveImg.indexOf(",") == -1) { //等于-1表示这个字符串中没有o这个字符
          that.urls.push(e.data.data.proveImg)
        } else {
          console.log(e.data.data.proveImg.split(","))
          that.urls = e.data.data.proveImg.split(",");
        }
      }
    })
  },
  methods: {
    apply () {
      var that = this;
      this.$api.get({
        url: "/CommunityReplenish/updateCommunityReplenish",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          id: that.form.id,
          isCheck: that.form.isCheck,
          communityName: that.form.communityName,
          comBuildingName: that.form.comBuildingName,
          RoomNo: that.form.buildIngHouses,
          checkRemark: that.form.checkRemark
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.$router.push({ path: '/buySellSystem/addFloorList' });
        } else if (e.data.code == 400) {
          alert(e.data.message);
          console.log("失败     " + e.data)
        }
      })
    }

  }
}
</script>
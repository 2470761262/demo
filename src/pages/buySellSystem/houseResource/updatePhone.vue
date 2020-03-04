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
    <el-form ref="form"
             @submit.native.prevent
             :model="form"
             label-width="80px"
             label-position="right">

      <div class="page-form-inline">
        <el-form-item label="客户电话">
          <el-input placeholder="请输入客户手机号码"
                    v-model="form.phone">
          </el-input>
        </el-form-item>
      </div>

      <el-button-group>
        <el-button type="primary"
                   @click="updatePhone()">提交</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>
<script>

import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  data () {
    return {
      form: {
        phone: '',
        id: ''

      }
    }
  },
  mounted () {
    var that = this;
    that.form.id = JSON.parse(that.$route.query.id);
  },
  methods: {




    updatePhone () {
      var that = this;
      this.$api.get({
        url: "/houseResource/updatePhone",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          id: that.form.id,
          tel: that.form.phone

        }
      }).then((e) => {
        if (e.data.code == 200) {
          this.$router.push({ path: '/buySellSystem/notPhone' });
        } else {
          alert(e.data.message)
        }
      })
    }

  }
}
</script>
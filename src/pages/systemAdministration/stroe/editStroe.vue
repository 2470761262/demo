<style lang="less" scoped>
.left-input-container {
  padding: 10px;

  border-radius: 0.5rem;
  .el-input {
    width: 80%;
  }
  span {
    margin-right: 10px;
    margin-left: 5px;
  }
}
.el-top {
  margin-top: 50px;
}
</style>
<template>
  <div class="wrapper">

    <div class="left-input-container">
      <span>店面名称</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="StroeEntity.storeName"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>店面地址</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="StroeEntity.shoreAddress"
                maxlength="100"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>电话号码</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="StroeEntity.shoreTel"
                maxlength="100"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>职务</span>
      <el-select type="text"
                 placeholder="职务"
                 v-model="StroeEntity.flagSale"
                 show-word-limit>
        <el-option label="文职"
                   :value="'0'" />
        <el-option label="职务"
                   :value="'1'" />
      </el-select>
    </div>
    <div class="left-input-container">
      <span>门店类型</span>
      <el-select type="text"
                 placeholder="门店类型"
                 v-model="StroeEntity.shoreType"
                 show-word-limit>
        <el-option label='加盟店'
                   :value="0" />
        <el-option label='直营店'
                   :value="1" />
      </el-select>
    </div>
    <div class="left-input-container">
      <span>开业时间</span>
      <el-input type="date"
                placeholder="请输入内容"
                v-model="StroeEntity.regDate"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>描述</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="StroeEntity.storeDesc"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="footerContainer el-top">
      <el-button type="primary"
                 @click="saveStroe()">确定</el-button>
      <el-button type="primary"
                 @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: {},
  props: {},
  data () {
    return {
      StroeEntity: {
        id: null,
        storeName: null,
        flagSale: null,
        shoreAddress: null,
        shoreTel: null,
        shoreType: null,
        storeDesc: null,
        regDate: null,
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    saveStroe () {
      let params = this.StroeEntity;
      params.id = this.id;
      this.$api.post({
        url: '/stroe/update',
        data: params,
        token: false,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          this.$alert('', '修改成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/stroeList" });
          console.log(result.data);
          this.$message({ message: result.message });
        }
      }).catch((e) => {
        console.log("修改失败");
        console.log(e);
      })
    },
    back () {
      this.$router.push({ path: "/sys/stroeList" });
    }
  },
  created () {
    this.id = this.$route.query.id;
  },
  mounted () {
    this.$api.post({
      url: '/stroe/' + this.id,
      token: false
    }).then((e) => {
      console.log(e.data);
      let result = e.data;
      if (result.code == 200) {
        console.log(result.message);
        console.log(result.data);

        for (var i = 0; i < result.data.length; i++) {

          switch (result.data[i].flagSale) {
            case "0":
              result.data[i].flagSale = "文职";
              break;
            case "1":
              result.data[i].flagSale = "职务";
              break;

          }
          switch (result.data[i].shoreType) {
            case 0:
              result.data[i].shoreType = "加盟店";
              break;
            case 1:
              result.data[i].shoreType = "直营店";
              break;

          }
        }
        this.StroeEntity = result.data;
      } else {
        console.log("查询实体店详情结果：" + result.message);
        alert(result.message);
      }
    }).catch((e) => {
      console.log("查询实体店详情失败");
      console.log(e);
    })
  }

};
</script>
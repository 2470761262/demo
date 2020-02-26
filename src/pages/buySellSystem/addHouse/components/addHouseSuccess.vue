<style lang="less" scoped>
.page-cell-addHouse {
  height: 100%;
}
.page-cell-title {
  text-align: center;
  line-height: 40px;
  &.max-title {
    font-size: 36px;
    color: #67c23a;
  }
  &.title-top {
    margin-top: 50px;
  }
}
.mindder-step {
  width: 70%;
  margin: 50px auto 0;
}
.cell-flex {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  align-items: center;
  .qr-img {
    width: 150px;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text-center {
    text-align: center;
    margin-left: 50px;
    .text-center-tips {
      font-size: 20px;
      margin-top: 20px;
    }
  }
}
</style>
<template>
  <div class="page-cell-addHouse"
       v-loading="loading"
       element-loading-text="加载二维码中~">
    <div class="page-cell-title max-title title-top"><i class="el-icon-circle-check"></i>房源保存成功</div>
    <div class="page-cell-title title-top">房源录入成功后，需邀请业主对房源进行验真后方可发布房源成功。</div>
    <div class="mindder-step">
      <el-steps :active="stepsActiveIndex+1"
                align-center
                finish-status="success">
        <el-step :title="item.title"
                 v-for="(item, index) in stepsList"
                 :key="index"></el-step>
      </el-steps>
    </div>
    <div class="cell-flex">
      <div class="qr-img">
        <img :src="url" />
      </div>
      <div class="text-center">
        <div class="text-center-tips">微信扫一扫</div>
        <div class="text-center-tips">邀请业主进行验真</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "addHouseSuccess",
  data () {
    return {
      stepsActiveIndex: 1,
      stepsList: [
        { title: "录入房源", componentName: "basicInformation" },
        { title: "房源验真", componentName: "supplement" },
        { title: "发布成功", componentName: "exploration" }
      ],
      loading: true,
      url: ''
    }
  },
  created () {
    console.log(11111);
    this.validateAll();
  },
  methods: {
    validateAll () {
      let that = this;
      this.$api.post({
        url: '/verifyHouse/invitationToVerify',
        data: {
          id: that.$store.state.addHouse.formData.id
        },
        qs: true
      }).then((e) => {
        let result = e.data;
        that.loading = false;
        if (result.code == 200) {
          that.loading = false;
          that.url = result.data;
        } else {
          console.log("查询结果：" + result.message);
          alert(result.message);
          that.loading = false;
        }
      }).catch((e) => {
        console.log("查询失败");
        console.log(e);
        that.loading = false;
      })
    },
  },
}
</script>

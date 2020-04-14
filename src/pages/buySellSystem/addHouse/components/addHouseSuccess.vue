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
.text-col-centent {
  text-align: center;
  .inlne-text {
    display: inline-block;
    text-align: left;
    font-size: 16px;
    line-height: 30px;
  }
  .link {
    display: inline-block;
    font-size: 16px;
    margin-top: 15px;
  }
}
</style>
<template v-if="!edit">
  <div>
    <div class="page-cell-addHouse"
         v-loading="loading"
         element-loading-text="加载二维码中~"
         v-if="!edit">
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
          <el-image :src="url"
                    fit="cover"
                    :preview-src-list="[url]">

          </el-image>
        </div>
        <div class="text-center">
          <div class="text-center-tips">微信扫一扫</div>
          <div class="text-center-tips">邀请业主进行验真</div>
        </div>
      </div>
      <div class="text-col-centent">
        <div class="inlne-text">
          <p>1.请发给业主本人(与房源所录入号码一致的)进行验证</p>
          <p>2.房源验证通过后，请在3天内完善房源信息,否则房源跟单资格会被取消</p>
        </div>
      </div>
      <div class="text-col-centent">
        <el-button type="primary"
                   class="link"
                   @click="navto">
          前往验真列表
        </el-button>
      </div>
    </div>
    <div v-else>
      <div class="page-cell-title max-title title-top"><i class="el-icon-circle-check"></i>房源保存成功</div>
    </div>
  </div>
</template>
<script>
import util from "@/util/util";
export default {
  name: "addHouseSuccess",
  data() {
    return {
      stepsActiveIndex: 1,
      stepsList: [
        { title: "录入房源", componentName: "basicInformation" },
        { title: "房源验真", componentName: "supplement" },
        { title: "发布成功", componentName: "exploration" }
      ],
      loading: false,
      url: "",
      edit: false
    };
  },
  created() {
    this.getQr();
  },
  mounted() {
    if (util.sessionLocalStorageGet("editHouse")) {
      this.edit = true;
    }
  },
  methods: {
    getQr() {
      let that = this;
      this.$api
        .post({
          url: "/verifyHouse/invitationToVerify",
          data: {
            id: that.$store.state.addHouse.formData.id
          },
          qs: true
        })
        .then(e => {
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
        })
        .catch(e => {
          console.log("查询失败");
          console.log(e);
          that.loading = false;
        });
    },
    navto() {
      this.$router.replace({ path: "/buySellSystem/validateHouseList" });
    },
    validateAll() {
      let that = this;
      this.$api.put({
        url: "/draft-house/reset",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: {
          id: that.$store.state.addHouse.formData.id
        }
      });
    }
  }
};
</script>

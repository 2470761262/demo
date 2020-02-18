
<style lang="less" scoped>
.query-cell {
  display: flex;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<template>
  <div>
    <div class="query-cell">
      <div>
        <div style=" font-size: 20px;font-weight: bold">{{houseDetails.Title}}</div>
        <div>
          <span>{{houseDetails.areaName}}</span>-
          <span>{{houseDetails.CommunityName}}</span>
        </div>
        <div class="query-cell">
          <span>房源印象</span>
        </div>
      </div>
      <div style="margin-left:50px;font-size:30px;">房源二维码</div>
      <div style="margin-left:50px;">
        <div style="font-size:15px;">房源编号:</div>
        <div style="font-size:15px;">{{houseDetails.HouseNo}}</div>
        <div style="font-size:12px;color:red">微信扫一扫,立即分享房源</div>
      </div>
      <div style="margin-left:50px;font-size:30px;">
        <a>举报</a>
      </div>
      <div style="margin-left:50px;font-size:30px;">
        <span>收藏</span>
      </div>
    </div>
    <div>
      <el-button>验真通过</el-button>
    </div>
    <div class="query-cell"
         style="margin-top:30px;">
      <div style="height:500px;width:600px;">
        <el-carousel>
          <el-carousel-item v-for="(item,index) in fileList"
                            :key="index">
            <video :src="item.url"
                   controls="controls"
                   v-if="item.type==0"
                   style="width:100%;heigth:100%;"></video>
            <el-image :src="item.url"
                      fit="fill"
                      v-if="item.type==1"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="margin-left:100px;">
        <div class="query-cell">
          <div>
            <span style="font-size:40px;">{{houseDetails.Price}}</span>
            <span>万元</span>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.averagePrice}}</span>
            <span>元/平</span>
          </div>
          <div style="margin-left:20px;">
            <span>编辑</span>
          </div>
        </div>
        <div class="query-cell"
             style="margin-top:20px;">
          <div>
            <span style="font-size:20px;">{{houseDetails.houseType}}</span>
            <br />
            <span>户型</span>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.InArea}}</span>
            <br />
            <span>面积</span>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.Face}}</span>
            <br />
            <span>朝向</span>
          </div>
        </div>
        <div class="query-cell"
             style="margin-top:20px;">
          <div>
            <span style="font-size:20px;">{{houseDetails.buildtype}}</span>
            <br />
            <span>类型</span>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.HouseProperty}}</span>
            <br />
            <span>产权性质</span>
          </div>
          <div style="margin-left:20px;">
            <span>{{elevator}}</span>
            <br />
            <span>电梯</span>
          </div>
        </div>
        <div class="query-cell"
             style="margin-top:20px;">
          <div class="query-cell">
            <div class="query-cell">
              <div>
                <el-image style="width:100;height:100px;border-radius:50px;"
                          :src="houseDetails.agentPerHeadImg"></el-image>
              </div>
              <div>
                <div>{{houseDetails.agentPerName}}</div>
                <div>{{houseDetails.agentPerDepartmentName}}</div>
              </div>
              <el-button :data-tel="houseDetails.agentPerTel">一键拨号</el-button>
            </div>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.Customers}}</span>
            <br />
            <el-button :data-tel="houseDetails.Tel">联系业主</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-button>发布外网房源</el-button>
      <el-button>推荐房源</el-button>
      <el-button>鑫币对赌</el-button>
      <el-button>转房源状态</el-button>
      <el-button>作业方取代</el-button>
      <el-button>取消作业方法</el-button>
      <el-button>锁定房源</el-button>
      <el-button>修改钥匙存放门店</el-button>
    </div>
    <div>
      <span>房源列表</span>
    </div>
  </div>
</template>
<script>
import util from "@/util/util";
export default {
  components: {},
  data () {
    return {
      houseId: 0, //房源id
      houseDetails: "", //房源详情数据
      fileList: [],
      elevator: "无配套"
    };
  },
  before () { },
  mounted () {
    if (this.$route.query.houseId) {
      this.houseId = this.$route.query.houseId;
    }
    let params = {
      houseId: this.houseId,
      perId: 0
    };
    this.getHouseDetails(params);
  },
  methods: {
    getHouseDetails (params) {
      let that = this;
      this.$api
        .get({
          url: "/agent_house//getHouseDetail",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.houseDetails = result.data;
            var item = {};
            that.elevator = util.analysisElevator(that.houseDetails.Elevator);
            that.houseDetails.saleUploadVideoDtoList.forEach(element => {
              item = {
                type: 0,
                id: element.id,
                url: element.videoUrl
              };
              that.fileList.push(item);
            });
            that.houseDetails.saleUploadPicDtoList.forEach(element => {
              item = {
                type: 1,
                id: element.id,
                url: element.picUrl
              };
              that.fileList.push(item);
            });
          } else {
            that.$message(result.message);
          }
        })
        .catch(e => {
          if (e.response.data != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("请求失败");
          }
        });
    }
  }
};
</script>  
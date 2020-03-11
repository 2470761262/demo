<style>
.flex {
  display: flex;
  width: 100%;
  height: 100%;
}
.width {
  margin-top: 120%;
  font-size: 20px;
  color: #219167;
}
.titleBox {
  width: 10%;

  height: 50rem;
}
.msgBox {
  width: 80%;
  height: 100%;
}
.cancelButton {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  border: black 1px solid;
}
.detailBox {
  width: 15rem;
  height: 1000px;
  padding-right: 1rem;
  border-right: rgb(242, 242, 242) 1px solid;
  display: inline-block;
}
.house {
  display: flex;
  width: 100%;
  height: 5%;
}
.houseName {
  background: rgb(242, 242, 242);
  display: flex;
  width: 85%;
  margin-right: 5%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
  font-size: 1rem;
}
.houseName2 {
  background: rgb(242, 242, 242);
  display: flex;
  width: 85%;
  margin-top: 5%;
  margin-right: 5%;
  height: 100%;

  border-radius: 5rem;
  font-size: 1rem;
}
.image {
  border-radius: 2rem;
  width: 85%;
  height: 18%;
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #808080;
  margin-bottom: 11%;
}
.image2 {
  border-radius: 2rem;
  width: 85%;
  height: 10rem;
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 11%;
}
.text {
  margin-left: 5%;
  font-size: 23px;
  width: 95%;
  height: 6%;
  display: flex;
  align-items: center;
}
.margin {
  margin-bottom: 250%;
}
.interval {
  margin-top: 40px;
}
.bottom {
  margin-top: 60%;
}
.imageText {
  border-radius: 2rem;
  width: 85%;
  height: 18%;
  margin-top: 3%;
  display: flex;

  margin-bottom: 11%;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
  white-space: nowrap;
}
.characteristic {
  font-size: 1rem;
  overflow: hidden;
}
</style>
<template>

  <div class="flex">
    <div class="msgBox">
      <el-scrollbar style="height:100%;width:105rem">
        <div class="detailBox"
             style="width:8rem;margin-top:1rem;loat: left;">
          <div class="house">
            <div class="houseName2 text"> 房源名:</div>

          </div>

          <div class="imageText text">
            图片:

          </div>

          <div class="text">
            价格:
          </div>
          <div class="text">
            面积:
          </div>
          <div class="text">
            房型:
          </div>
          <div class="text">
            楼层:
          </div>
          <div class="text">
            装修:
          </div>
          <div class="text">
            户数:
          </div>
          <div class="text">
            年代:
          </div>
          <div class="text">
            类型:
          </div>
          <div class="text interval">
            小学:
          </div>
          <div class="text">
            中学:
          </div>
          <div class="text interval ">
            特色:
          </div>
        </div>
        <div class="detailBox"
             v-for="(item,index) in houseList"
             :key="index">
          <div class="house">
            <div class="houseName"> {{item.communityName}}</div>
            <div class="cancelButton"
                 @click="dele(item.id)">x</div>
          </div>

          <div class="image"
               v-if="item.imageList==''">
            暂无数据

          </div>
          <div v-else-if="item.imageList[0].picUrl!=undefined">
            <img :src="item.imageList[0].picUrl"
                 class="image2">

          </div>
          <div class="text">
            {{item.price==null?'暂无':item.price+"万"}}
          </div>
          <div class="text">
            {{item.inArea==null?'暂无':item.price+"㎡"}}
          </div>
          <div class="text">
            {{item.inAroomsrea==null?'':item.inAroomsrea+"室"}}{{item.hall==null?'':item.hall+"厅"}}{{item.kitchen==null?'':item.kitchen+"厨"}}{{item.toilet==null?'':item.toilet+"卫"}}
          </div>
          <div class="text">
            {{item.roomsPFloor==null?'暂无':item.roomsPFloor+'F'}}
          </div>
          <div class="text">
            {{item.Decoration==null?'暂无':item.Decoration}}
          </div>
          <div class="text">
            {{item.households ==null?'暂无':item.households }}
          </div>
          <div class="text">
            {{item.buildYear ==null?'暂无':item.buildYear}}
          </div>
          <div class="text">
            {{item.Decoration ==null?'暂无':item.Decoration}}
          </div>
          <div class="text interval">
            {{item.schoolScribing==null?'暂无':item.schoolScribing}}
          </div>
          <div class="text">
            {{item.middleSchoolScribing==null?'暂无':item.middleSchoolScribing}}
          </div>
          <div class="text interval characteristic">
            {{item.title==null?'暂无':item.title}}
          </div>
        </div>

      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import Vue from 'Vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  data () {
    return {
      houseId: null,
      houseList: {
        imageList: []
      }


    }
  },
  methods: {

    getList () {
      this.$api.get({
        url: '/agent_house/AgentHouseContrast',
        data: {          id: this.houseId || window.$cookies.get("houseId"),
        },
        token: false
      }).then((e) => {

        let result = e.data;
        this.loading = false;
        if (result.code == 200) {

          this.houseList = result.data;
          console.log(this.houseList);
        } else {
          console.log("查询对比房源列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询对比房源列表失败");
        console.log(e);
      })
    },
    dele (id) {

      let postId = "";
      let houseId = window.$cookies.get("houseId");

      if (houseId.split(",")[1] == undefined && houseId == id) {
        window.$cookies.remove("houseId");

      } else {
        let cookie = houseId.split(',');
        console.log(cookie);
        for (let i = 0; i < cookie.length; i++) {
          if (i == 0 && id != cookie[i]) {
            postId += cookie[i];
          } else if (cookie[i] != id && postId == "") {
            postId += +cookie[i];
          } else if (cookie[i] != id) {
            postId += ',' + cookie[i];
          }
        }

        window.$cookies.set("houseId", postId);
      }
      for (let i = 0; i < this.houseList.length; i++) {
        if (this.houseList[i].id == id) {
          this.houseList.splice(i, 1);
        }
      }

    }

  },
  created () {

    this.houseId = this.$route.query.houseId;
    this.getList();


  }
}
</script>
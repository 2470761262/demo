<style>
.flex{
    display: flex;
    width: 100%;
    height: 100%;
}
.width{
    margin-top:120%;
    font-size: 20px;
    color:#219167
}
.titleBox{
    width: 10%;

    height: 50rem;
}
.msgBox{
    width: 80%;
    height: 100%;
    

}
.cancelButton{
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display:flex;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    border: black 1px solid;
}
.detailBox{
    width: 15rem;
    height: 50rem;
    padding-right: 1rem;
    border-right: rgb(242,242,242) 1px solid;
    display: inline-block;
}
.house{
    display: flex;
    width: 100%;
    height: 5%;
}
.houseName{
   background: rgb(242,242,242);
   display: flex;
   width: 85%;
   margin-right: 5%;
   height: 100%;
   justify-content: center;
   align-items: center;
   border-radius: 5rem;
   font-size:1rem
}
.image{
    border-radius: 2rem;
    width: 85%;
    height: 18%;
    margin-top:3%;
    background: bisque;
    margin-bottom: 11% ;
}
.text{
    margin-left: 5%;
    font-size: 1.5rem;
    width: 95%;
    height: 6%;
    display: flex;
    align-items: center;
    
}
.margin{
    margin-bottom: 250%
}
.interval{
    margin-top: 17%
}
.bottom{
    margin-top:60%;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar .el-scrollbar__wrap .el-scrollbar__view{
   white-space: nowrap;
}
.characteristic{
    font-size:1rem;
    overflow:hidden;
    
}
</style>
<template>

<div class="flex">
    <div class="titleBox">
 <div class="width margin" >
     基本信息
 </div>
 <div class="width ">
     划片小学
 </div>
 <div class="width bottom">
     特色
 </div>
        </div>
        <div class="msgBox">
        <el-scrollbar style="height:100%;">
           
                <div class="detailBox" v-for="(item,index) in houseList"
                     :key="index">
                <div class="house">
                    <div class="houseName"> {{item.communityName}}</div>
                     <div class="cancelButton" @click="dele(item.id)">x</div>
                     </div>
                     <div class="image">
                     
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
                      {{item.roomsPFloor}}F
                     </div>
                     <div class="text">
                      中档装修
                     </div>
                      <div class="text">
                      {{item.households}}
                     </div>
                     <div class="text">
                      年代： {{item.buildYear}}
                     </div>
                     <div class="text">
                      {{item.Decoration}}
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
export default {
    data(){
        return{
        houseId:null,
        houseList:[

        ]
        }
    },
   methods: {
      
          getList(){
              this.$api.get({
        url: '/agent_house/AgentHouseContrast',
        data:{id:this.houseId||window.$cookies.get("houseId"),    
}   ,
        token: false
      }).then((e) => {
        
        let result = e.data;  
        this.loading=false;
        if (result.code == 200) {
         
          this.houseList=result.data;
        } else {
          console.log("查询对比房源列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询对比房源列表失败");
        console.log(e);
      })
          },
     dele(id){
       
      let postId="";
      let houseId=window.$cookies.get("houseId");
      console.log(houseId.split(","));
      if(houseId.split(",")[1]==undefined&&houseId==id){
     window.$cookies.remove("houseId");
      
     }else{
       

      let cookie=houseId.split(',');
      console.log(cookie);
      for(let i=0;i<cookie.length;i++){
         if(i==0&&id!=cookie[i]){
           postId+=cookie[i];
         }else if(cookie[i]!=id){
            postId+=','+cookie[i];
         }
      }
      window.$cookies.set("houseId", postId);
     }
      for(let i=0;i<this.houseList.length;i++){
       if(this.houseList[i].id==id){
           this.houseList.splice(i,1);
       }
      } 
   
     }     

   },
    created() {
         console.log(window.$cookies.get("houseId"));
      this.houseId=this.$route.query.houseId;
      this.getList();
   
     
  }
}
</script>
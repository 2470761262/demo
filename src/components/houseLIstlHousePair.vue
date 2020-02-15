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
        <el-form-item label="楼盘名称">
          <el-select
            v-model="form.comId"
            @change="queryCBId()"
            filterable
            remote
            placeholder="请输入楼盘进行搜索"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="栋座">
          <el-select v-model="form.cbId" filterable placeholder="请选择楼栋" @change="queryRoomNo()">
          <el-option
            v-for="item in cbIdList"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="房间号">
          <el-select v-model="form.roomNo" filterable placeholder="请选择房间号">
          <el-option
            v-for="item in roomNoList"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
      </div>
      <!-- 售价 -->
      <div class="page-form-inline"
           data-tips="万元">
        <el-form-item label="售价">
          <el-input placeholder="请输入售价" v-model="form.minPrice">
          </el-input>
        </el-form-item>
        <div class="dividingLine"></div>
        <el-form-item label-width="0px">
          <el-input placeholder="请输入售价" v-model="form.maxPrice">
            <!-- <template slot="append">万元</template> -->
          </el-input>
        </el-form-item>
      </div>
      <!-- 面积 -->
      <div class="page-form-inline"
           data-tips="平方">
        <el-form-item label="面积">
          <el-input placeholder="请输入面积" v-model="form.minInArea"> 
          </el-input>
        </el-form-item>
        <div class="dividingLine"></div>
        <el-form-item label-width="0px">
          <el-input placeholder="请输入面积" v-model="form.maxInArea">
            <!-- <template slot="append">万元</template> -->
          </el-input>
        </el-form-item>
      </div>
      <!-- 楼层 -->
      <div class="page-form-inline"
           data-tips="层">
        <el-form-item label="楼层">
          <el-input placeholder="请输入楼层" v-model="form.minFloor">
          </el-input>
        </el-form-item>
        <div class="dividingLine"></div>
        <el-form-item label-width="0px">
          <el-input placeholder="请输入楼层" v-model="form.maxFloor">
            <!-- <template slot="append">万元</template> -->
          </el-input>
        </el-form-item>
      </div>
      <el-form-item label="商圈"
                    prop="business">
        <el-checkbox-group v-model="form.business">
          <el-checkbox :label="item.value"
                       name="business"
                       border
                       v-for="(item,index) in businessList"
                       :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="房型"
                    prop="houseType">
        <el-checkbox-group v-model="form.houseType">
          <el-checkbox :label="item.value"
                       name="houseType"
                       border
                       v-for="(item,index) in houseTypeList"
                       :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="装修"
                    prop="renovation">
        <el-checkbox-group v-model="form.renovation">
          <el-checkbox :label="item.value"
                       name="renovation"
                       border
                       v-for="(item,index) in renovationList"
                       :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="房源用途"
                    prop="purpose">
        <el-checkbox-group v-model="form.purpose">
          <el-checkbox :label="item.value"
                       name="purpose"
                       border
                       v-for="(item,index) in purposeList"
                       :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="朝向"
                    prop="face">
        <el-checkbox-group v-model="form.face">
          <el-checkbox :label="item.value"
                       name="face"
                       border
                       v-for="(item,index) in faceList"
                       :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <div class="page-form-inline">
        <el-form-item label="小学划片"
                      prop="primarySchool">
          <el-checkbox-group v-model="form.primarySchool">
            <el-checkbox :label="item.value"
                         name="primarySchool"
                         border
                         v-for="(item,index) in primarySchoolList"
                         :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="marLeft20">
          <el-input placeholder="添加自定义小学(回车添加)"
                    v-model="primarySchoolInput"
                    clearable
                    @keyup.enter.native="addInputToList('primarySchool','primarySchoolInput')">
          </el-input>
        </div>
      </div>
      <div class="page-form-inline">
        <el-form-item label="中学划片"
                      prop="middleSchool">
          <el-checkbox-group v-model="form.middleSchool">
            <el-checkbox :label="item.value"
                         name="middleSchool"
                         border
                         v-for="(item,index) in middleSchoolList"
                         :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="marLeft20">
          <el-input placeholder="添加自定义中学(回车添加)"
                    v-model="middleSchoolInput"
                    clearable
                    @keyup.enter.native="addInputToList('middleSchool','middleSchoolInput')">
          </el-input>
        </div>
      </div>
      

      <el-button-group>
        <el-button type="info"
                   @click="resetForm('form')">重置</el-button>
        <el-button type="primary">配对</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>
<script>
//商圈
let business =null;
//房型
let houseType = ['一室', '二室', '三室', '四室', '四室以上'];
//装修
let renovation = ['毛胚', '普通装修', '精装修', '豪华装修'];
//房源用途
let purpose = ['住宅', '别墅', '商业', '车位'];
//朝向
let orientation = ['东', '南', '西', '北', '东南', '西北'];
//小学
let primarySchool = ['实验小学'];
//中学
let middleSchool = ['实验中学', '松涛中学'];
export default {
  data () {
    return {
      form: {
        business: [],
        houseType: [],
        renovation: [],
        purpose: [],
        orientation: [],
        primarySchool: [],
        middleSchool: [],
        comId: '',
        cbId:'',
        roomNo:'',
        minFloor:'',
        maxFloor:'',
        minInArea:'',
        maxInArea:'',
        minPrice:'',
        maxPrice:'',
        face:[]
      },
      businessList: business,
      houseTypeList: houseType,
      renovationList: renovation,
      purposeList: purpose,
      orientationList: orientation,
      primarySchoolList: primarySchool,
      primarySchoolInput: '',
      middleSchoolList: middleSchool,
      middleSchoolInput: '',
      faceList:face,
      options: [],
      cbIdList:[],
      roomNoList:[],
      loading: false
    }
  },
  mounted () {
    //商圈
   this.queryConstant('Region').then((e)=>{ 
     this.businessList= e;
   });
   //朝向
   this.queryConstant('face').then((e)=>{ 
     this.faceList= e;
   });
   //小学
   this.queryConstant('PrimarySchool').then((e)=>{ 
     this.primarySchoolList= e;
   });

   //中学
   this.queryConstant('MiddleSchool').then((e)=>{ 
     this.middleSchoolList= e;
   });

   //房型
   this.queryConstant('Rooms').then((e)=>{ 
     this.houseTypeList= e;
   });

   //装修
   this.queryConstant('Renovation').then((e)=>{ 
     this.renovationList= e;
   });

   //用途
   this.queryConstant('Purpose').then((e)=>{ 
     this.purposeList= e;
   });

  
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    //重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    addInputToList (toList, inputName) {
      let findFlag = this.form[toList].some((item) => {
        return item == this[inputName];
      })
      if (!findFlag) {
        this[toList + 'List'].push(this[inputName]);
        this.form[toList].push(this[inputName]);
      } else {
        this.$message({
          message: '您已经添加过了哦~',
          type: 'warning'
        });
        this[inputName] = '';
      }
    },

  queryConstant(constant){
    
    return this.$api.get({ 
      url:"/mateHouse/queryConstant",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      token: false,
      qs:true,
      data: {
          constant: constant
        }
      }).then((e)=>{ 
        if(e.data.code==200){
          return e.data.data;
          
        }
      })
  },
remoteMethod(query) {
  var that=this
        if (query !== '') {
          this.loading = true;

        this.$api.get({ 
          url:"/mateHouse/queryCommunity",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs:true,
          data: {
              communityName: query
            }
          }).then((e)=>{ 
            console.log(e.data)
            if(e.data.code==200){
              that.loading = false;
              that.options=e.data.data.list;
              
            }
          })     
        } else {
          this.options = [];
        }
      },
queryCBId(){
  var that =this
  this.$api.get({ 
          url:"/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs:true,
          data: {
              comId: that.form.comId
            }
          }).then((e)=>{ 
            if(e.data.code==200){
              that.cbIdList=e.data.data.list;
            }
          })   
    },
queryRoomNo(){
  var that =this
  this.$api.get({ 
          url:"/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs:true,
          data: {
              comId: that.form.comId,
              cbId: that.form.cbId
            }
          }).then((e)=>{ 
            if(e.data.code==200){
              that.roomNoList=e.data.data.list;
            }
          })   
}
  }
}
</script>
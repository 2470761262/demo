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
          <el-input placeholder="请输入楼盘名称">
          </el-input>
        </el-form-item>
        <el-form-item label="栋座">
          <el-input placeholder="请选择栋座">
          </el-input>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input placeholder="请选择房间号">
          </el-input>
        </el-form-item>
      </div>
      <!-- 售价 -->
      <div class="page-form-inline"
           data-tips="万元">
        <el-form-item label="售价">
          <el-input placeholder="请输入售价">
          </el-input>
        </el-form-item>
        <div class="dividingLine"></div>
        <el-form-item label-width="0px">
          <el-input placeholder="请输入售价">
            <!-- <template slot="append">万元</template> -->
          </el-input>
        </el-form-item>
      </div>
      <!-- 面积 -->
      <div class="page-form-inline"
           data-tips="平方">
        <el-form-item label="面积">
          <el-input placeholder="请输入面积">
          </el-input>
        </el-form-item>
        <div class="dividingLine"></div>
        <el-form-item label-width="0px">
          <el-input placeholder="请输入面积">
            <!-- <template slot="append">万元</template> -->
          </el-input>
        </el-form-item>
      </div>
      <!-- 楼层 -->
      <div class="page-form-inline"
           data-tips="平方">
        <el-form-item label="楼层">
          <el-input placeholder="请输入楼层">
          </el-input>
        </el-form-item>
        <div class="dividingLine"></div>
        <el-form-item label-width="0px">
          <el-input placeholder="请输入楼层">
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
        middleSchool: []
      },
      businessList: business,
      houseTypeList: houseType,
      renovationList: renovation,
      purposeList: purpose,
      orientationList: orientation,
      primarySchoolList: primarySchool,
      primarySchoolInput: '',
      middleSchoolList: middleSchool,
      middleSchoolInput: ''
    }
  },
  mounted () {
    console.log(this.queryConstant('Region'))
   this.businessList= this.queryConstant('Region');
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
    var json;
    
    this.$api.get({ 
      url:"/mateHouse/queryConstant",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      token: false,
      qs:true,
      data: {
          constant: constant
        }
      }).then((e)=>{ 
        console.log(e.data)
        if(e.data.code==200){
          this.json=JSON.stringify(e.data.data);
          console.log(json)
          
        }
      })
    console.log(this.json)
      return json;
  },


  }
}
</script>
<style lang="less" scoped >
.query-warp {
  padding-left: 20px;
  position: relative;
}
.page-form-inline {
  display: flex;
  //margin-top: 20px;
  margin-bottom: 22px;
  &.form-item-flex1 {
    .el-form-item {
      flex: 1;
    }
  }
  .page-label-center {
    /deep/ label {
      text-align: center;
    }
  }
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
  margin-left: 15px;
  flex-shrink: 0;
  width: 140px;
  /deep/.el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
  }
}
.select-input {
  display: flex;
  margin-bottom: 20px;
  .select-input-set {
    display: flex;
    align-items: center;
    flex: 1;
    border: 2px solid var(--color--primary);
    height: 45px;
    box-sizing: border-box;
    .el-icon-search {
      font-size: 20px;
      margin: 0 10px;
    }
    .select-input-sub {
      outline: none;
      border: none;
      font-size: 20px;
      flex: 1;
    }
  }
  .select-but-sub {
    background: var(--color--primary);
    width: 175px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 18px;
    justify-content: center;
    cursor: pointer;
  }
  .select-but-reset {
    margin-left: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    padding: 0 14px;
    border: 2px solid var(--color--primary);
    cursor: pointer;
    .reset-icon {
      color: inherit;
      font-size: 20px;
      margin: 0 10px;
    }
    .select-but-reset-title {
      font-size: 18px;
      color: inherit;
      white-space: nowrap;
    }
  }
}
.merge-tooltip {
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, -15px);
}
/deep/.vue-slider-dot-tooltip-inner {
  border-color: var(--color--primary);
  background-color: var(--color--primary);
}
/deep/.vue-slider-process {
  background-color: var(--color--primary);
}
.tooltipsItem {
  width: 100%;
  height: 100%;
  background: var(--color--primary);
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 25px;
}
.vue-slider-index1 {
  /deep/.vue-slider-rail {
    z-index: 10;
  }
}
.vue-slider-index2 {
  /deep/.vue-slider-rail {
    z-index: 12;
  }
}
.checkbox-flex {
  display: flex;
  flex-wrap: wrap;
  margin: 0px -15px 0;
  .checkbox-flex-pad {
    width: 16.666%;
    //margin-bottom: 15px;
    padding: 0 15px;
    box-sizing: border-box;
    /deep/.el-checkbox__input {
      width: 0 !important;
      height: 0 !important;
      overflow: hidden;
    }
    /deep/.el-checkbox__label {
      padding-left: 0 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      text-align: center;
      vertical-align: middle;
    }
    .is-checked {
      background: var(--color--primary);
      /deep/.el-checkbox__label {
        color: #fff;
      }
    }
    .el-checkbox {
      margin-right: 0 !important;
      transition: all 0.2s ease-in;
      width: 100%;
    }
  }
}
.budingMarinSet {
  margin-bottom: 0;
  margin-top: 30px;
}
.marginBotEmp {
  margin-bottom: 0;
}
.ohter-item {
  /deep/.el-form-item__content {
    margin-left: 0 !important;
  }
  /deep/.select-input {
    .marginBotEmp !important;
  }
}
</style>
<template >
  <div class="query-warp">
    <el-form
      ref="form"
      @submit.native.prevent
      :model="form"
      label-width="75px"
      label-position="left"
    >
      <el-form-item prop="type" class="ohter-item">
        <div class="select-input">
          <div class="select-input-set">
            <i class="el-icon-search"></i>
            <input type="text" class="select-input-sub" placeholder="请输入关键字" v-model="searchData" />
          </div>
          <div class="select-but-sub" @click="search">开始搜索</div>
          <div class="select-but-reset" @click="resetForm('form')">
            <i class="el-icon-refresh reset-icon"></i>
            <span class="select-but-reset-title">重置</span>
          </div>
        </div>
      </el-form-item>
      <!-- <div class="select-input">
        <div class="select-input-set">
          <i class="el-icon-search"></i> <input type="text"
                 class="select-input-sub"
                 placeholder="请输入关键字"
                 v-model="searchData" />
        </div>
        <div class="select-but-sub"
             @click="search">开始搜索</div>
        <div class="select-but-reset"
             @click="resetForm('form')">
          <i class="el-icon-refresh reset-icon"></i>
          <span class="select-but-reset-title">重置</span>
        </div>
      </div>-->
      <!-- 楼盘 -->
      <div class="page-form-inline budingMarinSet">
        <el-form-item label="楼盘名称" prop="comId">
          <el-select
            v-model="form.comId"
            @focus="remoteInput"
            @change="queryCBId()"
            filterable
            remote
            clearable
            placeholder="请输入楼盘进行搜索"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="栋座" prop="cbId" class="page-label-center">
          <el-select
            v-model="form.cbId"
            filterable
            clearable
            placeholder="请选择楼栋"
            @change="queryRoomNo()"
          >
            <el-option
              v-for="item in cbIdList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间号" prop="roomNo" clearable class="page-label-center">
          <el-select v-model="form.roomNo" filterable placeholder="请选择房间号">
            <el-option
              v-for="item in roomNoList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 售价 -->
      <div class="page-form-inline form-item-flex1">
        <el-form-item label="售价">
          <vue-slider
            v-model="Slider.priceSlider"
            :min="sliderMinMax.min"
            :marks="priceSliderMarks"
            tooltip="none"
            :lazy="true"
            @change="priceSliderChange"
            :contained="true"
            :dot-size="[25,25]"
            :max="sliderMinMax.max"
          >
            <template v-slot:process="{ start, end, style, index }">
              <div class="vue-slider-process" :style="style">
                <div
                  v-show="end !=0"
                  :class="[
              'merge-tooltip',
              'vue-slider-dot-tooltip-inner',
              'vue-slider-dot-tooltip-inner-top',
            ]"
                >{{ Slider.priceSlider[index] }}￥ - {{ Slider.priceSlider[index + 1] }}￥</div>
              </div>
            </template>
            <template v-slot:dot>
              <div class="tooltipsItem">￥</div>
            </template>
          </vue-slider>
        </el-form-item>
      </div>
      <!-- 面积 -->
      <div class="page-form-inline form-item-flex1">
        <el-form-item label="面积">
          <vue-slider
            class="vue-slider-index1"
            v-model="Slider.areaSlider"
            :min="sliderMinMax.min"
            :marks="areaSliderMarks"
            tooltip="none"
            :lazy="true"
            @change="areaSliderChange"
            :contained="true"
            :dot-size="[25,25]"
            :max="sliderMinMax.max"
          >
            <template v-slot:process="{ start, end, style, index }">
              <div class="vue-slider-process" :style="style">
                <div
                  v-show="end !=0"
                  :class="[
              'merge-tooltip',
              'vue-slider-dot-tooltip-inner',
              'vue-slider-dot-tooltip-inner-top',
            ]"
                >{{ Slider.areaSlider[index] }}㎡ - {{ Slider.areaSlider[index + 1] }}㎡</div>
              </div>
            </template>
            <template v-slot:dot>
              <div class="tooltipsItem">㎡</div>
            </template>
          </vue-slider>
        </el-form-item>
      </div>
      <!-- 楼层 -->
      <div class="page-form-inline form-item-flex1">
        <el-form-item label="楼层">
          <vue-slider
            class="vue-slider-index2"
            v-model="Slider.flootSlider"
            :min="flootMinMax.min"
            :marks="flootSliderMarks"
            tooltip="none"
            :lazy="true"
            :contained="true"
            :dot-size="[25,25]"
            @change="flootSliderChange"
            :max="flootMinMax.max"
          >
            <template v-slot:process="{ start, end, style, index }">
              <div class="vue-slider-process" :style="style">
                <div
                  v-show="end !=0"
                  :class="[
              'merge-tooltip',
              'vue-slider-dot-tooltip-inner',
              'vue-slider-dot-tooltip-inner-top',
            ]"
                >{{ Slider.flootSlider[index] }}层 - {{ Slider.flootSlider[index + 1] }}层</div>
              </div>
            </template>
            <template v-slot:dot>
              <div class="tooltipsItem">层</div>
            </template>
          </vue-slider>
        </el-form-item>
      </div>
      <el-form-item label="商圈" prop="business">
        <el-checkbox-group class="checkbox-flex" v-model="form.business" size="small">
          <div v-for="(item,index) in businessList" :key="index" class="checkbox-flex-pad">
            <el-tooltip :content="item.name" :disabled="item.name.length < 4" placement="top">
              <el-checkbox :label="item.value" name="business" border>{{item.name}}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="房型" prop="houseType">
        <el-checkbox-group v-model="form.houseType" class="checkbox-flex" size="small">
          <div v-for="(item,index) in houseTypeList" :key="index" class="checkbox-flex-pad">
            <el-tooltip :content="item.name" :disabled="item.name.length < 4" placement="top">
              <el-checkbox :label="item.value" name="houseType" border>{{item.name}}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="装修" prop="renovation">
        <el-checkbox-group v-model="form.renovation" class="checkbox-flex" size="small">
          <div v-for="(item,index) in renovationList" :key="index" class="checkbox-flex-pad">
            <el-tooltip :content="item.name" :disabled="item.name.length < 4" placement="top">
              <el-checkbox :label="item.value" name="renovation" border>{{item.name}}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="房源用途" prop="purpose">
        <el-checkbox-group v-model="form.purpose" class="checkbox-flex" size="small">
          <div class="checkbox-flex-pad" v-for="(item,index) in purposeList" :key="index">
            <el-tooltip :content="item.name" :disabled="item.name.length < 4" placement="top">
              <el-checkbox :label="item.value" name="purpose" border>{{item.name}}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="朝向" prop="face">
        <el-checkbox-group v-model="form.face" class="checkbox-flex" size="small">
          <div v-for="(item,index) in faceList" :key="index" class="checkbox-flex-pad">
            <el-tooltip :content="item.name" :disabled="item.name.length < 4" placement="top">
              <el-checkbox :label="item.value" name="face" border>{{item.name}}</el-checkbox>
            </el-tooltip>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <div class="page-form-inline marginBotEmp">
        <el-form-item label="小学划片" prop="primarySchool">
          <el-checkbox-group v-model="form.primarySchool" class="checkbox-flex" size="small">
            <div v-for="(item,index) in primarySchoolList" :key="index" class="checkbox-flex-pad">
              <el-tooltip :content="item.name" :disabled="item.name.length < 4" placement="top" v-if ="(index < 5)">
                <el-checkbox :label="item.value" name="primarySchool" border>{{item.name}}</el-checkbox>
              </el-tooltip>
            </div>
            <div class="marLeft20">
              <el-select placeholder="更多选择" clearable v-model="primarySchoolInput"  @change="addInputToList('primarySchool','primarySchoolInput')">                
                <template  v-for="(item,index) in primarySchoolList">
                  <el-option
                    v-if="index > 5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"                 
                  >
                </el-option>
                </template>               
              </el-select>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="page-form-inline marginBotEmp">
        <el-form-item label="中学划片" prop="middleSchool">
          <el-checkbox-group v-model="form.middleSchool" class="checkbox-flex" size="small">
            <div v-for="(item,index) in middleSchoolList" :key="index" class="checkbox-flex-pad">
              <el-tooltip :content="item.name" :disabled="item.name.length < 4" placement="top"  v-if ="(index < 5)">
                <el-checkbox :label="item.value" name="middleSchool" border>{{item.name}}</el-checkbox>
              </el-tooltip>
            </div>
            <div class="marLeft20">
              <el-select placeholder="更多选择" clearable v-model="middleSchoolInput"   @change="addInputToList('middleSchool','middleSchoolInput')" >
                <template  v-for="(item,index) in middleSchoolList">
                  <el-option                
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-if="index > 5"
                  >
                  </el-option>
                </template>     
              </el-select>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <!-- <el-button-group>
        <el-button type="info"
                   @click="resetForm('form')">重置</el-button>
        <el-button type="primary"
                   @click="mateHouse()">配对</el-button>
      </el-button-group>-->
    </el-form>
  </div>
</template>
<script>
const areaSliderMarks = {
  "20": "20㎡",
  "60": "60㎡",
  "80": "80㎡",
  "100": "100㎡",
  "120": "120㎡",
  "140": "140㎡",
  "200": "200㎡",
  "300": "300㎡"
};
const priceSliderMarks = {
  "20": "20万",
  "60": "60万",
  "80": "80万",
  "100": "100万",
  "120": "120万",
  "140": "140万",
  "200": "200万",
  "300": "300万"
};
const flootSliderMarks = {
  "-2": "-2层",
  "5": "5层",
  "10": "10层",
  "15": "15层",
  "20": "20层",
  "25": "25层",
  "30": "30层",
  "40": "40层"
};
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  name: "houseResultList",
  inject: ["form", "Slider"],
  components: {
    VueSlider
  },
  data() {
    return {
      searchData: "",
      flootMinMax: {
        min: -2,
        max: 40
      },
      sliderMinMax: {
        min: 20,
        max: 300
      },
      areaSliderMarks: areaSliderMarks,
      priceSliderMarks: priceSliderMarks,
      flootSliderMarks: flootSliderMarks,
      primarySchoolInput: "",
      middleSchoolInput: "",
      businessList: [],
      houseTypeList: [],
      renovationList: [],
      purposeList: [],
      orientationList: [],
      primarySchoolList: [],
      middleSchoolList: [],
      faceList: [],
      options: [],
      cbIdList: [],
      roomNoList: [],
      loading: false
    };
  },
  mounted() {
    //商圈
    this.queryConstant("Region").then(e => {
      this.businessList = e;
    });
    //朝向
    this.queryConstant("face").then(e => {
      this.faceList = e;
    });
    //小学
    this.queryConstant("PrimarySchool").then(e => {
      this.primarySchoolList = e;
    });

    //中学
    this.queryConstant("MiddleSchool").then(e => {
      this.middleSchoolList = e;
    });

    //房型
    this.queryConstant("Rooms").then(e => {
      this.houseTypeList = e;
    });

    //装修
    this.queryConstant("Renovation").then(e => {
      this.renovationList = e;
    });

    //用途
    this.queryConstant("Purpose").then(e => {
      this.purposeList = e;
    });
  },

  methods: {
    //面积滑块参数更新
    flootSliderChange(e) {
      if (e[0] == -2 && e[1] == -2) {
        this.form.minFloor = "";
        this.form.maxFloor = "";
      } else {
        this.form.minFloor = e[0];
        this.form.maxFloor = e[1];
      }
    },
    //面积滑块参数更新
    areaSliderChange(e) {
      if (e[0] == 20 && e[1] == 20) {
        this.form.minInArea = "";
        this.form.maxInArea = "";
      } else {
        this.form.minInArea = e[0];
        this.form.maxInArea = e[1];
      }
    },
    //售价滑块参数更新
    priceSliderChange(e) {
      if (e[0] == 20 && e[1] == 20) {
        this.form.minPrice = "";
        this.form.maxPrice = "";
      } else {
        this.form.minPrice = e[0];
        this.form.maxPrice = e[1];
      }
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.searchData = "";
      this.form.title = "全部在售";
      this.Slider.priceSlider = [20, 20];
      this.Slider.areaSlider = [20, 20];
      this.Slider.flootSlider = [-2, -2];
    },
    addInputToList(toList, inputName) {
      let findFlag = this.form[toList].some(item => {
        return item == this[inputName];
      });
      if (!findFlag) {
        this[toList + "List"].push(this[inputName]);
        this.form[toList].push(this[inputName]);
      } else {
        this.$message({
          message: "您已经添加过了哦~",
          type: "warning"
        });
        this[inputName] = "";
      }
    },

    queryConstant(constant) {
      return this.$api
        .get({
          url: "/mateHouse/queryConstant",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            constant: constant
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            return e.data.data;
          }
        });
    },
    remoteInput() {
      var that = this;
      if (that.form.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        this.loading = true;

        this.$api
          .get({
            url: "/community/houseList",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              communityName: query
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.loading = false;
              that.options = e.data.data.list;
            }
          });
      } else {
        this.options = [];
      }
    },
    queryCBId() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.form.comId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.form.roomNo = "";
            that.form.cbId = "";
            that.cbIdList = e.data.data.list;
          }
        });
    },
    queryRoomNo() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.form.comId,
            cbId: that.form.cbId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.form.roomNo = "";
            that.roomNoList = e.data.data.list;
          }
        });
    },
    search() {
      var that = this;
      that.form.searchInfo = that.searchData;
    },
    mateHouse() {
      var that = this;
      console.log(that.form);
      console.log(that.form.comId);
      that.$router.push({
        path: "/components/mateHouseList",
        query: { params: JSON.stringify(that.form) }
      });
    }
  }
};
</script>
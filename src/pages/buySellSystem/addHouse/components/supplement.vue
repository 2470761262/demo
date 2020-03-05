<style lang="less" scoped>
@import url(../../../../assets/publicLess/upLoadFile.less);
.page-cell-addHouse {
  padding: 0 50px;
  .cell-item-cell {
    display: flex;
    align-items: center;
    margin-top: 25px;
    &.no-top {
      margin-top: 0;
    }

    .item-before {
      line-height: 40px;
      &.before-text {
        position: relative;
        &::before {
          content: attr(data-before);
          position: absolute;
          font-size: 12px;
          width: 100%;
          line-height: 1;
          bottom: -4px;
          text-align: center;
        }
      }
      &.text-just {
        text-align: justify;
        &::after {
          content: "";
          display: inline-block;
          width: 100%;
          height: 0;
        }
      }
      width: 75px;
      position: relative;
      margin-right: 25px;
      height: 40px;
      font-size: 15px;
      box-sizing: border-box;
      color: #666;
    }
    /deep/.el-select {
      height: 25px;
      width: 140px;
      .el-input {
        height: 100%;
        .el-input__icon {
          line-height: 25px;
        }
        .el-input__inner {
          height: 100%;
          line-height: 25px;
          font-size: 12px;
        }
      }
    }
    .el-textarea {
      width: 410px;
      height: 70px;
      /deep/textarea {
        height: 100%;
      }
    }
    &.el-input-w {
      &.el-input-w-280 {
        /deep/.el-input {
          width: 280px;
        }
      }
      /deep/.el-input {
        .other-input;
        margin-right: 20px;
      }
    }
    .Division {
      margin: 0 20px;
      &:first-child {
        margin-left: 0;
      }
    }
    .other-input {
      height: 25px;
      width: 120px;
      /deep/.el-input__inner {
        height: 100%;
        line-height: 25px;
        font-size: 12px;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #dcdfe6;
        padding: 0 15px !important;
      }
      /deep/.el-icon-date {
        display: none;
      }
      /deep/.el-input__icon {
        line-height: 25px;
      }
    }
  }
}
.after-tips {
  &:after {
    content: attr(data-tips);
    display: block;
    color: red;
  }
}
.flex-cell {
  display: flex;
}
.division-line {
  height: 1px;
  background: #dcdfe6;
  margin-top: 40px;
}
.flex-start {
  align-self: flex-start;
}
.upLoadFile {
  margin-top: 60px;
  /deep/.el-slider__bar {
    background: #fea32e;
  }
  /deep/.el-slider__button {
    border-color: #fea32e;
  }
  .upLoadFile-title {
    margin-right: 20px;
  }
  .upLoadFile-file-list {
    border: 1px solid #f4f4f4;
    flex-direction: column;
    .audio-contenr {
      display: flex;
      flex: 1;
      align-items: center;
      .audio-contenr-but {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #fea32e;
        color: #fff;
        text-align: center;
        line-height: 30px;
        font-size: 30px;
        text-shadow: 0px 0px 2px #fea32e, 0px 0px 8px #fea32e,
          0px 0px 16px #fea32e, 0px 0px 22px #fea32e, 0px 0px 30px #fea32e;
        margin: 0 20px;
      }
      .el-slider {
        flex: 1;
      }
      .autio-time {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
<template>
  <div class="page-cell-addHouse"
       element-loading-text="我在去获取数据的路上了~"
       v-loading="loading">
    <!-- 房屋来源 -->
    <div class="cell-item-cell">
      <div class="item-before text-just">房源来源</div>
      <el-select v-model="formData.houseSource"
                 placeholder="请选择房源来源">
        <el-option v-for="item in houseSourceList"
                   :key="item.value"
                   :label="item.key"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!-- 房屋现状 -->
    <div class="cell-item-cell">
      <div class="item-before text-just">房屋现状</div>
      <el-radio-group v-model="formData.houseNow"
                      size="mini">
        <el-radio :label="item.value"
                  v-for="item in houseNowList"
                  :key="item.key">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    <!-- 装修类型  -->
    <div class="cell-item-cell">
      <div class="item-before text-just">装修类型</div>
      <el-radio-group v-model="formData.decoration"
                      size="mini">
        <el-radio :label="item.value"
                  v-for="item in decorationList"
                  :key="item.key">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    <!-- 户口情况 -->
    <div class="cell-item-cell">
      <div class="item-before text-just">户口情况</div>
      <el-radio-group v-model="formData.sign"
                      size="mini">
        <el-radio v-for="item in signList"
                  :key="item.key"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    <!-- 物业费 -->
    <div :class="{'after-tips':errorBags.has('propertyFee')}"
         :data-tips="errorBags.first('propertyFee')">
      <div class="cell-item-cell el-input-w">
        <div class="item-before text-just">物业费</div>
        <el-input type="text"
                  v-model="formData.propertyFee"
                  :v-validate="required?'decimal:2|noZero1|max:14|required': 'decimal:2|noZero1|max:14'"
                  data-vv-as="物业费"
                  data-vv-name="propertyFee"
                  placeholder="请输入物业费"></el-input>
        <div class="item-after">元/平方</div>
      </div>
    </div>

    <!-- 附属配套 -->
    <div class="cell-item-cell el-input-w">
      <div class="item-before text-just">附属配套</div>
      <el-radio-group v-model="formData.houseBelong"
                      size="mini">
        <el-radio v-for="item in houseBelongList"
                  :key="item.key"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
      <!-- <el-input v-if="houseBelongSelect=='其他'"
                type="text"
                v-model="formData.houseBelong"></el-input> -->
    </div>
    <!-- 学籍占用 -->
    <div class="cell-item-cell">
      <div class="item-before  text-just before-text"
           data-before="(小学)">学籍占用</div>
      <el-radio-group size="mini"
                      @change="primaryRadioChange"
                      v-model="primaryRadio">
        <el-radio v-for="item in primarySchoolUseList"
                  :key="item.value"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    <!-- 小学占用选择 -->
    <div class="cell-item-cell no-top"
         v-if="primaryRadio == 1">
      <div class="item-before"></div>
      <div :class="{'after-tips':errorBags.has('primarySchoolUse')}"
           :data-tips="errorBags.first('primarySchoolUse')">
        <el-radio-group v-validate="{'required':primaryRadio == 1}"
                        data-vv-name="primarySchoolUse"
                        data-vv-as="小学学籍占用"
                        v-model="formData.primarySchoolUse"
                        size="mini">
          <el-radio :label="item.value"
                    v-for="item in primarySchoolUseRenderList"
                    :key="item.value"
                    border>{{ item.key }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 中学籍占用 -->
    <div class="cell-item-cell ">
      <div class="item-before  text-just before-text"
           data-before="(中学)">学籍占用</div>
      <el-radio-group size="mini"
                      @change="middleRadioChange"
                      v-model="middleRadio">
        <el-radio v-for="item in middleSchoolUseList"
                  :key="item.value"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    <!-- 中学占用选择 -->
    <div class="cell-item-cell no-top"
         v-if="middleRadio == 1">
      <div class="item-before"></div>
      <div :class="{'after-tips':errorBags.has('middleSchoolUse')}"
           :data-tips="errorBags.first('middleSchoolUse')">
        <el-radio-group v-validate="{'required':middleRadio == 1}"
                        data-vv-name="middleSchoolUse"
                        data-vv-as="中学学籍占用"
                        v-model="formData.middleSchoolUse"
                        size="mini">
          <el-radio :label="item.value"
                    v-for="item in middleSchoolUseRenderList"
                    :key="item.value"
                    border>{{ item.key }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 抵押情况 -->
    <div class="cell-item-cell">
      <div class="item-before text-just">抵押情况</div>
      <el-radio-group v-model="formData.mortgage"
                      @change="mortgageChange"
                      size="mini">
        <el-radio v-for="item in mortgageList"
                  class="item-flex-avg"
                  :key="item.key"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
    </div>
    <div class="cell-item-cell  no-top">
      <div class="item-before"></div>
      <div :class="{'after-tips':errorBags.has('balance') ||  errorBags.has('monthlyMortgage')}"
           :data-tips="errorBags.first('balance') || errorBags.first('monthlyMortgage')">
        <div class="cell-item-cell  no-top">
          <el-select v-if="formData.mortgage==1"
                     v-model="formData.mortgageBank"
                     placeholder="请选择抵押银行">
            <el-option v-for="item in mortgageBankList"
                       :key="item.value"
                       :label="item.key"
                       :value="item.value">
            </el-option>
          </el-select>
          <div class="Division">余贷/月供</div>
          <el-input class="other-input"
                    v-model="formData.balance"
                    v-validate="'decimal:2|max:14'"
                    data-vv-as="余贷"
                    data-vv-name="balance"
                    placeholder="请输入余贷金额"></el-input>
          <div class="Division">万元</div>
          <el-input class="other-input"
                    v-model="formData.monthlyMortgage"
                    v-validate="'decimal:2|max:14'"
                    data-vv-as="月供"
                    data-vv-name="monthlyMortgage"
                    placeholder="请输入月供"></el-input>
          <div class="Division">元/月</div>
        </div>
      </div>
    </div>
    <!-- 上次交易 -->
    <div class="cell-item-cell ">
      <div class="item-before  text-just">上次交易</div>
      <el-date-picker v-model="formData.lastSale"
                      type="date"
                      class="other-input"
                      placeholder="契税发票时间">
      </el-date-picker>
      <div class="Division">是否唯一住房</div>
      <el-radio-group size="mini"
                      v-model="formData.isOwnerOnly">
        <el-radio v-for="item in isowneronlyList"
                  :key="item.value"
                  :label="item.value">{{ item.key }}</el-radio>
      </el-radio-group>
      <div class="Division">满5唯一</div>
    </div>
    <!-- 付款方式 -->
    <div class="cell-item-cell ">
      <div class="item-before  text-just">付款方式</div>
      <div :class="{'after-tips':errorBags.has('lastPayment') }"
           :data-tips="errorBags.first('lastPayment') ">
        <div class="cell-item-cell  no-top">
          <el-select v-model="formData.paymentMethod"
                     placeholder="付款方式">
            <el-option v-for="item in paymentMethodList"
                       :key="item.value"
                       :label="item.key"
                       :value="item.value">
            </el-option>
          </el-select>
          <div class="Division">上次交易金额</div>
          <el-input class="other-input"
                    v-model="formData.lastPayment"
                    v-validate="'decimal:2|max:14'"
                    data-vv-as="上次交易金额"
                    data-vv-name="lastPayment"
                    placeholder="报税价"></el-input>
          <div class="Division">万</div>
        </div>
      </div>
    </div>
    <div class="division-line"></div>
    <!-- 房源标题 -->
    <div class="cell-item-cell el-input-w el-input-w-280">
      <div class="item-before text-just">房源标题</div>
      <el-input type="text"
                v-model="formData.title"
                placeholder="请输入房源标题"
                maxLength="15"></el-input>
      <div class="item-after">{{formData.title.length}}/15</div>
    </div>
    <!-- 小区介绍 -->
    <div class="cell-item-cell">
      <div class="item-before text-just flex-start">小区介绍</div>
      <el-input class="el-textarea"
                type="textarea"
                placeholder="请输入小区介绍"
                v-model="formData.communityDesc"
                maxlength="50"
                resize="none"
                show-word-limit>
      </el-input>
    </div>
    <!-- 户型介绍 -->
    <div class="cell-item-cell">
      <div class="item-before text-just flex-start">户型介绍</div>
      <el-input class="el-textarea"
                type="textarea"
                placeholder="请输入户型介绍"
                v-model="formData.roomDesc"
                maxlength="50"
                resize="none"
                show-word-limit>
      </el-input>
    </div>
    <!-- 税费解析 -->
    <div class="cell-item-cell">
      <div class="item-before text-just flex-start">税费解析</div>
      <el-input class="el-textarea"
                type="textarea"
                placeholder="请输入税费解析"
                v-model="formData.taxDesc"
                maxlength="50"
                resize="none"
                show-word-limit>
      </el-input>
    </div>
    <!-- 核心卖点 -->
    <div class="cell-item-cell">
      <div class="item-before text-just flex-start">核心卖点</div>
      <el-input class="el-textarea"
                type="textarea"
                placeholder="请输入核心卖点"
                v-model="formData.saleDesc"
                maxlength="50"
                resize="none"
                show-word-limit>
      </el-input>
    </div>
    <!-- 讲房语音 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">讲房语音</div>
      <div class="upLoadFile-flex">
        <div class="upLoadFile-right">
          <div class="upLoadFile-input"
               v-loading="audioFileLoading"
               element-loading-text="文件上传中~">
            <label for="houseVideoList"
                   class="el-icon-upload">
              <input id="houseVideoList"
                     type="file"
                     @change="getAudioFile($event)">
            </label>
          </div>
          <div class="upLoadFile-file-list">
            <div class="audio-title">音频.mp3</div>
            <div class="audio-contenr">
              <audio :src="audioFile.url"
                     ref="audio"
                     v-if="audioFile.url"
                     v-audioLoad></audio>
              <div :class="['audio-contenr-but',audioPlay.icon]"
                   @click="openVideo"></div>
              <el-slider v-model="audioPlay.nowTime"
                         :format-tooltip="formatTooltip"
                         @input="audioSliderChange"
                         ref="audioSlider"
                         :max="audioPlay.endTime"
                         :disabled="audioFile.url ? false : true"></el-slider>
              <div class="autio-time">{{audioPlay.nowTime | timefomat}} / {{audioPlay.endTime | timefomat}}</div>
            </div>
          </div>
          <div class="upLoadFile-file-phone">
            <el-image src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                      fit="cover">
              <div slot="placeholder"
                   class="image-slot">
                加载中<span>...</span>
              </div>
            </el-image>
            <div>微信扫码上传</div>
          </div>
        </div>
        <div>仅可以上传一个音频.</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as formReander from '@/util/constMap';
import util from '@/util/util';
const USE = [
  {
    key: "未占用",
    value: 0
  },
  {
    key: "占用",
    value: 1
  },
]
export default {
  name: "supplement",
  props: {
    getData: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formData () {
      this.$set(this.$data, "step", JSON.parse(JSON.stringify(this.$store.state.addHouse.formData.step2)))
      return this.step
    }
  },
  mounted () {
    //true 则去获取数据
    ;
    if (this.getData) {
      this.loading = true;
      Promise.all([this.getAudio(), this.getLoadData()])
        .catch(() => {

        }).finally(() => {
          this.loading = false;
        })
    }
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler (newValue, oldValue) {
        //deff 获取到修改的属性
        let deffData = util.diffGet(this.$store.state.addHouse.formData.step2, this.formData);
        //判断当前是否有修改，如果有修改则length大于0
        let flag = Object.keys(deffData).length > 0 ? true : false;
        //判断store存储的是否与这次相同，相同则不commit
        if (this.$store.state.addHouse.isformDataNoCommit != flag) {
          this.$store.commit("updateIsformDataNoCommit", flag);
        }
        //把修改的过的值给与deffData用于传送后台，如果在一次进入也可以顺便把这个值清空
        this.deffData = deffData;
      }
    }
  },
  filters: {
    timefomat (value) {
      return util.timeToStr(value);
    }
  },
  directives: {
    audioLoad: {
      bind (el, binding, vnode) {
        el.addEventListener('loadedmetadata', () => {
          vnode.context.audioPlay.endTime = parseInt(el.duration);
        })
        el.addEventListener('timeupdate', () => {
          vnode.context.audioPlay.nowTime = parseInt(el.currentTime);
        })
        el.addEventListener('ended', () => {
          vnode.context.audioPlay.nowTime = 0;
          vnode.context.audioPlay.icon = 'el-icon-video-play';
        })
      }
    }
  },
  data () {
    return {
      audioPlay: {
        playOrEnd: true,
        nowTime: 0,
        endTime: 0,
        icon: 'el-icon-video-play'
      },
      audioFileLoading: false,//音频上传louding
      audioFile: {},//音频
      loading: false,
      step: {},
      options: [],
      deffData: {},
      primaryRadio: 0,
      middleRadio: 0,
      houseBelongSelect: "",
      primarySchoolUseRenderList: formReander.PRIMARYSCHOOLUSE,//小学占用
      middleSchoolUseRenderList: formReander.MIDDLESCHOOLUSE,//中学占用
      houseSourceList: formReander.HOUSESOURCE,//房屋来源
      houseNowList: formReander.HOUSENOW,//房屋现状
      primarySchoolUseList: USE,//小学学籍占用
      middleSchoolUseList: USE,//中学学籍占用
      mortgageList: formReander.MORTGAGE,//抵押情况
      paymentMethodList: formReander.PAYMENTMETHOD,//付款方式
      houseBelongList: formReander.HOUSEBELONG,//配套设施
      signList: formReander.SIGN,//户口情况
      decorationList: formReander.DECORATION,//装修类型
      isowneronlyList: formReander.ISOWNERONLY,//是否唯一住房
      mortgageBankList: formReander.MORTGAGEBANK//抵押银行
    }
  },
  methods: {
    //根据ID获取已经上传的音频
    getAudio () {
      return this.$api.post({ url: `/draft-house/audios/${this.$store.state.addHouse.formData.id}` })
        .then((e) => {
          if (e.data.code == 200 && e.data.data.length != 0) {
            this.audioFile = e.data.data[0];
          }
        })
    },
    //获取音频上传
    getAudioFile (e) {
      let file = event.target.files;
      let isVideoType = ["audio/mp3"];
      if (!isVideoType.includes(file[0].type)) {
        this.$message.error("上传的音频只能是MP3格式!");
        return;
      }
      if (Object.keys(this.audioFile).length != 0) {
        this.$message.error("只能上传一个音频");
        return;
      }
      this.uploadSectionFile(file[0]);
    },
    //格式化slider时间
    formatTooltip (val) {
      return util.timeToStr(val);
    },
    //播放 or 暂停音频
    openVideo () {
      let audio = this.$refs.audio;
      try {
        if (audio.paused) {
          audio.play();
          this.audioPlay.icon = 'el-icon-video-pause';
        } else {
          audio.pause();
          this.audioPlay.icon = 'el-icon-video-play';
        }
      } catch (error) {
        this.$message.error("是不是没有音频阿!");
      }
    },
    //监听进度条拉动设置播放位置
    audioSliderChange (e) {
      if (this.$refs.audioSlider.dragging) {
        this.$refs.audio.currentTime = e;
      }
    },
    uploadSectionFile (uploader) {
      let that = this;
      this.audioFileLoading = true;
      let formData = new FormData();
      formData.append('draftId', that.$store.state.addHouse.formData.id);
      formData.append('file', uploader)
      this.$api.post({
        url: `/draft-house/audio`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((json) => {
        if (json.data.code == 200) {
          this.audioFile = json.data.data;
        }
      }).catch((e) => {
        that.$message({
          message: '不晓得为什么,反正失败了',
          type: 'warning'
        })
      }).finally(() => {
        this.audioFileLoading = false;
      })
    },
    getLoadData () {
      return this.$api.get({
        url: `/draft-house/${this.$store.state.addHouse.formData.id}`,
      }).then((e) => {
        if (e.data.code == 200) {
          //需要显示长的属性不能是null 如果是null则删除不覆盖store的默认值
          let isNullforStr = ['title', 'communityDesc', 'roomDesc', 'taxDesc', 'saleDesc'];
          isNullforStr.forEach((item) => {
            if (e.data.data[item] == null) {
              delete e.data.data[item];
            }
          })
          this.$store.dispatch("InitFormData", { commitName: "updateStep2", json: e.data.data })
        }
      }).catch((e) => {
      })
    },
    //抵押情况切换
    mortgageChange (e) {
      if (e != 1) {
        this.formData.mortgageBank = '';
      }
    },
    //中学占用切换
    middleRadioChange (e) {
      if (e != 1) {
        this.formData.middleSchoolUseList = '';
      }
    },
    //小学占用切换
    primaryRadioChange (e) {
      if (e != 1) {
        this.formData.primarySchoolUse = '';
      }
    },
    validateAll () {
      let that = this;
      return this.$validator.validateAll().then((e) => {
        if (e) {
          return true;
        }
        return false;
      }).then((e) => {
        if (e) {
          return that.setDataToUpdate();
        } else {
          return false;
        }
      })
    },
    //修改数据到接口
    setDataToUpdate () {
      let that = this;
      let sendData = {
        id: that.$store.state.addHouse.formData.id,
        ...that.deffData
      }
      if (Object.keys(this.deffData).length == 0) {//没有做出修改
        return true;
      }
      return this.$api.put({
        url: '/draft-house',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: sendData
      }).then((e) => {
        console.log(e);
        if (e.data.code == 200) {
          //存入Vuex;
          that.$store.commit("updateStep2", that.deffData);
          return true;
        } else {
          return false;
        }

      }).catch(() => {
        return false;
      })
    }
  }
}
</script>
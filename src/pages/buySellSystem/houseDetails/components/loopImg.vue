
<style lang="less" scoped>
.loog-body {
  height: 406px;
  margin-bottom: 8px;
  position: relative;
  &:after {
    content: "验真通过";
    background: #0d824b;
    color: #fff;
    font-size: 16px;
    right: 0;
    top: 0;
    border-radius: 4px;
    padding: 4px 8px;
    position: absolute;
  }
  .loop-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.img-list {
  position: relative;
  &.scrolPad {
    padding: 0 20px;
  }
  .item-img-for {
    overflow: hidden;
    &.scrollActive {
      .loop-item:nth-child(1) {
        margin-left: 8px !important;
      }
    }
    .img-scroll-translateX {
      transition: transform 0.3s ease-in;
      font-size: 0;
      white-space: nowrap;
      display: inline-block;
      .loop-item {
        display: inline-block;
        margin-left: 8px;
        width: 150px;
        height: 90px;
        cursor: pointer;
        &:first-child {
          margin-left: 0px;
        }
      }
    }
  }
  .item-img-prev,
  .item-img-next {
    background: #585858;
    color: #fff;
    height: 100%;
    position: absolute;
    top: 0;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    z-index: 10;
    cursor: pointer;
    &.item-img-prev {
      left: 0;
    }
    &.item-img-next {
      right: 0;
    }
  }
}
</style>
<template>
  <div>
    <section class="loog-body">
      <!-- 图片 -->
      <template v-if="loopBig.typeStr == 'picUrl'">
        <el-image class="loop-item"
                  :src="loopBig.src"
                  :preview-src-list="previewList()"
                  fit="cover">
          <div slot="placeholder"
               class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
      </template>
      <!-- 音频 -->
      <template v-if="loopBig.typeStr == 'picUrl' && resultData.saleUploadAudioList">
        <el-audio fixed
                  v-if="resultData.saleUploadAudioList.length > 0"
                  :url="resultData.saleUploadAudioList[0].url">
          经纪人讲房
        </el-audio>
      </template>
      <!-- 视频 -->
      <template v-if="loopBig.typeStr == 'videoUrl'">
        <el-video :src="loopBig.src"></el-video>
      </template>
    </section>
    <section class="img-list"
             :class="{'scrolPad':scrollBar}">
      <div class="
             item-img-prev
             el-icon-arrow-left"
           v-if="scrollBar"
           @click="scrollMove('left')">
      </div>
      <div class="item-img-next el-icon-arrow-right"
           v-if="scrollBar"
           @click="scrollMove('right')"></div>
      <div :class="['item-img-for',{'scrollActive':scrollBar}]"
           ref="itemOver">
        <div class="img-scroll-translateX"
             :style="moveX">
          <template v-for="item in loopList">
            <!-- 循环图片 -->
            <template v-if="item.picUrl">
              <el-image @click.native.stop="changeLoop(item)"
                        :key="item.id"
                        class="loop-item"
                        :src="item.picUrl"
                        fit="cover">
                <div slot="placeholder"
                     class="image-slot">
                  加载中<span>...</span>
                </div>
              </el-image>
            </template>
            <!-- 视频 -->
            <template v-if="item.videoUrl">
              <video @click="changeLoop(item)"
                     class="loop-item"
                     :src="item.videoUrl"
                     :key="item.id"></video>
            </template>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
import elVideo from '@/components/elVideo';
import elAudio from '@/components/audio';
export default {
  inject: ["houseDetails"],
  components: {
    elVideo,
    elAudio
  },
  mounted () {
    addResizeListener(this.$refs.itemOver, this.update);
  },
  destroyed () {
    removeResizeListener(this.$refs.itemOver, this.update);
  },
  computed: {
    moveX () {
      return `transform: translateX(${this.renderX}px)`
    },
    resultData () {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data
      } else {
        return {};
      }
    },
    //轮播
    loopList () {
      if (Object.keys(this.houseDetails).length > 0) {
        let saleUploadPicDtoList = this.resultData.saleUploadPicDtoList ? this.resultData.saleUploadPicDtoList : [];
        let saleUploadVideoDtoList = this.resultData.saleUploadVideoDtoList ? this.resultData.saleUploadVideoDtoList : [];
        let resultList = [...saleUploadVideoDtoList, ...saleUploadPicDtoList];
        this.changeLoop(resultList[0]);
        return resultList;
      }
      return [];
    }
  },
  data () {
    return {
      loopBig: {},
      scrollBar: true,
      translateX: 0,
      renderX: '0'
    }
  },
  methods: {
    update () {
      let listFor = this.$refs.itemOver;
      if (listFor)
        if (listFor.clientWidth < listFor.scrollWidth) {
          this.scrollBar = true;
        } else {
          this.scrollBar = false;
        }
    },
    scrollMove (direction) {
      if (!this.scrollBar) {
        return
      }
      let listFor = this.$refs.itemOver;
      let scrollWidth = listFor.querySelector('.img-scroll-translateX').scrollWidth - listFor.clientWidth;
      switch (direction) {
        case 'left':
          if (this.translateX - listFor.clientWidth > 0) {
            this.translateX -= listFor.clientWidth;
          } else {
            this.translateX = 0;
          }
          break;
        case 'right':
          if (this.translateX + listFor.clientWidth < scrollWidth) {
            this.translateX += listFor.clientWidth;
          } else {
            this.translateX += scrollWidth - this.translateX;
          }
          break;
      }

      this.renderX = -this.translateX
    },
    //预览大图
    previewList () {
      if (this.resultData.saleUploadPicDtoList) {
        return this.resultData.saleUploadPicDtoList.map((item) => {
          return item.picUrl;
        })
      }
      return [];
    },
    changeLoop (item) {
      if ('picUrl' in item) {
        this.$set(this.loopBig, 'typeStr', 'picUrl')
        this.$set(this.loopBig, 'src', item.picUrl)
      } else if ('videoUrl' in item) {
        this.$set(this.loopBig, 'typeStr', 'videoUrl')
        this.$set(this.loopBig, 'src', item.videoUrl)
      }
    }
  },
}
</script>

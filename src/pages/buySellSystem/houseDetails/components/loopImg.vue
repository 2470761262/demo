
<style lang="less" scoped>
.loog-body {
  height: 406px;
  margin-bottom: 8px;
  position: relative;
  .img-item {
    width: 100%;
    height: 100%;
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
      .img-item:nth-child(1) {
        margin-left: 8px !important;
      }
    }
    .img-scroll-translateX {
      transition: transform 0.3s ease-in;
      font-size: 0;
      white-space: nowrap;
      display: inline-block;
      .img-item {
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
      <template v-if="loopBig.typeStr == 'picUrl'">
        <el-image class="img-item"
                  :src="loopBig.src"
                  fit="cover">
          <div slot="placeholder"
               class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
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
            <el-image @click.native="changeImg(item)"
                      :key="item.id"
                      class="img-item"
                      :src="item.picUrl"
                      fit="cover">
              <div slot="placeholder"
                   class="image-slot">
                加载中<span>...</span>
              </div>
            </el-image>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
export default {
  inject: ["houseDetails"],
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
    //轮播
    loopList () {
      if (Object.keys(this.houseDetails).length > 0) {
        let saleUploadPicDtoList = this.houseDetails.data.saleUploadPicDtoList ? this.houseDetails.data.saleUploadPicDtoList : [];
        let saleUploadVideoDtoList = this.houseDetails.data.saleUploadVideoDtoList ? this.houseDetails.data.saleUploadVideoDtoList : [];
        let resultList = [...saleUploadPicDtoList, ...saleUploadVideoDtoList];
        this.changeImg(resultList[0]);
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
    changeImg (item) {
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

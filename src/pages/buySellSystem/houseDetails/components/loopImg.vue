
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
      <el-image class="img-item"
                :src="activeImgUrl"
                fit="cover">
        <div slot="placeholder"
             class="image-slot">
          加载中<span>...</span>
        </div>
      </el-image>
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
          <el-image @click.native="changeImg(item)"
                    v-for="item in 6"
                    :key="item"
                    class="img-item"
                    src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201908/20190811/20190811111530328_34985.jpg?x-oss-process=style/thumb"
                    fit="cover">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
export default {
  mounted () {
    addResizeListener(this.$refs.itemOver, this.update);
  },
  destroyed () {
    removeResizeListener(this.$refs.itemOver, this.update);
  },
  computed: {
    moveX () {
      return `transform: translateX(${this.renderX}px)`
    }
  },
  data () {
    return {
      scrollBar: true,
      translateX: 0,
      renderX: '0',
      activeImgUrl: 'http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201908/20190811/20190811111530328_34985.jpg?x-oss-process=style/thumb'
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
      this.activeImgUrl = 'http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201908/20190819/20190819174109196_34936.jpg?x-oss-process=style/thumb';
      this.$message.info('选择了' + item);
    }
  },
}
</script>

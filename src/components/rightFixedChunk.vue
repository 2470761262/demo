<style lang="less" scoped>
.feedback-suspension {
  position: fixed;
  z-index: 20;
  right: 40px;
  bottom: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  background: #fff;
  z-index: 2000;
  transform: translateX(100%);
  transition: all 0.3s ease-in;
  &:hover {
    transform: translateX(40px);
  }
  p {
    cursor: pointer;
    &:nth-child(1) {
      margin-bottom: 5px;
      font-size: 15px;
    }
    &:nth-child(2) {
      color: #40a375;
    }
  }
  img[alt="在线反馈"] {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    user-select: none;
  }
}
</style>
<template>
  <div class="feedback-suspension" ref="fixedChunk" @click="openFeed">
    <img
      src="https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/5/27/6a6b1cc898c74452ac219dcc85fc2e33.png"
      alt="在线反馈"
    />
    <div>
      <p>在线反馈</p>
      <p>反馈可以赚鑫币哦</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openFeed() {
      this.$emit("click");
    },
    mousedown(e) {
      const fixedChunk = this.$refs.fixedChunk;
      fixedChunk.style.cursor = "all-scroll";

      let x = e.clientX - fixedChunk.offsetLeft;
      let y = e.clientY - fixedChunk.offsetTop;
      fixedChunk.style.bottom = "auto";
      fixedChunk.style.right = "auto";
      document.onmousemove = ee => {
        let left = ee.clientX - x; //e.clientX - disX;
        let top = ee.clientY - y; //e.clientY - disY;
        //移动当前元素
        // fixedChunk.style.transform = `translate(${left}px,${top}px)`;
        fixedChunk.style.left = left + "px";
        fixedChunk.style.top = top + "px";
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  }
};
</script>

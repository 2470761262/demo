<style lang="less" scoped>
@import "../newLess/cardContent";
.peview-content {
  // prettier-ignore
  margin-top: 17px;
  .card-content;
  .card-message-content {
    display: flex;
    flex-wrap: wrap;
    // prettier-ignore
    padding: 20PX 30PX;

    .image-flex {
      flex: 0 0 33.33%;
      display: flex;
      &:nth-child(-n + 3) {
        // prettier-ignore
        margin-bottom: 28PX;
      }
      &:nth-child(3n - 1) {
        justify-content: center;
      }
      &:nth-child(3n + 3) {
        justify-content: flex-end;
      }
      .image-content {
        // prettier-ignore
        width: 183PX;
        .image-content-head {
          display: flex;
          // prettier-ignore
          height: 33PX;
          font-size: @font14;
          background: #eee;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          // prettier-ignore
          padding: 0 10PX;
          color: #909090;
        }
        .image-content-body {
          width: 100%;
          // prettier-ignore
          height: 90PX;
          object-fit: cover;
        }
        .image-content-foot {
          background: #b5b5b5;
          color: #fff;
          // prettier-ignore
          padding: 10PX 0;
          font-size: @font12;
        }
      }
    }
  }
}
</style>
<template>
  <div class="peview-content">
    <div class="card-head">
      <h3 class="card-head-title">实勘信息</h3>
    </div>
    <div class="card-message-content">
      <div
        class="image-flex"
        v-for="item in filterImgList"
        :key="item.titleTypeName"
      >
        <div class="image-content">
          <div class="image-content-head">
            <div>{{ item.titleTypeName }}</div>
            <span>{{ item.ImageList.length }}张</span>
          </div>
          <img
            class="image-content-body"
            @click="setActiveImage(item)"
            :src="item.fristImage | defaultImg"
            :alt="item.titleTypeName"
          />
          <div class="image-content-foot">
            <div class="image-foot-pro">
              上传人：{{ item.uploadName | emptyRead }}
            </div>
            <div class="image-foot-time">
              上传时间：{{ item.uploadTime | emptyRead }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 灯箱 -->
    <light-box v-if="lightFlag" v-model="lightFlag" :activeData="activeData" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SMALLThumb } from "@/util/constMap";

const enumImage = new Map([
  ["1", "outdoorImgList"], //外景图
  ["2", "livingRoomImgList"], //客厅
  ["3", "bedroomImgList"], //卧室
  ["4", "kitchenImgList"], //厨房
  ["5", "toiletImgList"], //卫生间
  ["6", "layoutImgList"] //户型图
]);
function CreateImageObj(titleTypeName) {
  return new Object({
    ImageList: [], //存放对应的Image对象
    fristImage: null, //第一张图片
    uploadName: null, //上传人
    uploadTime: null, //上传时间
    titleTypeName: titleTypeName //类型名称
  });
}
export default {
  components: {
    lightBox: () => import("@/components/lightBox")
  },
  data() {
    return {
      lightFlag: false,
      activeData: {} //传递灯箱渲染
    };
  },
  computed: {
    ...mapState({
      houseData: state => state.houseDateil.houseData
    }),
    filterImgList() {
      const filterImageName = [
        ["layoutImgList", "户型图"],
        ["outdoorImgList", "外景图"],
        ["livingRoomImgList", "客厅"],
        ["kitchenImgList", "厨房"],
        ["bedroomImgList", "卧室"],
        ["toiletImgList", "卫生间"]
      ];
      let filterImageList = {};
      filterImageName.forEach(item => {
        let [listParamName, titleName] = item;
        filterImageList[listParamName] = CreateImageObj(titleName);
      });

      this.houseData.saleUploadPicDtoList.forEach((item, index) => {
        if (enumImage.has(String(item.PicClass))) {
          filterImageList[enumImage.get(String(item.PicClass))].ImageList.push(
            item
          );
        }
      });

      Object.keys(filterImageList).forEach(item => {
        let fItem = filterImageList[item];
        if (fItem.ImageList.length != 0) {
          let { picUrl, addTime, addPerName } = fItem.ImageList[0];
          fItem.fristImage = picUrl ? picUrl + SMALLThumb : null;
          fItem.uploadName = addPerName;
          fItem.uploadTime = addTime;
        }
      });

      return filterImageList;
    }
  },
  methods: {
    setActiveImage(item) {
      if (item.ImageList.length == 0) {
        return this.$message.warning("暂无数据");
      }
      this.activeData = item;
      this.lightFlag = true;
    }
  }
};
</script>

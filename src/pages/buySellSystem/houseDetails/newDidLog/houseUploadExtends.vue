<script>
import exploration from "@/pages/buySellSystem/addHouse/components/exploration";
import houseCheck from "../common/houseCheck";
import util from "@/util/util";
import { mapState } from "vuex";

let enumUpload = new Map();
let houseEnum = [1, 2, 3, 4, 5, 6]; //上传类型 => 添加房源
let detailEnum = [1, 2, 3, 4, 5, 6]; // 上传类型 =>房源详情
houseEnum.forEach((item, index) => {
  enumUpload.set(item, detailEnum[index]);
});
let listMap = new Map([
  ["outdoorImgList", "1"],
  ["livingRoomImgList", "2"],
  ["bedroomImgList", "3"],
  ["kitchenImgList", "4"],
  ["toiletImgList", "5"],
  ["layoutImgList", "6"],
  ["houseVideo", "vedio"]
]);
export default {
  //  inject: ["houseId", "$validator"],
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  extends: exploration,
  props: {
    replaceType: {
      type: Number
    },
    echoData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id
    })
  },
  created() {
    if (this.echoData.length != 0) {
      this.FillImgVideo();
    }
  },
  destroyed() {
    this.socketApi.closeSocket();
  },
  methods: {
    /**
     * 回显视频和图片
     */
    FillImgVideo() {
      let echoMap = new Map([
        ["1", "outdoorImgList"],
        ["2", "livingRoomImgList"],
        ["3", "bedroomImgList"],
        ["4", "kitchenImgList"],
        ["5", "toiletImgList"],
        ["6", "layoutImgList"]
      ]);

      let fileList = [];
      this.echoData.forEach(item => {
        let result = {
          id: item.id,
          url: item.IpStr + item.FileStr + item.PicName
        };
        if (item.videoUrl) {
          this.houseVideo = result;
        }
        if (item.PicClass) {
          this[echoMap.get(item.PicClass.toString())].push(result);
        }
      });
    },
    /**
     * @param {string} picClass 当前上传的类型 如果是视屏则是null
     * @param {file} uploader 上传的文件
     * @param {string} fileListName 对应的数组名字 如果是视屏则是一个对象
     */
    uploadSectionFile(picClass, uploader, fileListName) {
      this[fileListName + "Loading"] = true;
      let formData = new FormData();
      formData.append("file", uploader);
      if (enumUpload.has(picClass)) {
        formData.append("picClass", enumUpload.get(picClass));
      }
      formData.append("eid", this.houseId);
      this.$api
        .post({
          url: `/verifyHouse/${picClass != undefined ? "picture" : "video"}`,
          headers: { "Content-Type": "multipart/form-data" },
          data: formData
        })
        .then(json => {
          if (json.data.code == 200) {
            if (picClass != undefined) {
              this[fileListName].push(json.data.data);
            } else {
              this[fileListName] = json.data.data;
            }
          }
        })
        .catch(e => {
          this.$message({
            message: e.data.message,
            type: "warning"
          });
        })
        .finally(() => {
          this[fileListName + "Loading"] = false;
        });
    },
    uploadFileInfo(picClass, url, callBack) {
      console.log("调用编辑图片，扫码上传，哈哈哈哈");
      let that = this;
      let formData = {};
      //注意大驼峰
      formData.PicClass = picClass;
      formData.IpStr = url;
      formData.FileStr = "";
      formData.PicName = "";
      formData.Eid = that.houseId;
      this.$api
        .post({
          url: `/verifyHouse/${
            picClass != undefined ? "pictureDraft" : "videoDraft"
          }`,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: formData
        })
        .then(json => {
          if (json.data.code == 200) {
            let result = json.data.data;
            result.url = url;
            callBack(result);
          } else {
            that.$message({
              message: json.data.message,
              type: "warning"
            });
          }
        })
        .catch(e => {
          console.log(e);
          that.$message({
            message: e.message,
            type: "warning"
          });
        })
        .finally(() => {});
    }
  }
};
</script>

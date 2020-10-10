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
    Promise.all([this.getLoadDataImg(), this.getLoadDataVideo()])
      .catch(() => {
        this.$message.error("获取数据失败~");
      })
      .finally(() => {
        this.loading = false;
      });
  },
  destroyed() {
    this.socketApi.closeSocket();
  },
  methods: {
    getLoadDataVideo() {
      let url = `agentHouse/video/getVideoList/${this.houseId}`;
      this.$api
        .post({ url: url })
        .then(e => {
          let data = e.data;
          if (data.code == 200 && data.data.length != 0) {
            this.houseVideo = data.data[0];
          }
        })
        .catch(() => {
          this.$message.error("获取数据失败~");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //获取上传的图片
    getLoadDataImg() {
      let url = `agentHouse/pictures/getPicturesList/${this.houseId}`;
      return this.$api.post({ url: url }).then(e => {
        let data = e.data;
        if (data.code == 200) {
          let imgList = data.data;
          imgList.forEach(item => {
            let type = item.picClass ? item.picClass : item.PicClass;
            switch (type) {
              case 1:
                this.outdoorImgList.push(item);
                break;
              case 2:
                this.livingRoomImgList.push(item);
                break;
              case 3:
                this.bedroomImgList.push(item);
                break;
              case 4:
                this.kitchenImgList.push(item);
                break;
              case 5:
                this.toiletImgList.push(item);
                break;
              case 6:
                this.layoutImgList.push(item);
                break;
            }
          });
          //保存图片数组
          Object.keys(this.comparison).forEach(item => {
            this.comparison[item] = JSON.parse(JSON.stringify(this[item]));
          });
        }
      });
    },
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

<script>
import exploration from "@/pages/buySellSystem/addHouse/components/exploration";
import houseCheck from "../common/houseCheck";
import util from "@/util/util";
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
  inject: ["houseId", "$validator"],
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

      this.loading = true;
      let fileList = [];
      this.echoData.forEach(item => {
        if (item.videoUrl) {
          item.PicClass = 7;
        }
        if (item.PicClass) {
          fileList.push({
            Type: 12,
            IpStr: item.IpStr,
            FileStr: item.FileStr,
            PicName: item.PicName,
            PicType: "PicFile_AHouseF",
            AddName: util.localStorageGet("logindata").accountId
              ? util.localStorageGet("logindata").accountId
              : 0,
            subType: item.PicClass,
            Eid: 0
          });
        }
      });
      this.$api
        .post({
          url: `/agentHouse/followPic/insertApplyFile`,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: JSON.stringify(fileList)
        })
        .then(json => {
          if (json.data.code == 200) {
            json.data.data.forEach((item, index) => {
              let result = {
                id: item.id,
                url: item.IpStr + item.FileStr + item.PicName
              };
              if (item.subType == 7) {
                this.houseVideo = result;
              } else {
                this[echoMap.get(item.subType.toString())].push(result);
              }
            });
            this.loading = false;
          }
        })
        .catch(e => {});
    },
    /**
     * @param {string} picClass 当前上传的类型 如果是视屏则是null
     * @param {file} uploader 上传的文件
     * @param {string} fileListName 对应的数组名字 如果是视屏则是一个对象
     */
    uploadSectionFile(picClass, uploader, fileListName) {
      this[fileListName + "Loading"] = true;
      let formData = new FormData();
      formData.append("type", this.replaceType);
      formData.append("file", uploader);
      if (enumUpload.has(picClass)) {
        formData.append("subType", enumUpload.get(picClass));
      } else if (picClass === undefined) {
        formData.append("subType", 7);
      }
      this.$api
        .post({
          url: `/agentHouse/followPic/upload`,
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
    //删除视频
    deleteVideo(item) {
      houseCheck.removeImg(item.id, item.url).then(e => {
        if (e.data.code == 200) {
          this.houseVideo = {};
          this.$message.success(e.data.message);
        }
      });
    },
    //删除图片
    deleteImg(id, url, index, listName) {
      houseCheck.removeImg(id, url).then(e => {
        if (e.data.code == 200) {
          this.$message.success(e.data.message);
          this[listName].splice(index, 1);
        }
      });
    },
    //扫码上传回显
    receiveMessage(r) {
      let that = this;
      console.log(r, "rdsasad");
      let resourceType = r.content.resourceType;
      let picClass = r.content.picClass;
      let str = r.content.picUrl;
      let firstIndex = str.indexOf("/");
      let secondIndex = str.indexOf("/", firstIndex + 1);
      let thirdIndex = str.indexOf("/", secondIndex + 1);
      let lastIndex = str.lastIndexOf("/");
      let params = {
        IpStr: str.substring(0, thirdIndex + 1),
        FileStr: str.substring(thirdIndex + 1, lastIndex + 1),
        PicName: str.substring(lastIndex + 1, str.length),
        Type: that.replaceType,
        subType: resourceType == "vedio" ? 7 : detailEnum[picClass - 1]
      };
      console.log(params);
      if (resourceType == "vedio") {
        picClass = "vedio";
        if (that.houseVideo && that.houseVideo.url) {
          console.log("仅可以上传一个视频,请先手动删除！");
          this.$message.error("仅可以上传一个视频,请先手动删除！");
          return;
        }
        let audioElement = new Audio(str);
        audioElement.addEventListener("loadedmetadata", () => {
          if (audioElement.duration > 91) {
            this.$message.error("视频时长大于90秒了~");
          } else {
            that.insertFile(params, str, picClass);
          }
        });
      } else {
        that.insertFile(params, str, picClass);
      }
    },
    //添加文件
    insertFile(params, str, picClass) {
      this.$api
        .post({
          url: "/agentHouse/followPic/insert",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(json => {
          if (json.data.code == 200) {
            let fileobj = {
              id: json.data.data.id,
              url: str
            };
            listMap.forEach((value, key) => {
              console.log(value, key, "value,key");
              if (value == "vedio" && picClass === "vedio") {
                this[key] = fileobj;
              } else {
                if (value == picClass) {
                  this[key].push(fileobj);
                }
              }
            });
          }
        })
        .catch(e => {
          this.$message({
            message: e.data.message,
            type: "warning"
          });
        });
    }
  }
};
</script>

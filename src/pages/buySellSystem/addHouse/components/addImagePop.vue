<style lang="less" scoped>
.content {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  left: 0;
  .content-back {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.28);
  }
  .offset-content {
    position: absolute;
    height: 100%;
    right: 0;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-body {
      // prettier-ignore
      width: 975PX;
      // prettier-ignore
      min-height: 570PX;
      background: #ffffff;
      // prettier-ignore
      border-radius: 10PX;
      // prettier-ignore
      border-radius: 10PX;
      // prettier-ignore
      padding: 24PX 24PX 30PX 33PX;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .body-head {
        display: flex;
        justify-content: space-between;
        .head-left {
          .head-left-title {
            font-size: @font24;
            font-weight: bold;
            color: #303133;
          }
          .head-left-tips {
            color: #606266;
            font-size: @font14;
            // prettier-ignore
            margin-top: 8PX;
            span {
              color: #d62727;
            }
          }
        }
        .el-icon-close {
          font-size: @font18;
          cursor: pointer;
        }
      }
      .body-middle {
        display: flex;
        flex: 1;
        // prettier-ignore
        margin: 55PX 0 63PX;
        .middle-right,
        .middle-left {
          flex: 1;
        }
        .middle-right {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          img {
            // prettier-ignore
            width: 162PX;
            // prettier-ignore
            height: 162PX;
          }
          div {
            // prettier-ignore
            margin-top: 16PX;
            font-size: @font16;
            color: #909399;
          }
        }
        .middle-left {
          border-right: 1px solid #d3d3d3;
          display: flex;
          align-items: center;
          flex-direction: column;
          .image-content {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            // prettier-ignore
            margin-left: -5PX;
            // prettier-ignore
            padding-right: 5PX;
            .iamge-item {
              position: relative;
              flex: 0 0 25%;
              // prettier-ignore
              width: 96PX;
              // prettier-ignore
              height: 96PX;
              // prettier-ignore
              padding: 0 5PX;
              box-sizing: border-box;
              // prettier-ignore
              margin-bottom: 10PX;
              .remove-btn {
                position: absolute;
                // prettier-ignore
                top: -7PX;
                // prettier-ignore
                right:-2PX ;
                color: #d62727;
                font-size: @font14;
                text-align: center;
                display: none;
                cursor: pointer;
              }
              img {
                // prettier-ignore
                border-radius: 6PX;
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              &:hover .remove-btn {
                display: block;
              }
            }
          }
          .upload-label {
            display: block;
            // prettier-ignore
            width: 204PX;
            // prettier-ignore
            height: 48PX;
            text-align: center;
            background: @backgroud;
            // prettier-ignore
            border-radius: 4PX;
            color: #fff;
            // prettier-ignore
            line-height: 48PX;
            font-size: @font16;
            cursor: pointer;
            input {
              display: none;
            }
          }
          .upload-tips {
            font-size: @font16;
            // prettier-ignore
            margin-top: 25PX;
            color: #606166;
            text-align: center;
          }
        }
      }
      .foot-content {
        display: flex;
        justify-content: flex-end;
        button {
          // prettier-ignore
          width: 136PX;
          // prettier-ignore
          height: 48PX;
          box-sizing: border-box;
          // prettier-ignore
          border-radius: 4PX;
          outline: none;
          border: none;
          font-size: @font16;
          cursor: pointer;
          & + button {
            // prettier-ignore
            margin-left: 16PX;
          }
        }
        .border {
          background: #fff;
          border: 1px solid #cecece;
        }
        .back {
          background: @backgroud;
          color: #fff;
        }
      }
    }
  }
}
</style>
<template>
  <!--  element-loading-text="我在去获取数据的路上了~" -->
  <div class="content">
    <div class="content-back"></div>
    <div class="offset-content" :style="`left:${left}px`">
      <div class="content-body">
        <div class="body-head">
          <div class="head-left">
            <h3 class="head-left-title">添加照片</h3>
            <div class="head-left-tips">
              <div>可一次上传全部房源照片</div>
              <span>
                上传图片时，请保持弹窗打开，否则可能出现上传图片失败！！
              </span>
            </div>
          </div>
          <i class="el-icon-close anchor-point" @click="closePop"></i>
        </div>
        <div class="body-middle">
          <!-- 选择照片上传 -->
          <div
            class="middle-left"
            :style="{
              'justify-content':
                imgAllArr.length != 0 ? 'space-between' : 'center'
            }"
          >
            <div class="image-content">
              <div class="iamge-item" v-for="itme in imgAllArr" :key="itme.id">
                <!-- FileReader -->
                <img v-if="itme.v" :src="itme.v" :alt="itme.file.name" />
                <!-- webSocket图片 -->
                <img v-else :src="itme.url" alt="微信上传图片" />
                <div
                  class="remove-btn iconbianzu12 iconfont"
                  @click="sliceTemporaryItem(itme)"
                ></div>
              </div>
            </div>
            <div>
              <label class="upload-label">
                <span>选择照片</span>
                <input
                  ref="inputFile"
                  type="file"
                  multiple="multiplt"
                  @change="uploadFile"
                  accept="image/jpg,image/jpeg,image/png"
                />
              </label>
              <div class="upload-tips">按住Ctrl可多选</div>
            </div>
          </div>
          <!-- 微信二维码上传 -->
          <div class="middle-right">
            <img :src="qrImg" alt="图片二维码上传" />
            <div>微信扫码上传</div>
          </div>
        </div>
        <div class="foot-content">
          <button class="border" @click="closePop">取消</button>
          <button class="back" @click="commitImage" v-loading="loading">
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const elMain = document.querySelector(".el-main");
export default {
  props: {
    houseId: [Number, String],
    //通过二维码加入的图片
    socketImageList: {
      type: Array,
      default() {
        return [];
      }
    },
    qrImg: String, //上传图片二维码
    visible: Boolean, // 关闭开关
    isMaxLength: Number, //当前长度
    maxImageLength: Number //最大长度
  },
  computed: {
    imgAllArr() {
      return [...this.socketImageList, ...this.temporaryFile];
    }
  },
  data() {
    return {
      loading: false,
      left: elMain.offsetLeft,
      temporaryFile: []
    };
  },
  methods: {
    /**
     * @example: 删除对应的临时图片数据
     */
    sliceTemporaryItem(i) {
      console.log(i);
      if (i.file) {
        this.temporaryFile = this.temporaryFile.filter(v => v.id != i.id);
      } else {
        this.$emit(
          "removeSocketItem",
          i,
          this.socketImageList.findIndex(v => v.id == v.id),
          "socketPicArr"
        );
      }
    },
    /**
     * @example: 关闭弹框
     */
    closePop() {
      this.$emit("update:socketImageList", []);
      this.$emit("update:visible", false);
    },
    /**
     * @example: 文件上传
     */
    uploadFile(event) {
      let file = event.target.files;
      /**
       * 当前上传的file长度 + 临时文件长度 + 已经上传的文件长度 > 最大上限
       */
      const isOutSide =
        file.length + this.isMaxLength + this.temporaryFile.length <=
        this.maxImageLength;

      if (isOutSide) {
        new Promise((r, s) => {
          let fileList = [];
          let count = 0;
          //   获取dataUrl
          for (let i = 0, l = file.length; i < l; i++)
            this.getAsDataURL(file[i])
              .then(v => {
                fileList.push(v);
              })
              .finally(() => {
                count++;
                if (count == l) r(fileList);
              });
        }).then(v => {
          this.temporaryFile = [...this.temporaryFile, ...v];
        });
      } else {
        this.$message.warning(
          `您当前选择的房源图片数已超过最大张数${file.length +
            this.temporaryFile.length +
            this.isMaxLength -
            this.maxImageLength}张，请重新选择后上传！`
        );
      }
      this.$refs.inputFile.value = "";
    },
    /**
     * @example: 获取图片DataUrl
     */
    getAsDataURL(file) {
      return new Promise((r, s) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function() {
          r({
            file,
            v: fileReader.result,
            id: Number(
              Math.random()
                .toString()
                .substr(3, 5)
            )
          });
        };
        fileReader.onerror = e => {
          this.$message.warning("失败了阿");
          s();
        };
      });
    },
    /**
     * @example: 确定提交图片
     */
    commitImage() {
      if (this.temporaryFile.length == 0) {
        return this.$message.warning("需要上传图片");
      }
      new Promise((r, s) => {
        let counter = 0;
        let uploadImage = [];
        this.loading = true;
        for (let index = 0; index < this.temporaryFile.length; index++) {
          this.uploadSectionFile(this.temporaryFile[index].file)
            .then(v => {
              uploadImage.push(v);
            })
            .catch(e => {
              this.$message({
                message: e.message,
                type: "warning"
              });
            })
            .finally(() => {
              counter++;
              if (counter == this.temporaryFile.length) {
                r(uploadImage);
              }
            });
        }
      })
        .then(v => {
          this.$message.success("上传成功");
          this.closePop();
          this.$emit("update:socketImageList", []);
          this.$emit("commitImage", [...v, ...this.socketImageList]);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    uploadSectionFile(uploader) {
      return new Promise((r, s) => {
        let formData = new FormData();
        formData.append("file", uploader);
        if (this.houseId) {
          formData.append("Eid", this.houseId);
        }

        this.$api
          .post({
            url: `/verifyHouse/picture`,
            headers: { "Content-Type": "multipart/form-data" },
            data: formData
          })
          .then(({ data }) => {
            if (data.code == 200) r({ ...data.data, rLoading: false });
            else s(data);
          })
          .catch(s);
      });
    }
  }
};
</script>

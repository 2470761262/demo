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
      <!-- 户型图 -->
      <div class="image-flex">
        <div class="image-content">
          <div class="image-content-head">
            <div>户型图</div>
            <span>5张</span>
          </div>
          <img
            class="image-content-body"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2020/PicFile_Agent202002/20200227/base6420200227180724463_35061.jpg?x-oss-process=style/thumb"
            alt="户型图"
          />
          <div class="image-content-foot">
            <div class="image-foot-pro">上传人：谢谢你</div>
            <div class="image-foot-time">上传时间：2020-06-2818:56:01</div>
          </div>
        </div>
      </div>
      <!-- 外景 -->
      <div class="image-flex">
        <div class="image-content">
          <div class="image-content-head">
            <div>外景图</div>
            <span>5张</span>
          </div>
          <img
            class="image-content-body"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2020/PicFile_Agent202002/20200227/base6420200227180724463_35061.jpg?x-oss-process=style/thumb"
            alt="户型图"
          />
          <div class="image-content-foot">
            <div class="image-foot-pro">上传人：谢谢你</div>
            <div class="image-foot-time">上传时间：2020-06-2818:56:01</div>
          </div>
        </div>
      </div>
      <!-- 客厅 -->
      <div class="image-flex">
        <div class="image-content">
          <div class="image-content-head">
            <div>客厅</div>
            <span>5张</span>
          </div>
          <img
            class="image-content-body"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2020/PicFile_Agent202002/20200227/base6420200227180724463_35061.jpg?x-oss-process=style/thumb"
            alt="户型图"
          />
          <div class="image-content-foot">
            <div class="image-foot-pro">上传人：谢谢你</div>
            <div class="image-foot-time">上传时间：2020-06-2818:56:01</div>
          </div>
        </div>
      </div>
      <!-- 厨房 -->
      <div class="image-flex">
        <div class="image-content">
          <div class="image-content-head">
            <div>厨房</div>
            <span>5张</span>
          </div>
          <img
            class="image-content-body"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2020/PicFile_Agent202002/20200227/base6420200227180724463_35061.jpg?x-oss-process=style/thumb"
            alt="户型图"
          />
          <div class="image-content-foot">
            <div class="image-foot-pro">上传人：谢谢你</div>
            <div class="image-foot-time">上传时间：2020-06-2818:56:01</div>
          </div>
        </div>
      </div>
      <!-- 卧室 -->
      <div class="image-flex">
        <div class="image-content">
          <div class="image-content-head">
            <div>卧室</div>
            <span>5张</span>
          </div>
          <img
            class="image-content-body"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2020/PicFile_Agent202002/20200227/base6420200227180724463_35061.jpg?x-oss-process=style/thumb"
            alt="户型图"
          />
          <div class="image-content-foot">
            <div class="image-foot-pro">上传人：谢谢你</div>
            <div class="image-foot-time">上传时间：2020-06-2818:56:01</div>
          </div>
        </div>
      </div>
      <!-- 卫生间 -->
      <div class="image-flex">
        <div class="image-content">
          <div class="image-content-head">
            <div>卫生间</div>
            <span>5张</span>
          </div>
          <img
            class="image-content-body"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2020/PicFile_Agent202002/20200227/base6420200227180724463_35061.jpg?x-oss-process=style/thumb"
            alt="户型图"
          />
          <div class="image-content-foot">
            <div class="image-foot-pro">上传人：谢谢你</div>
            <div class="image-foot-time">上传时间：2020-06-2818:56:01</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

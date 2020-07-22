<template>
  <div class="di main-wrap" v-loading="audio.waiting">
    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
    <audio
      ref="audio"
      class="dn"
      :src="url"
      :preload="audio.preload"
      @play="onPlay"
      @error="onError"
      @waiting="onWaiting"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
    <div class="PalyRow">
      <div class="horn">
        <i class="iconfont iconshengyi"></i>
        <span>{{ audio.countdown | formatSecond }}</span>
      </div>
      <div class="Time"></div>
      <el-button @click="startPlayOrPause" class="Pause">
        <i
          class="iconfont "
          :class="audio.playing ? 'iconbofang1' : 'iconbofang'"
        ></i>
      </el-button>
    </div>
  </div>
</template>

<script>
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return (
      hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
    );
  } else {
    return "0:00:00";
  }
}

export default {
  props: {
    theUrl: {
      type: String,
      required: true
    },
    theSpeeds: {
      type: Array,
      default() {
        return [1, 1.5, 2];
      }
    },
    theControlList: {
      type: String,
      default: ""
    }
  },
  name: "VueAudio",
  data() {
    return {
      url: this.theUrl || "http://devtest.qiniudn.com/secret base~.mp3",
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
        muted: false,
        speed: 1,
        waiting: true,
        preload: "auto",
        countdown: 0
      },

      sliderTime: 0,
      volume: 100,
      speeds: this.theSpeeds,

      controlList: {
        // 只能播放一个
        onlyOnePlaying: true,
        // 不要快进按钮
        noSpeed: false
      }
    };
  },
  methods: {
    // 播放跳转
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    startPlayOrPause() {
      return this.audio.playing ? this.pausePlay() : this.startPlay();
    },
    // 开始播放
    startPlay() {
      this.$refs.audio.play();
    },
    // 暂停
    pausePlay() {
      this.$refs.audio.pause();
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
    },
    // 当发生错误, 就出现loading状态
    onError() {
      this.audio.waiting = true;
    },
    // 当音频开始等待
    onWaiting(res) {
      console.log(res);
    },
    // 当音频开始播放
    onPlay(res) {
      console.log(res);
      this.audio.playing = true;
      this.audio.loading = false;

      if (!this.controlList.onlyOnePlaying) {
        return;
      }

      let target = res.target;

      let audios = document.getElementsByTagName("audio");

      [...audios].forEach(item => {
        if (item !== target) {
          item.pause();
        }
      });
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      // console.log('timeupdate')
      // console.log(res)
      this.audio.currentTime = res.target.currentTime;
      this.audio.countdown = this.audio.maxTime - this.audio.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      console.log("loadedmetadata");
      console.log(res);
      this.audio.waiting = false;
      this.audio.maxTime = parseInt(res.target.duration);
      this.audio.countdown = this.audio.maxTime;
    }
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    transMutedOrNot(value) {
      return value ? "放音" : "静音";
    },
    transSpeed(value) {
      return "快进: x" + value;
    }
  },
  created() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-wrap {
  padding: 5px 10px 10px;
  min-width: 450px;
}
.PalyRow {
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  background: #ffffff;
  border-radius: 4px;
  .horn {
    > i,
    > span {
      line-height: 40px;
      font-size: @font22;
      color: #999999;
    }
    > span {
      padding-left: 15px;
    }
  }
}
.Pause {
}
/deep/.el-button {
  width: 40px;
  height: 40px;
  border: 2px solid @backgroud;
  border-radius: 50%;
  text-align: center;
  padding: 0;
  color: @backgroud;
  text-align: center;
}
.slider {
  display: inline-block;
  width: 80%;
  position: relative;
  top: 14px;
  margin-left: 15px;
}

.di {
  display: inline-block;
}

.download {
  color: #409eff;
  margin-left: 15px;
}

.dn {
  display: none;
}
</style>

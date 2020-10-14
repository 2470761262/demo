/** * @example: 拖拽组件实现流程说明 打开下方链接查看
https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/13/e719b8118de94879898d87c06aefe9a5.jpg
* @param {type} * @return {type} [object Object] */

<script>
import Vue from "vue";
export default {
  provide() {
    return {
      dragParent: this
    };
  },
  props: {
    currentType: Number,
    multiArr: Array
  },
  data() {
    return {
      targetInitPosi: {},

      multiX: 0,

      multiY: 0,

      isMulti: false,

      activeDragId: null
    };
  },

  methods: {
    /**
     * @example: 执行子组件对应方法
     */

    runChildFun(funName) {
      this.$children.forEach(item => {
        if (item.$options.name == "dragItem") {
          item[funName]();
        }
      });
    },
    /**
     * @example: 删除对应的数组之后通知子元素重新获取XY
     */
    emitChildInitXY() {
      this.runChildFun("initDragItem");
    },
    runChildCrashOK(runFun) {
      this.$children.forEach(item => {
        if (
          item.$options.name == "dragItem" &&
          this.multiArr.includes(item.dragId)
        ) {
          item[runFun]();
        }
      });
      this.isMulti = false;
      this.multiX = 0;
      this.multiY = 0;

      this.$emit("update:multiArr", []);
    },
    /**
     * @example: 通知子组件XY同步
     * @param {boolean} f 设置当前为多选移动
     * @param {stirng|number} activeDragId 当前触发拖拽的主体ID
     * @param {number} x
     * @param {number} y
     */
    multiInit(f, activeDragId, { ox, oy }) {
      this.isMulti = f;
      this.activeDragId = activeDragId;
      this.multiX = ox;
      this.multiY = oy;
      this.runChildFun("multiInit");
    },
    /**
     * @example: target定位初始化
     */
    targetInit(v) {
      this.targetInitPosi = v;
    },
    /**
     * @example: 碰撞检测
     */
    crashDetection(v) {
      const { left: l1, right: r1, top: t1, bottom: b1, gh, gw, done } = v;

      const { left: l2, right: r2, top: t2, bottom: b2 } = this.targetInitPosi;

      if (r1 < l2 + gw || b1 < t2 + gh || l1 > r2 - gw || t1 > b2 - gh) {
        if (this.isMulti) {
          //多选没有发生碰撞
          this.runChildCrashOK("initXy");
        } else {
          //没有发生碰撞
          done(false);
        }
      } else {
        if (this.isMulti) {
          //多选碰撞
          this.runChildCrashOK("crashOK");
        } else {
          //单一发生碰撞
          done(true);
        }
      }
    }
  },

  render(h) {
    return h(
      "div",
      {
        attrs: {
          ondragstart: "return false;"
        }
      },
      this.$slots.default
    );
  },

  created() {
    //监听拖动区域的初始化
    this.$on("targetInit", this.targetInit);

    //监听拖拽元素的碰撞检测
    this.$on("crashDetection", this.crashDetection);

    //监听的某一拖拽元素
    this.$on("emitChildInitXY", this.emitChildInitXY);

    //监听的某一拖拽元素通知同级组件执行XY同步
    this.$on("multiInit", this.multiInit);
  }
};
</script>

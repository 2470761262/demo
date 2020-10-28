<script>
import util from "@/util/util";
export default {
  inject: ["dragParent"],
  name: "dragItem",
  watch: {
    /**
     * @example: 类型切换时重新更新拖拽xy
     */
    "dragParent.currentType"() {
      this.$nextTick(() => {
        this.initDragItem();
      });
    }
  },
  render(h) {
    return h(
      "div",
      {
        ref: "dragItem",
        on: {
          mousedown: this.mousedown
        },
        style: this.allClass
      },
      this.$scopedSlots.default({ isDrag: this.isDrag })
    );
  },
  computed: {
    syncX() {
      return this.dragParent.multiX;
    },
    syncY() {
      return this.dragParent.multiY;
    },
    allClass() {
      return this.gapStyle + this.move;
    },
    move() {
      return `position: relative;
      transform: translate(${this.x + (this.isOffSet ? 10 : 0)}px,${this.y +
        (this.isOffSet ? 10 : 0)}px);z-index:${
        this.dragParent.activeDragId == this.dragId || this.isDown ? 999 : 0
      }`;
    }
  },
  props: {
    gapStyle: String, //间距行内样式

    dragWidth: Number, //元素宽度

    dragHeight: Number, //元素高度

    gap: Number, //触发百分比

    dragIndex: Number, //拖拽Index

    dragId: [String, Number] //拖拽ID
  },

  data() {
    return {
      isDrag: false, //当前激活

      isOffSet: false, //多选偏移

      isDown: false,

      offsetEvent: {},

      x: 0,

      y: 0,

      ox: 0,

      oy: 0
    };
  },
  mounted() {
    this.initDragItem();
  },
  methods: {
    initDragItem() {
      this.ox = util.getElementLeft(this.$refs.dragItem);
      this.oy = util.getElementTop(this.$refs.dragItem);
    },
    mousedown({ clientX, clientY, offsetX, offsetY }) {
      this.isDown = true;

      this.offsetEvent = {
        x: clientX - offsetX, //- this.x,
        y: clientY - offsetY, //- this.y,
        offsetX,
        offsetY,
        temporaryX: 0,
        temporaryY: 0
      };

      const mousemove = e => {
        this.mousemove(e);
      };

      const mouseup = e => {
        document.body.removeEventListener("mousemove", mousemove);

        document.body.removeEventListener("mouseup", mouseup);

        this.mouseup(e);
      };

      document.body.addEventListener("mousemove", mousemove);

      document.body.addEventListener("mouseup", mouseup);
    },
    mousemove({ clientX, clientY, offsetX, offsetY }) {
      // console.log(this.dragId, "this.dragId");
      if (!this.isDown) return;

      //移动当前元素

      this.x = clientX - this.offsetEvent.x - this.offsetEvent.offsetX;

      this.y = clientY - this.offsetEvent.y - this.offsetEvent.offsetY;

      //代表多选移动
      if (this.dragParent.multiArr.length != 0) {
        this.dragParent.$emit("multiInit", true, this.dragId, {
          ox: this.ox + this.x,
          oy: this.oy + this.y
        });
      }
    },
    /**
     * @example: 多选触发通知同级被勾选的组件
     */
    multiInit() {
      if (this.dragParent.multiArr.includes(this.dragId)) {
        //当前非依赖拖拽元素
        if (this.dragParent.activeDragId != this.dragId) {
          this.isOffSet = true;
          this.x = this.dragParent.multiX - this.ox;
          this.y = this.dragParent.multiY - this.oy;
        } else this.isDrag = true;
      }
    },
    mouseup() {
      this.isDown = false;

      let rootTop = this.oy + this.y; //当前距离页面顶部的top

      let rootLeft = this.ox + this.x; //当前距页面左侧的left

      let heightSection = this.dragHeight * this.gap; //计算百分比

      let widthSection = this.dragWidth * this.gap; //计算百分比

      let top = rootTop,
        left = rootLeft,
        right = left + this.dragWidth,
        bottom = top + this.dragHeight;

      //回调执行
      const done = e => {
        if (!e) {
          this.initXy();
        } else {
          this.crashOK();
        }
      };
      this.dragParent.$emit("crashDetection", {
        left,
        top,
        right,
        bottom,
        gh: heightSection,
        gw: widthSection,
        done
      });
    },
    initXy() {
      this.isOffSet = false;
      this.isDrag = false;
      this.x = 0;
      this.y = 0;
    },
    crashOK() {
      this.isDrag = false;
      this.isOffSet = false;
      this.dragParent.$emit("spliceOnce", {
        index: this.dragIndex,
        id: this.dragId,
        //撤回
        recall: () => {
          this.initXy();
        },
        done: () => {
          //删除之后执行done 通知所有的拖拽组件重新获取新的坐标
          this.$nextTick(() => {
            this.dragParent.$emit("emitChildInitXY");
          });
        }
      });
    }
  }
};
</script>

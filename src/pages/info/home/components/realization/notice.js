import { Vcomposition2 } from "vcomposition2";

/**
 * @example: 设置初始化数据
 */
function useInit(ctx, root) {
  ctx.reactive({
    activeIndex: 0, //激活下标
    activeList: [], //渲染数组
    newList: [], //缓存系统公告
    documentList: [], //缓存文档
    loading: true, //加载
    url: "/sys/noticeManageList" //更多按钮链接 默认系统公告
  });
  /**
   * @example: 修改当前激活下标
   */
  const setActiveIndex = index => {
    root.activeIndex = index;
  };
  /**
   * @example: 修改loading
   */
  const setLoading = bool => {
    root.loading = bool;
  };
  /**
   * @example: 查看更多
   */
  const navToMoer = () => {
    this.$router.push({
      path: root.url
    });
  };
  return {
    setLoading,
    setActiveIndex,
    navToMoer
  };
}

/**
 * @example: 根据当前激活类型获取远程数据 修改当前更多按钮url
 */
function useRemoteData(v2, root) {
  v2.onWatch(
    "activeIndex",
    value => {
      this.setLoading(true);

      switch (value) {
        case 0:
          root.url = "/sys/noticeManageList";
          v2.use(newsEnter);
          break;
        case 1:
          root.url = "/sys/document/list";
          v2.use(documentEnter);
          break;
      }
    },
    {
      immediate: true
    }
  );

  /**
   * @example: 计算是否暂无数据
   */
  v2.onComputed("isEmpty", () => {
    return !root.loading && root.activeList.length == 0;
  });

  /**
   * @example: 当前激活类型元素点击触发
   */
  const navTouch = i => {
    switch (root.activeIndex) {
      case 0: //查看公告详情
        this.$router.push({
          path: "/sys/noticeDetail",
          query: { noticeId: i.id }
        });
        break;
      case 1: // 文档下载
        window.location.href = i.url;
        break;
    }
  };

  return {
    navTouch
  };
}

/**
 * @example:获取系统公告
 */
function newsEnter(ctx, root) {
  if (root.newList.length == 0) {
    this.$api
      .get({
        url: "/noticeManage/index/news",
        data: {
          limit: 5
        }
      })
      .then(({ data }) => {
        root.newList = data.data.map(v => {
          return {
            title: v.newsTitle,
            id: v.newId,
            date: v.addDate
          };
        });
        root.activeList = root.newList;
        this.setLoading(false);
      });
  } else {
    root.activeList = root.newList;
    this.setLoading(false);
  }
}

/**
 * @example:获取文档公
 */
function documentEnter(ctx, root) {
  if (root.documentList.length == 0) {
    this.$api
      .get({
        url: "/document/index/docs",
        data: {
          limit: 5
        }
      })
      .then(({ data }) => {
        root.documentList = data.data.map(v => {
          return {
            title: v.title,
            id: v.id,
            date: v.addTime,
            url: v.url
          };
        });
        root.activeList = root.documentList;
        this.setLoading(false);
      });
  } else {
    root.activeList = root.documentList;
    this.setLoading(false);
  }
}

export const enter = function() {
  const v2 = new Vcomposition2(this);
  v2.onCreate(() => {
    v2.use([useInit, useRemoteData]);
  });
};

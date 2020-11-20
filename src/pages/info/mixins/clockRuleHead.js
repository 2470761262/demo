export default {
  data() {
    return {
      currentNavIndex: 1,
      currentSubNavIndex: 0,
      navs: [
        {
          name: "考勤汇总",
          path: "/clockList"
        },
        {
          name: "考勤规则",
          path: "/clockRule"
        }
      ],
      subNavs: [
        {
          name: "考勤规则管理",
          path: "/clockRule/list"
        },
        {
          name: "名言警句配置",
          path: "/clockRule/quotes"
        }
      ]
    };
  },
  methods: {
    navigateToOhter(path, index) {
      if (index != undefined) this.currentSubNavIndex = index;
      this.$router.push({ path: path });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.currentSubNavIndex = vm.subNavs.findIndex(item => {
        return item.path == to.fullPath;
      });
    });
  }
};

export default {
  data() {
    return {
      currentNavIndex: 1,
      currentSubNavIndex: 0,
      navs: [
        {
          name: "考勤日志",
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
          path: "/clockRule/list",
          rUrl: "rule"
        },
        {
          name: "名言警句配置",
          path: "/clockRule/quotes",
          rUrl: "famous"
        }
      ],
      subSecondNavs: [
        {
          name: "我的日志",
          path: "/clockList/myInfo",
          rUrl: "workSummary"
        },
        {
          name: "考勤统计",
          path: "/clockList/statistic",
          rUrl: "statistics"
        },
        {
          name: "考勤审批",
          path: "/clockList/examine",
          rUrl: "audit"
        }
      ]
    };
  },
  created() {
    this.$api
      .get({
        url: "/attendance/record/functions",
        data: {},
        headers: { "Content-Type": "application/json" }
      })
      .then(e => {
        let data = e.data;
        if (data.code == 200) {
          let functionRuleList = data.data.functionRuleList;
          let currentUrl = this.subNavs[this.currentSubNavIndex].rUrl;
          // 删除没配置权限的功能节点
          for (let i = this.subNavs.length - 1; i >= 0; i--) {
            let index = functionRuleList.findIndex(item => {
              return item.rUrl == this.subNavs[i].rUrl;
            });
            if (index == -1) {
              this.subNavs.splice(i, 1);
            }
          }
          for (let i = this.subSecondNavs.length - 1; i >= 0; i--) {
            let index = functionRuleList.findIndex(item => {
              return item.rUrl == this.subSecondNavs[i].rUrl;
            });
            if (index == -1) {
              this.subSecondNavs.splice(i, 1);
            }
          }
          if (this.subSecondNavs.length == 0) {
            let delIndex = this.currentNavIndex == 1 ? 0 : 1;
            this.navs.splice(delIndex, 1);
            this.currentNavIndex = 0;
          }
          // 第一个一级节点没权限跳转到第二个
          if (this.subNavs.length == 0) {
            this.navs.splice(this.currentNavIndex, 1);
            this.currentNavIndex = 0;
            this.subNavs = this.subSecondNavs;
            this.currentSubNavIndex = 0;
            this.$router.push({ path: this.subNavs[0].path });
          } else {
            let fIndex = this.subNavs.findIndex(item => {
              return item.rUrl == currentUrl;
            });
            this.currentSubNavIndex = fIndex;
            if (fIndex == -1) {
              this.$router.push({ path: this.subNavs[0].path });
            }
          }
        }
      })
      .finally();
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
        return item.path == to.path;
      });
    });
  }
};

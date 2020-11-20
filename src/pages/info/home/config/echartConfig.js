import util from "@/util/util";
export default echartData => {
  const total = (
    echartData.lease +
    echartData.deal +
    echartData.project
  ).toFixed(2);
  const list = [
    { value: echartData.lease, name: "买卖" },
    { value: echartData.deal, name: "租赁" },
    { value: echartData.project, name: "项目" }
  ];

  return {
    legend: {
      orient: "vertical",
      right: 0,
      top: 103,
      textStyle: {
        fontSize: 14,
        color: "#303133",
        fontFamily: "Microsoft YaHei",
        rich: {
          value: {
            fontFamily: "lsx",
            padding: [0, 0, 0, 24]
          }
        }
      },
      selectedMode: false,
      icon: "circle",
      itemWidth: 12,
      itemGap: 14,
      formatter: e => {
        switch (e) {
          case "买卖":
            return `${e}:{value|￥${util.regexNum(echartData.lease)}}`;
          case "租赁":
            return `${e}:{value|￥${util.regexNum(echartData.deal)}}`;
          case "项目":
            return `${e}:{value|￥${util.regexNum(echartData.project)}}`;
        }
      },

      data: ["买卖", "租赁", "项目"]
    },
    silent: true,
    //animation: false,
    series: [
      {
        color: ["#FBC04C", "#FA8988", "#658FF3"],
        type: "pie",
        radius: [58, 86],
        center: [94, 112],
        avoidLabelOverlap: false,
        // itemStyle: {
        //   borderWidth: 10,
        //   borderColor: "#fff"
        // },
        label: {
          show: true,
          position: "center",
          formatter: () => `{b|${util.regexNum(total)}} \n {c|总业绩 (元)} `,
          rich: {
            c: {
              color: "#909399",
              fontSize: 14
            }
          },
          fontFamily: "lsx",
          align: "center",
          fontSize: 24,
          color: "#303133"
        },
        data: (function(arr) {
          //计算是否需要添加区间
          const isGap = arr.filter(v => v.value > 0).length;
          return arr
            .map(v => {
              if (isGap > 0) {
                return [
                  v,
                  {
                    value: isGap > 1 ? (v.value > 0 ? total / 50 : 0) : 0,
                    //name: "",
                    itemStyle: {
                      color: "#fff"
                    }
                  }
                ];
              } else {
                return v;
              }
            })
            .flat();
        })(list)
      }
    ]
  };
};

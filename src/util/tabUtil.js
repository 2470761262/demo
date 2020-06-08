function triggerImpression(el) {
  const triggerTagget = el.target;
  if (
    triggerTagget.nodeName == "INPUT" &&
    triggerTagget.getAttribute("class") &&
    triggerTagget.getAttribute("class").includes("impression-btn")
  ) {
    let children = triggerTagget.parentElement.previousElementSibling.children;
    if (triggerTagget.checked) {
      [...children].forEach((childrenItem, index) => {
        index != 0 && (childrenItem.style.cssText = "display:none");
      });
    } else {
      [...children].forEach(childrenItem => {
        childrenItem.style.cssText = "display:block";
      });
    }
  }
}

export default class setImpression {
  static agencyImpressionClick() {
    document.addEventListener("click", triggerImpression);
  }
  static removeImpressionClick() {
    document.removeEventListener("click", triggerImpression);
  }
  //删除多余的table border-bottom 下划线
  static removeIsEmptyTd() {
    const scrollingLeft = document.querySelector(".is-scrolling-left");
    const scrollingRight = document.querySelector(".el-table__fixed-right");
    const scrollingisNoScroll = document.querySelector(".el-table__body");
    let isRemoveList = [];
    if (!scrollingLeft) {
      isRemoveList = [scrollingisNoScroll, scrollingRight];
    } else {
      isRemoveList = [scrollingLeft, scrollingRight];
    }
    console.log(isRemoveList, "isRemoveList");
    isRemoveList.forEach(item => {
      const tbody = item.querySelector("tbody");
      const tr = tbody.querySelectorAll("tr");

      const isExpandedTr = [...tr].filter(trItem => {
        return !trItem.getAttribute("class");
      });
      isExpandedTr.forEach(exItem => {
        const childrenTd = exItem.querySelector(".el-table__expanded-cell");
        if (childrenTd.children.length == 0) {
          tbody.removeChild(exItem);
        }
      });
    });
  }
}

export function setImpression() {
  let checkBox = document.querySelectorAll(".trigger-impression-btn");
  [...checkBox].forEach(item => {
    let check = item.querySelector("input");
    check.addEventListener(
      "click",
      function(e) {
        let children = this.parentElement.previousElementSibling.children;
        if (this.checked) {
          [...children].forEach((childrenItem, index) => {
            index != 0 && (childrenItem.style.cssText = "display:none");
          });
        } else {
          [...children].forEach(childrenItem => {
            childrenItem.style.cssText = "display:block";
          });
        }
      },
      false
    );
  });
}

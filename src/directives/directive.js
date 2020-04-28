import util from '@/util/util';
export default {
    install (Vue) {
        Vue.directive('number', {
            bind: (el, binding, vnode) => {
                const input = el.getElementsByTagName('input')[0];
                //浮点数
                if (binding.modifiers.floot) {
                    input.onkeyup = (e) => {
                        input.value = input.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
                        input.value = input.value.replace(/^\./g, ""); //验证第一个字符是数字
                        input.value = input.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
                        input.value = input.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                        input.value = input.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
                        if (input.value.indexOf(".") < 0 && input.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                            input.value = parseFloat(input.value);
                        }
                        input.dispatchEvent(new Event('input'))
                    }
                    input.onblur = () => {
                        //离开的时候 例如value = 5. 则把.去掉
                        if (input.value.indexOf(".") == input.value.length - 1) {
                            input.value = input.value.replace(".", "");
                        }
                        input.dispatchEvent(new Event('input'))
                    }
                } else {
                    //自定义指令 限制只能输入大于0的数字
                    input.onkeyup = (e) => {
                        if (input.value.length === 1) {
                            input.value = input.value.replace(/[^1-9]/g, '')
                        } else {
                            input.value = input.value.replace(/[^\d]/g, '')
                        }
                        input.dispatchEvent(new Event('input'))
                    }
                }
            }
        })

        /**
         *动画滚动定位到第一个不在视口内的错误提示位置
         */
        Vue.directive('scrollError', {
            update (el, binding, vnode) {
                vnode.context.$nextTick(() => {
                    if (binding.value.length > 0) {
                        vnode.context.$nextTick(() => {
                            let firstEerrorDom = document.querySelector(".after-tips");
                            firstEerrorDom.scrollIntoView({
                                block: 'start',
                                behavior: 'smooth'
                            })

                            // if (firstEerrorDom.offsetTop < contentScroll.scrollTop) {
                            //     function animateScroll() {
                            //         if (contentScroll.scrollTop >= firstEerrorDom.offsetTop) {
                            //             contentScroll.scrollTop = contentScroll.scrollTop - 10;
                            //         } else {
                            //             return;
                            //         }
                            //         requestAnimationFrame(animateScroll);
                            //     }
                            //     animateScroll();
                            // }
                        });
                    }
                })
            }

        })
        Vue.directive("elDrag", {
            bind (el) {
                let drag = el.querySelector('.didLog-content-body');
                let dragWarp = drag.querySelector('.didLog-content-box-title');
                dragWarp.style.cursor = "all-scroll";
                dragWarp.onmousedown = (e) => {
                    if (e.target.tagName != 'I') {
                        let disX = e.clientX - drag.offsetLeft;
                        let disY = e.clientY - drag.offsetTop;
                        drag.style.position = "absolute";
                        document.onmousemove = (e) => {
                            let left = e.clientX - disX;
                            let top = e.clientY - disY;
                            //移动当前元素
                            drag.style.left = left + 'px';
                            drag.style.top = top + 'px';
                        };
                        document.onmouseup = (e) => {
                            document.onmousemove = null;
                            document.onmouseup = null;
                        };
                    }
                };
            }
        })
        //跟随父级scroll在当前可视窗口内居中
        /**
         * @example: 
         * 
         * 高级使用
         * v-scrollCenter.overflowMain="{scroll:'el-main',offsetParent:'com-flex',top:'80'}"
         * overflowMain 如果相对父级已经超出顶部则这时候相对body来显示
         * scroll：需要滚动的父级
         * offsetParent: 相对父级
         * top :偏移量
         * 
         * 简单使用
         * v-scrollCenter="'page-contenr-com'"
         * page-contenr-com => 滚动的父级
         */
        Vue.directive('scrollCenter', {
            bind (el, binding, vnode) {
                let parent;
                let scroll;
                vnode.context.$nextTick(() => {
                    if (typeof binding.value == 'object') {
                        parent = document.querySelector('.' + binding.value.scroll)
                        scroll = function () {
                            let offsetParent = document.querySelector('.' + binding.value.offsetParent)
                            let parentOffset = util.getElementTop(offsetParent);
                            if (!parentOffset)
                                return false;
                            parentOffset = parent.clientHeight - (parentOffset - (binding.value.top || 0));
                            let elHeight = el.clientHeight / 2;
                            let overHide = util.getElementTop(offsetParent) - parent.scrollTop - (binding.value.top || 0);
                            if (overHide < 0 && binding.modifiers.overflowMain)
                                overHide = Math.abs(overHide) / 2;
                            else
                                overHide = 0;

                            el.style.cssText = `top:${(parentOffset + parent.scrollTop) / 2 - elHeight + overHide}px`
                        }
                    } else {
                        parent = document.querySelector('.' + binding.value);
                        scroll = function (e) {
                            el.style.cssText = `top:${(parent.clientHeight / 2 + parent.scrollTop) - (el.offsetHeight / 2)}px`
                        }
                    }
                    scroll();
                    parent.addEventListener('scroll', util.debounce(200, scroll))
                })
            }
        })

        Vue.filter('emptyRead', (value, afterCompany = '', beforeCompany = '') => {
            let result = ['', null, 0, '无'].every(item => item != value);
            if (!result) {
                return '暂无'
            }
            return beforeCompany + value + afterCompany;
        })

        Vue.filter('defaultImg', (value) => {
            if (value == '' || value == null) {
                return 'https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/3/26/f537f61ed8e6459ba4efb25415c22740.jpg';
            }
            return value;
        })

        Vue.filter('houseMiniImg', (value) => {
            if (value == '' || value == null) {
                return 'https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/3/26/9b122fa0df5946058c5a254fae9b3bfc.png';
            }
            return value;
        })
    }
}
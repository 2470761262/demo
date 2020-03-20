export default {
    install (Vue) {
        /**
         *  指令
         * 
         */
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
         *  过滤器
         * 
         */
        Vue.filter('emptyRead', (value, afterCompany = '', beforeCompany = '') => {
            let result = ['', null, 0, '无'].every(item => item != value);
            if (!result) {
                return '暂无'
            }
            return beforeCompany + value + afterCompany;
        })

        Vue.filter('defaultImg', (value) => {
            if (value == '' || value == null) {
                return 'http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201908/20190811/20190811111530328_34985.jpg?x-oss-process=style/thumb';
            }
            return value;
        })
    }
}

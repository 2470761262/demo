import api from '@/api/require';
import util from '@/util/util'
class tableMenu {
    /**
     * 获取自定义菜单数据
     * @param {Array} defaultList 默认显示的菜单数组
     * @param {Number} type 列表的类型
     */
    static getTableMenu (defaultList, type) {
        return api.post({
            url: `/agentHouse/Table/Menu/list/${type}`,
            headers: { "Content-Type": "application/json;charset=UTF-8" },

        }).then((e) => {
            let result = util.deepCopy(defaultList);//copy一份数组，避免改变原来的数组
            let data = e.data.data;
            if (e.data.code == 200 && data.length > 0) {
                let fieldArray = JSON.parse(data[0].field).list;
                result.forEach(element => {
                    element.default = false;
                    for (let index in fieldArray) {
                        if (fieldArray[index].prop == element.prop) {
                            element.default = true;
                            break;
                        }
                    }
                });
            }
            return result;
        });
    }
    /**
     * 添加自定义菜单
     * @param {Array} filedList  选中的菜单数组
     * @param {Number} type  列表类型
     */
    static insert (filedList, type) {
        let json = {
            list: filedList
        }
        api.post({
            url: `/agentHouse/Table/Menu/insert`,
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            data: {
                field: JSON.stringify(json),
                type: type
            }

        }).then((e) => {
            console.log(e);
        });
    }
}
export default tableMenu;
import api from '@/api/require';
import util from '@/util/util'
class tableMenu {

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
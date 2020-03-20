import api from "@/api/require.js"
export default {
    isChecking (type, replaceType, houseId, memo = "") {
        let that = this;
        let params = {
            houseId: houseId,
            type: type,
            memo: memo
        };
        if (replaceType != 0) {
            params.replaceType = replaceType;
        }
        return api.get({
            url: "/agentHouse/propertyCheck/isChecking",
            data: params,
            headers: { "Content-Type": "application/json;charset=UTF-8" },
        })
            .then(e => {
                if (e.data.code == 200) {
                    return false;
                }
                else {
                    return true;
                }

            })
            .catch(e => {
                return true;
            });
    },

}
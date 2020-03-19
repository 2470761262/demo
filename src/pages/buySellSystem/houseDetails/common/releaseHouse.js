import api from "@/api/require.js"
export default {
    releaseOutsideHouse (params) {
        let that = this;
        that.loading = true;
        return api.post({
            url: "/outsideHouse/releaseOutsideHouse",
            data: params,
            headers: { "Content-Type": "application/json;charset=UTF-8" },
        })
            .then(e => {
                if (e.data.code == 200) {
                    return true;
                }
                else {
                    return false;
                }

            })
            .catch(e => {
                return false;
            });
    },

}
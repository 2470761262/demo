<script>
import otherIframe from '@/pages/buySellSystem/otherIframe/otherIframe';
import rouetTabsArray from './routerTabJs/index';
    export default {
        extends:otherIframe,
        data() {
            return {
                activeParent: "1", //默认显示那个一个块tabs父级菜单
                activeChild: "/customersSystem/allCustomers", //默认显示的路径 tabs路径
                routerTab: rouetTabsArray
            }
        },
    }
</script>


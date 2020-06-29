
<style lang="less" scoped>
.content{
    background:rgba(255,255,255,1);
    border-radius:8px;
    flex: 1;
}
</style>
<template>
    <section class="content">
        <component :is="componentName"></component>
    </section>
</template>

<script>
   //异步组件工厂方法
import componentsFactory from "@/util/componentsFactory";
    export default {
        components:{
            stepOne:()=> componentsFactory( import("./components/stepOne"))
        },
        data() {
            return {
                componentName:"stepOne"
            }
        },
    }
</script>

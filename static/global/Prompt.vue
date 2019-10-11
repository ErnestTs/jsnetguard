<template>
    <div v-show="this.isShowPrompt" class="promptBoard">
        {{this.tips}}, {{this.type}}
    </div>
</template>

<script>
export default {
    data(){
        return {
            isShowPrompt: false,
            tips: "test",
            type: "alert",
        }
    }
}
</script>

<style lang="less" scoped>

.promptBoard {
    background: #000;
    opacity: 0.3;
    z-index: 3;
    position: fixed;
    width: 100vw;
    height: 100vh;
}

</style>
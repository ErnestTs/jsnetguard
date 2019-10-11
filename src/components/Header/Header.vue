<template>
    <div class="header">
        <div class="logo"></div>
        <div class="state">
            <Dropdown width="4.3rem" :list="this.list" />
        </div>
    </div>
</template>

<script>
import Dropdown from '@/components/Dropdown/Dropdown'

export default {
    data () {
        return {
            list: []
        }
    },

    components: {
        Dropdown
    },
    
    beforeMount(){
        this.list = this.$store.getters.getComputerRoomList;
    }
}
</script>

<style scoped>

.header {
    width: 100%;
    background-color: #6d8aee;
    height: 1.62rem;
}

.header span {
    color: #fff;
    font-size: 0.64rem;
    line-height: 1.62rem;
    float: right;
    margin-right: 0.7rem;
}

.logo {
    color: #fff;
    font-size: 0.64rem;
    line-height: 1.62rem;
    float: left;
    margin-left: 1rem;
    margin-top: 0.24rem;
    width: 4.45rem;
    height: 1.14rem;
    background: url("../../../static/logo02.png") no-repeat;
    background-size: contain;
}

.state {
    float: right;
}
</style>

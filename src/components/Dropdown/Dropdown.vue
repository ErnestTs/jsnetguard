<template>
    <div :style="{width: this.width}" class="dropdownBox" @click="showOption">
        <i class="icon"></i><span class="action">{{this.onSeleted}}</span>
        <ul class="options" v-show="this.optionOnShow">
            <li v-for="(item, i) in this.list" :key="i" :value="item.value" @click="changeOption(item)">
                {{item.title}}
            </li>
            <li @click="logout">退出登录</li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        width: {
            type: String
        },
        list: {
            type: Array
        }
    },

    data(){
        return {
            optionOnShow: false,
            onSeleted: "",
            showPrompt: true,
            next: ''
        }
    },

    methods: {
        /**
         * 展示下拉列表
         */
        showOption (){
            this.optionOnShow = !this.optionOnShow;
        },

        /**
         * 切换当前楼层
         * @param {String} [要显示的当前选项]
         */
        changeOption(item){
            this.next = item;
            this.$prompt.show(this, "是否确定要切换机房？", "change");
        },

        /**
         * 登出
         */
        logout(){
            this.$prompt.show(this, "是否确定要退出登录？", "logout");
        }
    },

    mounted (){
        let computerRoom = this.$store.getters.getComputerRoomOnSelected;
        this.onSeleted = computerRoom.title;
    }
}
</script>

<style lang="less" scoped>
i {
    display: inline-block;
}

.icon {
    background: url("../../../static/icon.png") center;
    background-size: cover;
    width: 0.67rem;
    height: 0.86rem;
    vertical-align: middle;
    margin-right: 0.6rem;
}

.dropdownBox {
    font-size: 0.64rem;
    line-height: 1.62rem;
    padding: 0 0.2rem;
    color: #fff;
    position: relative;
}

.action {
    vertical-align: middle
}
.options {
    position: absolute;
    left: 0;
    top: 1.62rem;
    width: 100%;
    background-color: #6d8aee;

    li {
        text-align: center
    }

}
</style>
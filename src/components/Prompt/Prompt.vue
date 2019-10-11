<template>
    <div v-show="this.isShowPrompt" class="promptBoard">
        <div class="mask" @click="hidePrompt"></div>

        <div class="promptBody">
            <p>
                {{this.tips}}
            </p>
            <div v-if="this.type == 'change'" class="inputBox">
                <input type="password" placeholder="请输入登录密码" v-model="password" :class="err" />
            </div>
            <div class="btnGroup">
                <div class="btn yes" @click="clickYes">确定</div>
                <div class="btn no" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isShowPrompt: false,
            tips: "",
            type: "",
            root: {},
            password: "",
            err: ""
        }
    },
    methods: {
        hidePrompt(){
            this.$prompt.hide()
        },
        clickYes(){
            if(this.type == "logout") {
                this.root.$router.push({path: "/login"})
                this.$prompt.hide()
            } else if (this.type == "change") {
                if(this.root.$store.getters.getPassword === this.password){
                    this.root.$store.commit('setComputerRoomOnSelected', this.root.next)
                    this.root.onSeleted = this.root.next.title;
                    this.$prompt.hide();
                }else {
                    this.err = 'error'
                }
            } else {
                this.$prompt.hide()
            }
        },
        cancel(){
            this.$prompt.hide()
        }
    }
}
</script>

<style lang="less" scoped>

.promptBoard {
    z-index: 3;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
}

.mask {
    background: #000;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0.3;
}

.promptBody {
    padding: 2rem 0;
    height: min-content;
    width: 15rem;
    white-space: nowrap;
    background: #fff;
    z-index: 4;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 0.1rem;

    p {
        text-align: center;
    }

    .btnGroup {
        overflow: auto;
        padding-left: 3.5rem;
        margin-top: 1rem;

        .btn {
            float: left;
        }

        .yes {
            width: 4rem;
            background: #6d8aee;
            color: #fff;
            text-align: center;
            border-radius: 0.1rem;
        }
        .no {
            width: 4rem;
            text-align: center;
        }
    }

    .inputBox {
        width: 80%;
        margin: 0 auto;

        input {
            width: 100%;
            height: 1.5rem;
            font-size: 1rem;
            line-height: 1.5rem;
            border: 0.04rem solid #6d8aee;
            margin-top: 1rem;
        }

        .error {
            border: 0.04rem solid red !important;
        }
    }
}

</style>
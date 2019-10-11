<template>
    <div class="loginBox" @resize="setSize" >
        <div class="loginForm">
            <h4 class="title">
                登录到网安中心
            </h4>
            <p>
                Please enter your credentials to proceed.
            </p>

            <ul class="formBody">
                <li>
                    <label for="username">账号
                        <label for="state" class="stateBox">
                            <input type="checkbox" name="state" id="stateCheckBox" v-model="state" />
                            管理员登录
                        </label>
                    </label>
                    <input type="text" name="username" v-model="username" />
                </li>
                <li>
                    <label for="password">密码</label>
                    <input type="password" name="password" v-model="password" />
                </li>
                <li>
                    <label for="engineRoom">选择机房</label>
                    <select name="engineRoom" v-model="computerRoomOnSelected">
                        <option v-for="(item, i) in list" :key="item.value + i" :value="item">{{item.title}}</option>
                    </select>
                </li>
                <li class="validcodeBox">
                    <input type="text" placeholder="请输入验证码" id="validcode" v-model="checkCode" />
                    <img id="code-img" :src="this.validcode" title="点击刷新" @click="getValideCode" />
                </li>
                <li style="padding-top:0.3rem">
                    <div class="liginBtn" @click="login">
                        登录
                    </div>
                </li>
            </ul>
        </div>
        <div class="backgroundBox" :style="{display:this.windowControl}"></div>
        <div :class="'tips ' + tips.type" @click="hideTips">{{tips.val}}</div>
    </div>
</template>

<script>
import Common from "@/Common"
import assets from "@/assets"
import axios from 'axios'

export default {
    data(){
        return {
            username: '',
            password: '',
            windowControl: 'block',
            state: false,
            validcode: "",
            digest: "",
            checkCode: '',
            list: [],
            computerRoomOnSelected: {},
            tips: {
                val:"",
                type: "hide"
            }
        }
    },
    methods:{
        /**
         * 点击登录
         */
        login(){
            if(!this.username || !this.password || !this.computerRoomOnSelected.value){
                this.tips = {
                    val: "请输入完整信息",
                    type: "show"
                }
                setTimeout(() => {
                    this.hideTips()
                }, 2000);
                return
            }else{
                let _this = this;
                let method,sendData;
                if (this.state){
                    method = "Login";
                    sendData = {
                        email: this.username,
                        password: Common.lftPwdRule(this.password, 3, 5),
                        digest: this.digest
                    }
                }else {
                    method = "LoginManager";
                    sendData = {
                        account: this.username,
                        password: Common.lftPwdRule(this.password, 3, 5),
                        digest: this.digest
                    }
                }

                axios({
                    method: 'post',
                    url: assets.url + 'validationCode',
                    data: {
                        email: this.username,
                        phone: "",
                        digest: this.digest,
                        vcode: this.checkCode
                        
                    }
                }).then((checkRes)=>{
                    if(checkRes.data.status !== 0) {
                        _this.tips = {
                            val: "请重新输入验证码",
                            type: "show"
                        }
                        setTimeout(() => {
                            this.hideTips()
                        }, 2000);
                        _this.getValideCode();
                    } else {
                        axios({
                            method: 'post',
                            url: assets.url + method,
                            data: sendData
                        }).then((res)=>{
                            if(res.data.status === 0) {
                                let user = _this.state? res.data.result.userid: _this.username;
                                let val = user + "-" + res.data.result.token;
                                Common.setCookie("token", val);

                                Common.setCookie("userid", res.data.result.userid);

                                _this.$store.commit("savePassword", _this.password);
                                _this.$store.commit("setComputerRoomOnSelected", _this.computerRoomOnSelected);

                                _this.$router.push({path:'/home'});

                            }else if (res.data.status === 1) {
                                _this.tips = {
                                    val: "无效用户",
                                    type: "show"
                                }
                                setTimeout(() => {
                                    this.hideTips()
                                }, 2000);
                                _this.getValideCode();
                            }else {
                                _this.tips = {
                                    val: "登录失败",
                                    type: "show"
                                }
                                setTimeout(() => {
                                    this.hideTips()
                                }, 2000);
                                _this.getValideCode();
                            }
                        })
                    }
                })
            }
        },

        /**
         * 判断横屏是否显示背景图版
         */
        setSize(){
            if(document.body.clientWidth < 500){
                this.windowControl = "none"
            }else {
                this.windowControl = "block"
            }
        },

        /**
         * 获取验证码
         */
        getValideCode(){
            axios({
                method: 'post',
                url: assets.url + 'getValidationCode'
            }).then((res)=>{
                this.validcode = "data:image/png;base64," + res.data.result.base64Str;
				this.digest = res.data.result.digest;
            })
        },

        /**
         * 隐藏提示栏
         */
        hideTips(){
            this.tips = {
                val: "",
                type : 'hide'
            }
        }
    },
    mounted(){
        this.setSize();
        this.getValideCode();
        this.list = this.$store.getters.getComputerRoomList;
        this.computerRoomOnSelected = this.list[0]
    }
}
</script>

<style lang="less" scoped>

.loginBox{
    width: 100vw;
    height: 100%;
    overflow: auto;
    background: #fff;
    
    .loginForm {
        float: left;
        height: 100%;
        width: 12.08rem;
        padding-left: 4.42rem;
        padding-right: 4.5rem;

        .title{
            margin-top: 6.7rem;
            font-size: 1.2rem;
            color: #141f36;
        }

        p {
            line-height: 1.6rem;
            font-size: 0.56rem;
            color: #697f99;
        }

        .formBody {
            margin-top: 1.24rem;

            li {
                margin-bottom: 0.64rem;
            }
            
            label {
                font-size: 0.46rem;
                color: #9fa7c4;
                line-height: 0.96rem;
                display: block;
                text-align: left;
            }

            input,select {
                width: 12rem;
                border:0.04rem solid #d7e0ff;
                border-radius: 0.2rem;
                height: 1.46rem;
                text-indent: 0.6rem;
                font-size: 0.6rem;
                background: #fff;
            }

            .liginBtn {
                width: 12rem;
                border:0.04rem solid #5476eb;
                border-radius: 0.2rem;
                background: #6d8aee;
                text-align: center;
                line-height: 1.8rem;
                font-size: 0.6rem;
                color: #fff;
            }

            .validcodeBox {

                #validcode {
                    width: 8rem;
                    font-size: 0.5rem;
                    vertical-align: middle;
                }

                img {
                    width: 3.5rem;
                    vertical-align: middle;
                }
            }
        }
    }

    .backgroundBox {
        right: 0;
        height: 100%;
        width: 17.4rem;
        background: #6d8aee url("../../../static/loginBackground.png") center no-repeat;
        background-size: contain;
        position: absolute;
    }

    .stateBox {
        vertical-align: middle;
        float: right;
        line-height: 0.96rem;

        #stateCheckBox {
            width: 0.46rem ;
            vertical-align: middle;
            height: 0.96rem;
        }
    }
}

.tips {
    position: fixed;
    top: 0;
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    color: #fff;
    background-color: #eb3f2f;
    font-size: 0.7rem;
}

.show {
    display: block;
}

.hide {
    display:  none;
}

</style>

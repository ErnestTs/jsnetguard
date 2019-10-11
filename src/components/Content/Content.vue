<template>
    <div class="board">
        <ul class="btnList">
            <li 
                :class="active==i?'active selectBtn':'selectBtn'" 
                v-for="(item,i) in buttonList" :key="i+item.key"
                @click="getList(item.value, i)"
            >{{item.title}}</li>
        </ul>
        <ul class="tableBoard">
            
            <li class="tableItem" v-for="(item, i) in visitorList" :key="i + item.company" >
                <p class="title">{{item.company}}</p>
                <ul class="card">
                    <li class="visitorInfoList" v-for="(subItem, i) in  item.visitorList" :key="subItem.vid+`${i}`">
                        <div class="photo" :style="{backgroundImage: 'url(' + subItem.vphoto + ')', backgroundSize:'contain'}"></div>

                        <ul class="visitorInfo">
                            <li class="visitorName">
                                {{subItem.vname}}
                                <div 
                                    :class="subItem.stateFlag + ' state'"
                                >
                                    {{subItem.stateText}}
                                </div>
                            </li>
                            <li class="respondents">
                                被访人：{{subItem.empName}}
                            </li>
                            <li>
                                {{subItem.visitType}}
                            </li>
                            <li>
                                手机：{{subItem.vphone}}
                            </li>
                        </ul>

                        <ul class="visitorTime">
                            <li>
                                前台签到时间：{{subItem.visitdate}}
                            </li>
                            <li>
                                最后经过时间：{{subItem.maxTime}}
                            </li>
                            <li>
                                首次进入时间：{{subItem.minTime}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>

        </ul>
    </div>
</template>

<script>
import Common from "@/Common"
import assets from "@/assets"
import axios from 'axios'

export default {
    data () {
        return {
            buttonList: [
                {
                    title: '今日访客',
                    key: 'today',
                    value: 0
                },
                {
                    title: '近三日访客',
                    key: 'threeDay',
                    value: 2
                },
                {
                    title: '近一周访客',
                    key: 'week',
                    value: 6
                }
            ],
            range: 0,
            visitorList: [],
            active: 0
        }
    },

    computed: {
        onSelectedRoom(){
            return this.$store.state.computerRoomOnSelected
        }
    },

    watch: {
        /**
         * 设置监听当前列表
         */
        onSelectedRoom(newVal){
            this.getList();
        }
    },

    methods: {
        getList(from, index){
            if(from !== undefined) {
                this.range = from
            }
            if(index !== undefined) {
                this.active = index
            }
            axios({
                method: "POST",
                url: assets.url + 'SearchVisitByCondition',
                data: {
                    date: new Date(new Date()-24*60*60*1000*this.range).format("yyyy-MM-dd"),
                    endDate: new Date().format("yyyy-MM-dd"),
                    userid: Common.getCookie("userid"),
                    area: this.onSelectedRoom.value
                },
                headers: {
                    'X-COOLVISIT-TOKEN': Common.getCookie("token")
                }
            }).then((res)=>{
                let list = res.data.result;
                let resList = []
                
                /**
                 * 处理数据，将访客根据公司作区分
                 */
                list.map((item, i)=>{
                    if(item.leaveTime != null){
                        item.stateFlag = "haveLeft"
                        item.stateText = "已离开"
                    }else if(item.permission == 1){
                        item.stateFlag = "authorized"
                        item.stateText = "已授权"
                    }else {
                        item.stateFlag = "unauthorized"
                        item.stateText = "未授权"
                    }
                    let companyItem = resList.find((resItem, i)=>{
                        return resItem.company == item.vcompany || resItem.company == item.company
                    })

                    let visitdate = !!item.visitdate?item.visitdate:"";     // 签到时间
                    let minTime = !!item.minTime?item.minTime:"";         // 首次进入
                    let maxTime = !!item.maxTime?item.maxTime:"";         // 最后经过
                    item.visitdate = !!item.visitdate?new Date(visitdate).format("yyyy-MM-dd hh:mm"): "";
                    item.minTime = !!item.minTime?new Date(minTime).format("yyyy-MM-dd hh:mm"):"";
                    item.maxTime = !!item.maxTime?new Date(maxTime).format("yyyy-MM-dd hh:mm"):"";

                    if(companyItem === undefined) {
                        resList.push({
                            company: item.vcompany,
                            visitorList:[item]
                        })
                    }else {
                        companyItem.visitorList.push(item);
                    }
                })
                this.visitorList = resList;
                document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
            })
        }
    },

    beforeMount(){
        if(!this.$store.getters.getPassword){
            Common.delCookie('token');
            this.$router.push({path:'/login'});
        }

        /**
         * 获取列表数据
         */
        this.getList();
    },

    mounted(){
        /**
         * 设置刷新
         */
        setInterval(()=>{
            this.getList();
        },1000*60*2)
    }
    
}
</script>

<style lang="less" scoped>
#app {
    background: #f7f7f7;
}
.board{
    padding: 1.1rem 2.1rem;

    .btnList {
        overflow: auto;
        margin-bottom: 1.1rem;
    }
}

.selectBtn {
    height: 1.4rem;
    width: 3.44rem;
    margin-right: 0.36rem;
    border: 0.06rem solid #d9d9d9;
    font-size: 0.6rem;
    line-height: 1.4rem;
    text-align: center;
    float: left;
    border-radius: 0.1rem;
    background: #fff;
}

.active {
    border: 0.06rem solid #6d8aee;
}

.tableBoard {
    width: 100%;

    .tableItem {
        width: 100%;
        margin-top: 0.9rem;

        .card {
            padding: 0 0.95rem;
            background-color: #fff;
            width: 100%;
            overflow: auto;
            box-sizing: border-box;

            .visitorInfoList {
                padding: 0.8rem 0;
                border-bottom: #7b7b7b solid 0.04rem;
            }

            .visitorInfoList:last-of-type {
                border-bottom: none;
            }

            li {
                font-size: 0.7rem;
                line-height: 1.1rem;
                color: #7b7b7b;
                overflow: auto;

                .photo {
                    width: 5rem;
                    height: 5rem;
                    background: #6d8aee;
                    margin-right: 1rem;
                }
                .photo, ul {
                    float: left;
                }

                .visitorTime {
                    width: 50%;
                    float: right;
                    text-align: left;
                }

                .visitorInfo {
                    .visitorName {
                        color: #494d66;
                        overflow: auto;

                        .state {
                            float: right;
                            width: 2rem;
                            height: 0.8rem;
                            background: #6d8aee;
                            color: whitesmoke;
                            border-radius: 0.1rem;
                            text-align: center;
                            line-height: 0.82rem;
                            margin-top: 0.2rem;
                            font-size: 0.46rem;
                        }

                        .haveLeft {
                            content: "已离开";
                            background: linear-gradient(#b2b0b0, #9c9b9b)
                        }

                        .authorized {
                            content: "已离开";
                            background: #50d860
                        }

                        .unauthorized {
                            content: "已离开";
                            background: linear-gradient(#ff898b, #f6676a)
                        }
                    }
                }
            }
        }

        .title {
            font-size: 0.5rem;
            line-height: 1.1rem;
            border-bottom: 0.2rem solid rgb(118, 138, 234);
        }
    }
}
</style>

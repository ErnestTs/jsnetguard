import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    password: '',
    isLogin: false,
    computerRoomList:[
        {
            title: "二楼机房",
            value: "2楼"
        },
        {
            title: "三楼机房",
            value: "3楼"
        }
    ],
    computerRoomOnSelected: {
        title: "二楼机房",
        value: "2楼"
    }
}

const mutations = {
    savePassword(state, password) {
        return (state.password = password)
    },
    checkPassword(state, inputVal) {
        return (state.password === inputVal)
    },
    saveLoginState (state) {
        return state.isLogin = true
    },
    setComputerRoomOnSelected (state, val) {
        return state.computerRoomOnSelected = val
    }
}

const getters = {
    getPassword(state) {
        return state.password
    },
    getState (state) {
        return state.isLogin
    },
    getComputerRoomList (state) {
        return state.computerRoomList
    },
    getComputerRoomOnSelected (state) {
        return state.computerRoomOnSelected
    },

}

export default new Vuex.Store({
    state,
    mutations,
    getters
})
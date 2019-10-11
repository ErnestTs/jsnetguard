import Vue from 'vue'
import PromptVue from "./Prompt.vue"

const Prompt = {};

let showPrompt = false      // 当前Prompt状态
let promptNode = null       // 当前Prompt节点

const PromptComponent = Vue.extend(PromptVue)

Prompt.install = function (Vue, options) {
    var opt = {

    }

    // 获取参数
    for(var prop in options) {
        opt[prop] = options[prop]
    }

    Vue.prototype.$prompt = function ( tips, onShow, type ) {
        if (onShow === 'hide') {
            promptNode.isShowPrompt = showPrompt = false
        } else {
            // 如果弹窗已经显示 则不执行
            if ( showPrompt ) {
                return;
            }

            promptNode = new PromptComponent({
                data: {
                    isShowPrompt: showPrompt,
                    tips: tips,
                    type: type,
                }
            })

            // 挂载实例
            promptNode.$mount();
            document.body.appendChild(promptNode.$el);

            promptNode.isShowPrompt = showPrompt = true
        }
    }
    
    var stateArr = ['show', 'hide'];
    stateArr.forEach(function (onShow) {
        Vue.prototype.$prompt[onShow] = function (tips, type) {
        return Vue.prototype.$prompt(tips, onShow, type)
        }
    })
}

export default Prompt;
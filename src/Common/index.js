import Base64Code from './base64';
const common = {}

/**
 * 设置cookie
 */
common.setCookie = function setCookie (name, value){
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + '='+ escape (value) + ';expires=' + exp.toGMTString();
}

/**
 * 获取cookie
 */
common.getCookie = function (name) {
    var arr,reg=new RegExp('(^| )'+name+'=([^;]*)(;|$)');
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    } else {
        return null;
    }
}

/**
 * 删除cookie
 */
common.delCookie = function (name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=common.getCookie(name);
    if(cval!=null) {
        document.cookie= name + '='+cval+';expires='+exp.toGMTString();
    }
}

/**
 * 随机字符串 用于加密密码
 */
common.randomString = function(e) {
    e = e || 32;
    var a = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        n = a.length,
        s = "";
    for (let i = 0; i < e; i++) s += a.charAt(Math.floor(Math.random() * n));
    return s
}
common.codeEnBase = function(str) {
    var enstr = Base64Code.encode(str);
    return enstr;
}

/**
 * 加密密码
 */
common.lftPwdRule = function (e, a, n) {
    var s = e.split("");
    s.splice(a, 0, common.randomString(5));
    var t = s.join("").split("").reverse(),
        o = common.codeEnBase(t.join("")).split("");
    return o.splice(n, 0, common.randomString(5)), o.join("");
}

export default common
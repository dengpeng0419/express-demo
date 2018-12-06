//读取cookie的值
function getCookie(name) {//获取指定名称的cookie的值
    let arr;
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//设置cookie的值
function setCookie(name, value, days) {
    let d = new Date();
    let tdays = days || 1;
    d.setTime(d.getTime() + (tdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + escape(value) + "; " + expires;
    console.log(document.cookie);
}

//删除cookies
function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if(cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

module.exports = {
    getCookie,
    setCookie,
    delCookie
}

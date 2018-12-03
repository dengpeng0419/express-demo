<template>
    <div class="page-login">
        <div class="title">梦奇系统<span class="vice-title">欢迎登录</span></div>
        <div class="content" :style="{'backgroud-color': backgroudColor}">
            <div class="mq-logo">
                <div class="mq"></div>
            </div>
            <div class="login-form">
                <div class="login-tab">用户登录</div>
                <div class="login-remind">{{remindWords}}</div>
                <div class="form-name">
                    <label for="loginname" class="login-label"></label>
                    <input id="loginname" class="name-input" :value="nameValue" @input="nameInput" placeholder="邮箱/用户名/已验证手机">
                </div>
                <div class="form-secret">
                    <label for="secret" class="secret-label"></label>
                    <input id="secret" type="password" class="secret-input" :value="secretValue" @input="secretInput" placeholder="密码">
                </div>
                <div class="forget">忘记密码</div>
                <div class="submit" @click="submit">登 录</div>
                <div class="register">
                    <div class="other-icon">
                        <a class="pdl"><b class="QQ-icon"></b><span>QQ</span></a>
                        <span class="line">|</span>
                        <a class="pdl"><b class="weixin-icon"></b><span>微信</span></a>
                    </div>
                    <div class="regist-link">立即注册</div>
                </div>
            </div>
        </div>
        <div class="footer">Copyright © 2004-2018  京东金融JDJR.com 版权所有</div>
    </div>
</template>

<script>
    const md5 = require('js-md5');

	export default {
		name: "login",
        data() {
		    return {
                nameValue: '',
                secretValue: '',
                remindWords: '',
                backgroudColor: 'lightseagreen'
            }
        },
        mounted() {

        },
        methods: {
            nameInput(e) {
                this.nameValue = e.target.value || '';
                //console.log(this.nameValue)
            },
            secretInput(e) {
                this.secretValue = e.target.value || '';
            },
            submit() {
                if(!this.nameValue) {
                    this.remindWords = '用户名不能为空！';
                    return;
                }
                if(!this.secretValue) {
                    this.remindWords = '密码不能为空！';
                    return;
                }
                sessionStorage.setItem('pin', this.nameValue);
                this.$post({
                    url: '/api/login/login',
                    data: {
                        //name: this.nameValue,
                        pwd: md5(this.nameValue + this.secretValue)
                    },
                    success: json => {
                        if (json.resultCode === 0) {
                            let data = json.resultData || {};
                            if(data.notFound) {
                                this.remindWords = '该用户不存在！';
                                return;
                            }
                            if(data.secretError) {
                                this.remindWords = '用户名或者密码错误！';
                            } else {
                                sessionStorage.setItem('tk', data.token);
                                this.$router.push({
                                    name: 'UserMenu'
                                })
                            }
                        }
                    },
                    error: err => {
                        this.remindWords = '系统繁忙，请稍后再试'
                    }
                })
            }
        }
	}
</script>

<style>
    body {
        margin: 0;
    }
    .page-login {
        position:relative;
        height:100vh;
        width:100%;
    }
    .title {
        height: 70px;
        margin-left: 230px;
        font-size: 32px;
        line-height: 70px;
    }
    .vice-title {
        font-size: 20px;
        color: #333;
        margin-left: 20px;
    }
    .content {
        position: relative;
        width: 100%;
        height: 480px;
        background-color: lightseagreen;
    }
    .mq-logo {
        position: relative;
        float: left;
        left: 280px;
        top: 66px;
        width: 320px;
        height: 320px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        //overflow: hidden;
    }
    .mq {
        width: 300px;
        height: 300px;
        margin-left: -45px;
        margin-top: -10px;
        background-image: url("../assets/mq.png");
        -webkit-background-size: cover;
        background-size: cover;
    }
    .login-form {
        float: right;
        right: 240px;
        top: 50px;
        position: relative;
        z-index: 4;
        background: #fff;
        overflow: visible;
        width: 346px;
        height: 360px;
        display: flex;
        flex-direction: column;
    }
    .login-tab {
        width: 100%;
        height: 54px;
        line-height: 54px;
        font-size: 18px;
        font-family: "microsoft yahei";
        text-align: center;
        border-bottom: 1px solid #eee;
        background: #fff;
        color: lightseagreen;
    }
    .login-remind {
        margin-top: 10px;
        margin-left: 32px;
        height: 20px;
        color: #f00;
        font-size: 12px;
    }
    input {
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        outline: none;
        padding: 0 10px;
    }
    .form-name {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .form-secret {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .login-label {
        z-index: 3;
        width: 38px;
        height: 38px;
        border: 1px solid #bbb;
        background: url(//misc.360buyimg.com/user/passport/1.0.0/widget/login-form-2018-0827/i/pwd-icons-new.png) no-repeat;
    }
    .name-input {
        z-index: 3;
        width: 220px;
        height: 38px;
        border: 1px solid #bbb;
        margin-left: -1px;
    }
    .secret-label {
         z-index: 3;
         width: 38px;
         height: 38px;
         border: 1px solid #bbb;
         background: url(//misc.360buyimg.com/user/passport/1.0.0/widget/login-form-2018-0827/i/pwd-icons-new.png) no-repeat;
         background-position: -48px 0;
     }
    .secret-input {
        z-index: 3;
        width: 220px;
        height: 38px;
        border: 1px solid #bbb;
        margin-left: -1px;
    }
    .forget {
        margin-top: 20px;
        padding-right: 38px;
        font-size: 12px;
        text-align: right;
        color: #666;
    }
    .submit {
        margin-top: 20px;
        margin-left: 36px;
        background-color: lightseagreen;
        color: #fff;
        height: 32px;
        width: 280px;
        text-align: center;
        line-height: 32px;
    }
    .register {
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        padding-left: 40px;
        padding-right: 20px;
        line-height: 55px;
        border-top: 1px solid #f4f4f4;
        width: 100%;
        height: 55px;
        background-color: #fcfcfc;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    a {
        text-decoration: none;
        out-line: nonecolor;
        color: #666;
    }
    .pdl {
        display: inline-block;
        position: relative;
        padding-left: 24px;
    }
    .other-icon {
    }
    .QQ-icon {
        width: 19px;
        height: 18px;
        display: block;
        background: url(//misc.360buyimg.com/user/passport/1.0.0/widget/login-form-2018-0827/i/QQ-weixin.png) no-repeat;
        margin: 0 auto;
        position: absolute;
        float: left;
        left: 0;
        top: 16px;
    }
    .line {
        color: #ccc;
        padding: 0 6px;
    }
    .weixin-icon {
        width: 19px;
        height: 18px;
        display: block;
        background: url(//misc.360buyimg.com/user/passport/1.0.0/widget/login-form-2018-0827/i/QQ-weixin.png) no-repeat;
        margin: 0 auto;
        position: absolute;
        float: left;
        left: 0;
        top: 16px;
        background-position: -20px 0;
    }
    .regist-link {
        color: lightseagreen;
    }
    .footer {
        font-size: 14px;
        margin-top: 30px;
        text-align: center;
        color: #999;
    }
    @media screen and (max-width: 1200px) {
        .mq-logo {
            display: none;
        }
    }
</style>

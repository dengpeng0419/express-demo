<template>
    <div class="page-usermenu">
        <h1>用户列表</h1>
        <div class="model-control">
            <input type="text" class="nameValue" placeholder="输入用户名" v-model="inputName"/>
            <div v-if="add" class="user-add" @click="addUser">添加</div>
            <div class="user-add" @click="findUser">查询</div>
            <div class="user-add" @click="updatePage">刷新</div>
            <div class="user-add" @click="logout">注销</div>
        </div>
        <table>
            <tr>
                <td>编号</td>
                <td>用户id</td>
                <td>用户名</td>
                <td>角色</td>
                <td>创建时间</td>
                <td v-if="del">操作</td>
            </tr>
            <tr v-for="(item, index) in userList">
                <td>{{index + 1}}</td>
                <td>{{item._id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.role === 1 ? 'admin' : 'guest'}}</td>
                <td>{{item.createTime}}</td>
                <td v-if="del" style="color: #f00;" @click="deleteUser(item.name)"><span v-if="index">x</span></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import Cookie from '../utils/cookie';

    export default {
        name: 'usermenu',
        data() {
            return {
                del: false,
                add: false,
                userList: [],
                inputName: '',
            }
        },
        mounted() {
            this.initPage();
        },
        methods: {
            initPage() {
                this.$post({
                    url:'/api/userlist/init',
                    success: (data) => {
                        if(data.resultCode === 0) {
                            this.del = data.resultData.delete;
                            this.add = data.resultData.add;
                            this.userList = data.resultData.list;
                        }
                    },
                    error: err => {
                        this.$router.replace({
                            name: 'Login'
                        });
                    }
                })
            },
            addUser() {
                if(!this.inputName) {
                    alert('用户名不能为空！');
                    return;
                }
                this.$post({
                    url: '/api/userlist/addUser',
                    data: {
                        name: this.inputName
                    },
                    success: data => {
                        if (data.resultCode === 0) {
                            if(data.resultMsg.code ===1 ) {
                                alert('该用户已存在！');
                            } else {
                                this.initPage();
                            }
                        }
                    }
                })
            },
            findUser() {
                if(!this.inputName) {
                    alert('用户名不能为空！');
                    return;
                }
                this.updateUser(this.inputName);
            },
            updateUser() {
                this.$post({
                    url:'/api/userlist/query',
                    data:{
                        name:this.inputName,
                    },
                    success: (data) => {
                        if(data.resultCode === 0) {
                            this.del = data.resultData.delete;
                            this.add = data.resultData.add;
                            this.userList = data.resultData.list;
                        }
                    },
                    error: err => {

                    }
                })
            },
            deleteUser(name) {
                const ensure = confirm("是否要删除用户"+name+"？")
                if (ensure) {
                    this.$post({
                        url:'/api/userlist/deleteUser',
                        data:{
                            name:name,
                        },
                        success: (data) => {
                            if(data.resultCode === 0) {
                                this.initPage();
                            }
                        },
                        error: err => {

                        }
                    })
                }
            },
            updatePage() {
                this.initPage();
            },
            logout() {
                this.$post({
                    url: '/api/logout',
                    data: {
                        name: this.userName
                    },
                    success: json => {
                        if (json.resultCode === 0) {
                            Cookie.delCookie('pin');
                            Cookie.delCookie('tk');
                            // sessionStorage.removeItem('pin');
                            // sessionStorage.removeItem('tk');
                            this.$router.push({
                                name: 'login'
                            })
                        }
                    }
                })
            }
        }
    }
</script>

<style>
    .page-usermenu {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    table,table tr th, table tr td {
        border: 1px solid #ccc;
    }
    table {
        min-height: 25px;
        line-height: 25px;
        text-align: center;
        border-collapse: collapse;
    }
    td {
       padding-left: 15px;
       padding-right: 15px;
    }
    .nameValue {
        height: 30px;
        width: 180px;
        border: 1px solid #ccc;
        float: left;
        zoom: 1;
        outline: medium;
        text-align: center;
    }
    .model-control {
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }
    .user-add {
        margin-left: 30px;
        margin-right: 10px;
        color: blue;
        line-height: 30px;
    }
</style>

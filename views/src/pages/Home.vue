<template>
    <div class="home-frame">
        <div class="top-frame">
            <div class="home-title" :style="{'background-color': backgroudColor}">LOGO</div>
            <div class="top-menu">
                <div class="main-menu">
                    <el-menu mode="horizontal" :text-color="backgroudColor" @select="handleSelect"
                             :active-text-color="backgroudColor">
                        <el-menu-item index="1" class="menu-item">菜单一</el-menu-item>
                        <el-submenu index="2" class="submenu-item">
                            <template slot="title">菜单二</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                            <el-submenu index="2-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="2-4-1">选项1</el-menu-item>
                                <el-menu-item index="2-4-2">选项2</el-menu-item>
                                <el-menu-item index="2-4-3">选项3</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="3" disabled>菜单三</el-menu-item>
                    </el-menu>
                </div>
                <div class="other-menu">
                    <div class="change-color">
                        <el-switch
                            v-model="switchOpen"
                            active-color="darkorange"
                            inactive-color="lightseagreen"
                            @change="changeColor">
                        </el-switch>
                    </div>
                    <div class="logout" @click="$router.push({name: 'login'})">注销</div>
                </div>
            </div>
        </div>
        <div class="bottom-frame">
            <div class="left-frame">
                <el-menu default-active="1" class="el-menu-left" @open="handleOpen" @close="handleClose" @select="handleSelect"
                         background-color="#545c64" text-color="#fff" :active-text-color="backgroudColor">
                    <el-menu-item index="1">
                        <i class="el-icon-location left-item-left"></i>
                        <span slot="title" class="left-item-right">导航一</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-menu left-item-left"></i>
                        <span slot="title" class="left-item-right">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document left-item-left"></i>
                        <span slot="title" class="left-item-right">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting left-item-left"></i>
                        <span slot="title" class="left-item-right">导航四</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="right-frame">
                <nav1 v-show="activeNav === '1'"></nav1>
                <nav2 v-show="activeNav === '2'"></nav2>
                <nav4 v-show="activeNav === '4'"></nav4>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import Nav1 from './Nav1';
    import Nav2 from './Nav2';
    import Nav4 from './Nav4';
    import Cookie from '../utils/cookie';

    export default {
		name: "home",
        components: {
            Nav1,
            Nav2,
            Nav4,
        },
        data() {
            return {
                activeNav: '1',
                activeIndex2: '1',
                switchOpen: true,
            };
        },
        computed: mapState({
            backgroudColor: state => state.home.backgroudColor
        }),
        mounted() {
            console.log(Cookie.getCookie('_ga'));
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeNav = key;
                console.log(key, keyPath);
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            changeColor() {
                if(this.switchOpen) {
                    this.$store.dispatch('home/setBackgroundColor', 'lightseagreen');
                } else {
                    this.$store.dispatch('home/setBackgroundColor', 'darkorange');
                }
            }
        }
	}
</script>

<style>
    .home-frame {
        position:relative;
        height:100vh;
        width:100%;
        display: flex;
        flex-direction: column;
        background-color: #eee;
    }
    .top-frame {
        box-sizing: border-box;
        width:100%;
        height: 66px;
        display: flex;
        border-bottom: 1px #eee solid;
        background-color: #fff;
    }
    .home-title {
        width: 200px;
        height: 66px;
        line-height: 66px;
        text-align: center;
        color: #fff;
        font-size: 30px;
        font-weight: bold;
    }
    .top-menu {
        flex: 1;
        position:relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .other-menu {
        display: flex;
    }
    .change-color {
        height: 66px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 40px;
    }
    .logout {
        height: 66px;
        line-height: 66px;
        margin-right: 40px;
    }

    .menu-item {
        height: 100%;
        line-height: 66px;
    }

    /*总菜单栏下划线*/
    .el-menu.el-menu--horizontal {
        border: none;
    }
    /*单个菜单选中时下划线*/
    .el-menu--horizontal>.el-menu-item, .el-menu--horizontal>.el-menu-item.is-active{
        border: none !important;
    }
    .el-submenu__title {
        border: none !important;
    }

    .bottom-frame {
        flex: 1;
        display: flex;
    }
    .left-frame {
        width: 200px;
        height: 100%;
    }
    .el-menu-left {
        height: 100%;
    }
    .left-item-right {
        margin-right: 30px;
    }
    .left-item-left {
        margin-left: 20px;
    }

    .right-frame {
        margin: 10px;
        background-color: #fff;
        flex: 1;
    }
</style>

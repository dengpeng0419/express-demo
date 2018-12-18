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
                <el-menu :default-active="activeNav" class="el-menu-left" @open="handleOpen" @close="handleClose" @select="handleSelect"
                         background-color="#545c64" text-color="#fff" :active-text-color="backgroudColor">
                    <el-menu-item index="1">
                        <i class="el-icon-location left-item-left"></i>
                        <span slot="title">
                            <router-link tag="span" to="/home">{{navTitle[0]}}</router-link>
                        </span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu left-item-left"></i>
                            <span>{{navTitle[1]}}</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title" class="hide"></template>
                            <el-menu-item index="1-1" class="left-group-left">
                                <router-link tag="div" to="/home/addArticle">{{navTitle[2]}}</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2" class="left-group-left">
                                <router-link tag="div" to="/home/pageList">{{navTitle[3]}}</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-3" class="left-group-left">
                                <router-link tag="div" to="/home/editArticle">{{navTitle[4]}}</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-document left-item-left"></i>
                        <span slot="title">{{navTitle[5]}}</span>
                    </el-menu-item>
                    <el-menu-item index="4" disabled>
                        <i class="el-icon-setting left-item-left"></i>
                        <span slot="title">{{navTitle[6]}}</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="right-frame">
                <div class="content-title">{{curTitle}}</div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import AddArticle from './AddArticle';
    import TotalData from './TotalData';
    import PageList from './PageList';
    import EditArticle from './EditArticle';
    import Cookie from '../utils/cookie';

    export default {
		name: "home",
        components: {
            AddArticle,
            TotalData,
            PageList,
            EditArticle,
        },
        data() {
            return {
                activeNav: '1',
                activeIndex2: '1',
                switchOpen: true,
                navTitle: ['主页','页面管理','新建页面','页面列表','修改页面','用户列表','导航']
            };
        },
        computed: {
		    curTitle: function () {
                this.$store.dispatch('home/recordChosenNar', this.activeNav);
		        switch(this.activeNav) {
                    case '1': return this.navTitle[0]; break;
                    case '2': return this.navTitle[1]; break;
                    case '1-1': return this.navTitle[2]; break;
                    case '1-2': return this.navTitle[3]; break;
                    case '1-3': return this.navTitle[4]; break;
                    case '3': return this.navTitle[5]; break;
                    case '4': return this.navTitle[6]; break;
                    default: return ''; break;
                }
            },
		    ...mapState({
                backgroudColor: state => state.home.backgroudColor,
                settingNar: state => state.home.settingNar,
            })
        },
        created() {
            window.addEventListener("beforeunload", ()=>{
                console.log('c', JSON.stringify(this.$store.state.home))
                localStorage.setItem("settingMsg", JSON.stringify(this.$store.state.home));
            })
        },
        mounted() {
            console.log(Cookie.getCookie('_ga'));
            if(localStorage.getItem("settingMsg") && localStorage.getItem("settingMsg") != '{}') {
                const settings = JSON.parse(localStorage.getItem("settingMsg"));
                this.activeNav = settings.settingNar;
                this.backgroundColor = settings.backgroundColor;
                this.initSetting(settings);
            }
        },
        methods: {
		    initSetting(settings) {
                this.$store.dispatch('home/recordChosenNar', settings.settingNar);
                this.$store.dispatch('home/setBackgroundColor', settings.backgroudColor);
            },
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
        },
	}
</script>

<style>
    .home-frame {
        position:relative;
        height:100vh;
        width:100%;
        display: flex;
        flex-direction: column;
        background-color: #eef1f5;
    }
    .top-frame {
        box-sizing: border-box;
        width:100%;
        height: 60px;
        display: flex;
        border-bottom: 1px #eee solid;
        background-color: #fff;
    }
    .home-title {
        width: 200px;
        height: 60px;
        line-height: 60px;
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
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 40px;
    }
    .logout {
        height: 60px;
        line-height: 60px;
        margin-right: 40px;
    }

    .menu-item {
        height: 100%;
        line-height: 60px;
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
        box-sizing: content-box;
    }
    .el-menu-left {
        box-sizing: content-box;
        width: 100%;
        height: 100%;
    }
    .left-item-left {
        margin-left: 20px;
    }
    .left-group-left {
        padding-left: 60px !important;
    }
    /* 菜单下小分组 */
    .el-menu-item-group__title {
        display: none !important;
    }

    .right-frame {
        background-color: #eef1f5;
        flex: 1;
        overflow :auto;
    }

    .content-title {
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        margin: 15px;
        padding-left: 15px;
        font-size: 14px;
        color: #666;
        font-weight: bold;
    }

</style>

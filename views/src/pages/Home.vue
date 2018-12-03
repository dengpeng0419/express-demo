<template>
    <div class="home-frame">
        <div class="top-frame">
            <div class="title" :style="{'background-color': backgroudColor}">LOGO</div>
            <div class="top-menu">
                <div class="main-menu">
                    <el-menu mode="horizontal" :text-color="backgroudColor" @select="handleSelect">
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
                        <el-menu-item index="4" class="menu-item">菜单四</el-menu-item>
                    </el-menu>
                </div>
                <div class="other-menu">
                    <div class="change-color">
                        <el-switch
                            v-model="switchOpen"
                            active-color="orangered"
                            inactive-color="lightseagreen"
                            @change="changeColor">
                        </el-switch>
                    </div>
                    <div class="logout">注销</div>
                </div>
            </div>
        </div>
        <div class="left-frame">
            <el-menu default-active="1" class="el-menu-left" @open="handleOpen" @close="handleClose"
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
    </div>
</template>

<script>
	export default {
		name: "home",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                switchOpen: true,
                backgroudColor: 'lightseagreen'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
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
                    this.backgroudColor = 'lightseagreen';
                } else {
                    this.backgroudColor = 'orangered';
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
    }
    .top-frame {
        box-sizing: border-box;
        width:100%;
        height: 66px;
        display: flex;
        border-bottom: 1px #eee solid;
    }
    .title {
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
        width: 200px;
        height: 66px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .logout {
        width: 100px;
        height: 66px;
        line-height: 66px;
    }

    .menu-item {
        height: 100%;
        line-height: 66px;
    }
    .menu-item .el-submenu__title {
        height: 100%;
        line-height: 66px;
    }
    .el-menu-item.is-active {
        color: #000;
    }
    .submenu-item .el-submenu__title {
        height: 100%;
        line-height: 66px;
        padding-right: 40px;
    }
    .el-menu.el-menu--horizontal {
        border: none;
    }

    .left-frame {
        width: 200px;
        flex: 1;
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
</style>

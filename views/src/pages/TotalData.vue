<template>
    <div class="total">
        <div class="card-list">
            <div v-for="(item, index) of list" class="color-card">
                <div class="title">{{item.title}}</div>
                <div class="desc">{{item.desc}}</div>
                <div class="subdesc">{{item.subdesc}}</div>
            </div>
        </div>
        <div class="chart-list">
            <div v-for="item of charts" class="chart-shape">
                <v-chart :options="item.polar"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import ECharts from 'vue-echarts/components/ECharts';

    import 'echarts/lib/chart/line'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/polar'
    import 'echarts/lib/component/title'

    Vue.component('v-chart', ECharts);
    export default {
        name: 'Nav1',
        data() {
            return {
                list: [{
                    color: 'red',
                    title: 'data1',
                    desc: 111,
                    subdesc: 'desc1'
                },{
                    color: 'red',
                    title: 'data2',
                    desc: 222,
                    subdesc: 'desc2'
                },{
                    color: 'red',
                    title: 'data3',
                    desc: 333,
                    subdesc: 'desc3'
                },{
                    color: 'red',
                    title: 'data4',
                    desc: 444,
                    subdesc: 'desc4'
                }],
                charts: [{
                    polar: {
                        title : {
                            top: 40,
                            text: '某站点用户访问来源',
                            subtext: '纯属虚构',
                            x:'center'
                        },
                        width: '400px',
                        height: '240px',
                        color: 'lightseagreen',
                        grid:{
                            x:100,
                            y:100,
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        },
                        yAxis: {
                            type: 'value',
                            splitLine:{show: false},//去除网格线
                        },
                        series: [
                            {
                                name: 'line',
                                type: 'line',
                                areaStyle: {},
                                showSymbol: false,
                                data: [300, 344, 366, 500, 460, 500, 600, 555, 820, 932, 901, 934, 1290, 1330, 1320],
                            }
                        ],
                        animationDuration: 800
                    }
                },{
                    polar: {
                        title : {
                            top: 40,
                            text: '某站点用户访问来源',
                            subtext: '纯属虚构',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                        },
                        series : [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:335, name:'直接访问'},
                                    {value:310, name:'邮件营销'},
                                    {value:234, name:'联盟广告'},
                                    {value:135, name:'视频广告'},
                                    {value:1548, name:'搜索引擎'}
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    }
                }],
            };
        },
        components: {
            'v-chart': ECharts
        },
        created() {
            // this.pageId = this.$route.params.pageId;
            // this.getPageDetail();
        },
        mounted() {
            //this.handleChart();
        },
        methods: {
            handleChart() {
                const dom = document.getElementById('chart');
                let myChart = ECharts.init(dom);
                let option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            },
            //获取数据
            // getPageDetail(){
            //     ajax({
            //         url: `${ENV_API}pages/pageDetail`,
            //         method: 'get',
            //         data: {
            //             '_id': this.pageId
            //         }
            //     }).then(resData => {
            //         //保存原始数据
            //         this.originData = resData.pages;
            //         //处理初始数据
            //         this.handleInitData(resData.pages);
            //     }).catch(error => {
            //         this.hideLoading();
            //     });
            // },
            //处理初始数据
            // handleInitData(data) {
            //     this.formData.pageCode = data.pageCode;
            //     this.formData.desc = data.desc;
            //     this.$refs['editPageContent'].editor.setValue(data.tmpData);
            //     this.$refs['editPageContent'].editor.moveCursorTo(0, 0);//移动光标至第0行，第0列
            //     this.$refs['editPageData'].editor.setValue(data.jsonData);
            //     this.$refs['editPageData'].editor.moveCursorTo(0, 0);
            // },
            //提交修改
            saveEdit(editForm) {
                this.$confirm('此操作将提交对页面的修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.formData.tmpData = this.$refs['editPageContent'].editor.getValue();
                    this.formData.jsonData = this.$refs['editPageData'].editor.getValue();

                    this.$refs[editForm].validate(valid => {
                        if(valid) {
                            //this.sendEdit(this.formData, 'save')
                        } else {
                            return false;
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            //取消修改
            cancleEdit() {
                this.$confirm('此操作将撤销之前对页面的修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleInitData(this.originData);
                    this.sendEdit(this.originData, 'cancle')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            //发送修改
            sendEdit(data, type) {
                ajax({
                    url: `${ENV_API}pages/update`,
                    data: {
                        pageData:{
                            '_id': this.pageId
                        },
                        editData: {
                            pageCode: data.pageCode,
                            desc: data.desc,
                            tmpData: data.tmpData,
                            jsonData: data.jsonData
                        },
                    }
                }).then(resData => {
                    if(type === 'save') {
                        this.$message({
                            type: 'success',
                            message: '提交修改成功!'
                        });
                        this.$router.replace({
                            name: 'PageManage'
                        });
                    } else if(type === 'cancle') {
                        this.$message({
                            type: 'success',
                            message: '撤销成功!'
                        });
                    }
                }).catch(error => {

                });
            }
        },

    };
</script>

<style scoped>
    .card-list {
        display: flex;
        justify-content: space-between;
        margin: 15px;
        height: 130px;
    }
    .color-card {
        box-sizing: border-box;
        width: 24%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 20px;
    }
    .desc {
        font-size: 32px;
        font-weight: bold;
        padding-left: 20px;
    }
    .subdesc {
        padding-left: 20px;
    }
    .chart-list {
        display: flex;
        margin: 15px;
        justify-content: space-between;
    }
    .chart-shape {
        background-color: #fff;
    }
</style>

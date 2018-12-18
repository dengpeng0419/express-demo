<template>
    <div class="pagelist">
        <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="num" label="编号" width="100" align="center"></el-table-column>
            <el-table-column prop="code" label="页面id" width="100"></el-table-column>
            <el-table-column prop="title" label="页面标题" width="280" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="创建人" width="120"></el-table-column>
            <el-table-column prop="date" label="修改时间"></el-table-column>
            <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        </div>
    </div>
</template>

<script>
	export default {
		name: "page-list",
        data() {
		    return {
                tableData: [{
                    num: 1,
                    code: '001',
                    title: '页面标题页面标题页面标题页面标题页面标题页面标题1',
                    name: '王小虎',
                    date: '2016-05-02'
                }, {
                    num: 2,
                    code: '002',
                    title: '页面标题页面标题页面标题页面标题页面标题页面标题2',
                    name: '王小虎',
                    date: '2016-05-02'
                }, {
                    num: 3,
                    code: '003',
                    title: '页面标题页面标题页面标题页面标题页面标题页面标题3',
                    name: '王小虎',
                    date: '2016-05-02'
                }, {
                    num: 4,
                    code: '004',
                    title: '页面标题页面标题页面标题页面标题页面标题页面标题4',
                    name: '王小虎',
                    date: '2016-05-02'
                }],
                search: ''
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
	}
</script>

<style scoped>
    .pagelist {
        margin: 0 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .block {
        margin-top: 10px;
    }
</style>

<template>
    <div id="editor">
        <div class="ed-submit">
            <el-input placeholder="请输入标题" v-model="input"></el-input>
            <div class="submit-btn" :style="{'background-color': backgroudColor}" @click="showContent">提交</div>
        </div>
        <mavon-editor class="ed-frame" style="height: 100%" v-model="article" :boxShadow="false"></mavon-editor>
        <!--<div class="markdown-body" v-html="content">1111</div>-->
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';
    import marked from 'marked';
    import {mapState} from 'vuex';

	export default {
		name: "addArticle",
        data() {
		    return {
                article: '',
                content: '',
                input: '',
            }
        },
        computed: mapState({
            backgroudColor: state => state.home.backgroudColor
        }),
        components: {
            mavonEditor
        },
        mounted() {
		    console.log(this.article);
        },
        methods: {
            showContent() {
                this.content = marked(this.article);
                if(!this.article || !this.input) {
                    this.$alert('标题或内容不能为空', {
                        confirmButtonText: '确定',
                        callback: action => {
                            // this.$message({
                            //     type: 'info',
                            //     message: `action: ${ action }`
                            // });
                        }
                    });
                }
                console.log(this.content);
            }
        }
	}
</script>

<style scoped>
    #editor {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 100%;
        height: 88%;
    }
    .ed-frame {
        flex: 1;
        margin: 0 15px;
    }
    .ed-submit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 15px;
    }
    .submit-btn{
        width: 120px;
        height: 40px;
        line-height: 40px;
        border-radius: 2px;
        color: #fff;
        text-align: center;
    }
</style>

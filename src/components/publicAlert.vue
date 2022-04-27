<template>
    <div class="wrapper">
        <loading v-if="isLoading">loading</loading>
        <div class="back" @click="back">返回</div>
        <!-- <div class="delete">下载</div> -->
        <div id="text-container" class="text" >
            
            <div class="from" style="padding:0 0.5em;">本文来自用户:</div>
            <div class="author">
                <div class="name">
                    <div class="head-img">
                        <img src="../assets/img/logo.png" alt="头像">
                    </div>
                    <div class="username">
                        <div>
                            {{actNote.yb_userid}}
                        </div>
                        <div class="operations">
                            <div class="operator-btn delete-btn" @click="del()">
                                删除
                            </div>
                            <!-- 普通用户权限操作 -->
                            <div class="operator-btn clone-btn"  @click="clone">
                                转载
                            </div>
                            <div class="operator-btn download-btn" @click="download">
                                下载为html
                            </div>           
                        </div>
                    </div>
                </div>
                <!-- 管理员权限操作 -->
                
            </div>

            <hr>
            <div class="content" ref="content"></div>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'
import loading from '@/components/loading'
// let canvasModule = require('@/tools/canvasModule.js')


export default {
    name:'alert',
    components:{
        loading
    },
    props:{
        actNote: Object,
        ID: Number,
    },
    data(){
      return {
        originContent: '',
        isLoading: false,
        isOperator: sessionStorage.getItem('user_email') == '2779066456@qq.com' ? true : false, // 高危操作，但是暂时不管了
        isOrigin: sessionStorage.getItem('user_email') == this.actNote.yb_userid ? true : false // 是否为原作者
      }
    },
    created(){},
    mounted(){
        this.actNote.content += '<br><br><br>' 
        this.$refs.content.innerHTML = this.actNote.content 
    },
    activated(){},
    updated(){},
    methods:{
        produceFile (name, content) { //导出(保存)参数
            var aTag = document.createElement("a");
            var blob = new Blob([JSON.stringify(content)]);   //写入需要导出的内容
            aTag.download = `${name}.html`;    //创建文件名
            aTag.href = URL.createObjectURL(blob);
            aTag.click();
            URL.revokeObjectURL(blob);
        },
        back() {
            this.$emit('back')
        },
        del () {
            //  不为用户本人，也不为管理员
            if (sessionStorage.getItem('user_email') != '2779066456@qq.com' 
            && sessionStorage.getItem('user_email') != this.actNote.yb_userid) {
                aler('删除失败，仅可删除本人发布的笔记!')
                return 
            }
            if(confirm("确定要删除这篇笔记吗？")) {
                let that = this
                this.$axios.post(`/back/delete?id=${this.actNote.id}`, {
                    "id": this.actNote.id,
                    "userid": this.actNote.yb_userid
                }).then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.warn(err)
                })
                this.$emit('back')
                this.$emit('del', this.actNote.id) 
            }
        },
        clone () {
            if ( sessionStorage.getItem('user_email') == this.actNote.yb_userid) {
                alert('转载失败，不能转载自己的文章!')
                return 
            }
            if (confirm('确定要将这篇笔记保存到个人笔记中吗？')) {
                this.$axios.post('/back/clone', JSON.stringify({
                    "note": this.actNote,
                    "userId": sessionStorage.getItem('user_email')  
                })).then((res) => {
                    alert('转载成功，请返回个人笔记查看')
                    console.log(res.data)
                }).catch((err) => {
                    console.log('文章转载失败')
                })
            }
        },
        download () {
            if (confirm('确定要将这篇笔记下载到本地吗？')) {
                let name = this.actNote.yb_userid + '-' + this.actNote.id
                let content = this.actNote.content
                console.log(content)
                content = content.replace(/src="/g, 'src="https:')
                content = content.replace(/src="https:https:/g, 'src="https:')
                content = content.replace(/"/g, '\'')
                console.log(content)
                this.produceFile(name, content)
            }
        }

    },
    computed:{
       
    },
    watch:{},
  }
</script>
<style scoped>
    .toolbar, .text {
        margin: 0;
        padding: 0;
        border: none;
    }
    .toolbar {
        /* border: 1px solid #ccc; */
    }
    .text {
        border: 1px solid #ccc;
        min-height: 400px;
        text-align: left;
        height: 100vh;
    }
    .delete,
    .back {
        width: 2rem;
        position:absolute;
        right: 1rem;
        top: 0.5rem;
        z-index:9999;
        font-weight: 800;
        color: #ff3700;
        cursor: pointer;
    }
    .back {
        left: 1rem;
        color:#000;
        font-weight: 800;
    }
    #text-container {
        background: #fff;
        overflow-y: scroll;
    }
    .author {
        height: 10vh;
        width: 100vw;
        display: flex;
        padding: 0.5rem;
        font-weight: 800;
        justify-content: space-between;
    }
    .author .name {
        font-size: 20px;
        width: 100%;
        display: flex;
        
    }
    .author .name > * {
        text-align: center;
    }
    .head-img{
        height: 8vh;
        width: 8vh;
        border: 2px solid #aaa3;
        border-radius: 2vh;
        /* background: red; */
    }   
    .head-img img {
        width: 100%;
        height: 100%;
    }
    div.content {
        display: inline-block;
        overflow-y: scroll;
        max-height: 90vh;
        min-width: 100vw;
        max-width: 100vw;
        /* padding: 1rem 1rem 10rem 1rem; */
        overflow-y: scroll;
    }
    
    .operations {
        display: flex;
        justify-content: space-around;
        margin: 0.5vh 0.5vw;
    }
    
    .operator-btn {
        /* width: 8rem; */
        height: 1rem;
        line-height: 1rem;
        background: skyblue;
        color: #fff;
        padding: 0.4em 0.5em;
        margin: 0 5px;
        text-align: center;
        border-radius: 1vh;
        cursor: pointer;
        /* font-size: 18px; */
    }
    .delete-btn {
        background: #ff3700;
    }
    .from {
        font-weight: 800;
    }
</style>
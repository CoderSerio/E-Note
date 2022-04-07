<template>
    <div class="wrapper">
        <div class="back" @click="back">返回</div>
        <div class="delete" @click="del">删除</div>
        <div id="toolbar-container" class="toolbar"></div>
        <div id="text-container" class="text"></div>
    </div>
</template>

<script>
import E from 'wangeditor'

// const fs = require('fs')
let editor

export default {
    name:'alert',
    components:{},
    props:{
        actNote: Object,
        ID: Number
    },
    data(){
      return {
          
      }
    },
    created(){},
    mounted(){
        editor = new E('#toolbar-container', '#text-container')
        // editor.config.height = 1000
        editor.config.zIndex = 100
        // editor.config.placeholder = '空空如也'
        editor.config.focus = false
        editor.config.excludeMenus = [
            'lineHeight',
            'list',
            'redo',
            'lineHeight',
            'fontName',
            'italic',
        ]
        editor.create()
        // console.log(this.content)
        editor.txt.html(`${this.actNote.content}<br><br>`)
        if(+this.actNote.id < 0) {
            console.log(this.actNote.id)
            this.actNote.id = +this.ID
        }
            
    },
    activated(){},
    updated(){},
    methods:{
        back() {
            let dataJSON = JSON.stringify(this.actNote)
            // fs.writeFile(`@/notes/${this.actNote.title + this.actNote.id}.json`, dataJSON, (err) => {
            //    if(err) {
            //        console.warn('文件写入失败')
            //        console.warn(err)
            //     } else {
            //         alert('文件写入成功')
            //     }
            // })
            // 不能以数字开头啊
            this.content = editor.txt.html()
            // let title = editor.txt.text().match((/^.*?\s/))[0] || '新建文件'
            let title = editor.txt.text().slice(0, 10)
            console.log(title)
            // debugger
            this.$axios.post('/back/back/set', JSON.stringify({
                "id":       this.actNote.id,
                "yb_userid": this.actNote.yb_userid,
                "title":    title,
                "content":  this.content
            })).then((res) => {
                console.log('成功接收到响应信息', res)
                this.$emit('back')
            }).catch((err) => {
                console.warn(err)
            })
        },
        del () {
            if(confirm("确定要删除这篇笔记吗")) {
                this.$axios.get(`/back/delete?id=${this.actNote.id}`).then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.warn(err)
                })
                this.$emit('back')
                this.$emit('del', this.actNote.id) 
            }
        }
    },
    computed:{},
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
        height: 90vh;
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
    }
</style>
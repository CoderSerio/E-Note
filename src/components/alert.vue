<template>
    <div class="wrapper">
        <div class="back" @click="back">返回</div>
        <div id="toolbar-container" class="toolbar"></div>
        <div id="text-container" class="text"></div>
    </div>
</template>

<script>
import E from 'wangeditor'

// const fs = require('fs')

export default {
    name:'alert',
    components:{},
    props:{
        actNote: Object,
        ID: Number || String
    },
    data(){
      return {
          
      }
    },
    created(){},
    mounted(){
        const editor = new E('#toolbar-container', '#text-container')
        // editor.config.height = 1000
        editor.config.zIndex = 100
        // editor.config.placeholder = '空空如也'
        editor.config.focus = false
        editor.config.excludeMenus = [
            'lineHeight',
            'list',
            'undo',
            'redo',
            'lineHeight',
            'fontName',
            'italic',
        ]
        editor.create()
        // console.log(this.content)
        editor.txt.html(`<h1>${this.actNote.title}</h1>
                          <div>${this.actNote.content}</div>  `)
        if(+this.actNote.id < 0) {
            console.log(this.actNote.id)
            this.actNote.id = +this.ID
        }
            
    },
    activated(){},
    updated(){},
    methods:{
        back() {
            // console.log('触发了alert里面的back')
            let dataJSON = JSON.stringify(this.actNote)
            // fs.writeFile(`@/notes/${this.actNote.title + this.actNote.id}.json`, dataJSON, (err) => {
            //    if(err) {
            //        console.warn('文件写入失败')
            //        console.warn(err)
            //     } else {
            //         alert('文件写入成功')
            //     }
            // })
            this.$axios.post('http://localhost:3456/set', JSON.stringify({
                "id":   this.actNote.id,
                "title":this.actNote.title,
                "content": this.actNote.content    
            })).then((res) => {
                console.log('成功接收到响应信息', res)
            }).catch((err) => {
                console.warn(err)
            })
            this.$emit('back')
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
    .back {
        position:absolute;
        left: 1rem;
        top: 0.5rem;
        z-index:9999;
        font-weight: 800;
    }
</style>
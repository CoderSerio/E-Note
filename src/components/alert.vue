<template>
    <div class="wrapper">
        <div id="toolbar-container" class="toolbar"></div>
        <div id="text-container" class="text"></div>
    </div>
</template>

<script>
import E from 'wangeditor'

export default {
    name:'alert',
    components:{},
    props:{
        actNote: Object
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
        console.log(this.content)
        editor.txt.html(`<h1>${this.actNote.title}</h1>
                          <div>${this.actNote.content}</div>  `)
    },
    activated(){},
    updated(){},
    methods:{},
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
</style>
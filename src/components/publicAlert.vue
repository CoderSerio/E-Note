<template>
    <div class="wrapper">
        <loading v-if="isLoading">loading</loading>
        <div class="back" @click="back">返回</div>
        <!-- <div class="delete">下载</div> -->
        <div id="text-container" class="text" >
            <div class="author">本文来自用户：
                <br>{{actNote.yb_userid}}
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
         
      }
    },
    created(){},
    mounted(){
        this.$refs.content.innerHTML = this.actNote.content
    },
    activated(){},
    updated(){},
    methods:{
        back() {
            this.$emit('back')
        },

    

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
    }
    #text-container {
        background: #fff;
    }
    .author {
        padding: 0.5rem;
        font-weight: 800;
    }
    .content {
        display: inline-block;
        overflow-y: scroll;
        max-height: 90vh;
        padding: 1rem 1rem 10rem 1rem;
    }
    
</style>
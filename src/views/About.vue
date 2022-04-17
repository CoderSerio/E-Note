<template>
    <div class="wrapper">
        <div class="back-btn" @click="back">&lt</div>
        <ul style="text-align:left;padding: 2rem;">
            <li>
                <h4>分享笔记</h4>
                <div>点击[个人笔记]中的笔记右上角的按钮，按钮变为橙红色则分享成功；再次点击恢复到初始状态则取消分享；分享则代表您同意他人使用笔记的内容信息。</div>
            </li>
            <li>
                <h4>插入网页</h4>
                <div>在编辑笔记页面的菜单栏中可以找到[插入网页]按钮；由于一些安全策略，所以部分网页可能无法正常显示。</div>
            </li>
            <li>
                <h4>更多问题或建议</h4>
                <div>请联系开发者,QQ2779066456</div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name:'About',
    components:{},
    props:{},
    data(){
      return {
          
      }
    },
    created(){},
    mounted(){},
    activated(){},
    updated(){},
    methods:{
        back () {
            this.$router.go(-1)
        }
    },
    computed:{},
    watch:{},
  }
</script>
<style scoped>
     .back-btn {
        height: 4vh;
        width: 4vh;
        line-height: 4vh;
        font-weight: 900;
        font-size: 1.2rem;
        vertical-align: middle;
        color: #aaa;
        border-radius: 0.5rem;
        border: 2px solid #aaa;
        background: #e0e0e0;
        box-shadow: 7px -7px 14px #aaa,
                    -7px 7px 14px #ffffff;
        transition: border ease-in-out 0.2s;
        margin: 1rem;
    }
    .back-btn:active {
        border: 2px solid #dd3700;
        background: #e0e0e0;
        box-shadow: inset -7px 7px 14px #aaa,
                    inset 7px -7px 14px #ffffff;
    }
    ul {
        font-size: 1.5rem;
    }
    li {
        margin: 1rem 0 0 0;
    }
</style>
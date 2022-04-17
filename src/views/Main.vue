<template>
    <div class="wrapper">
      <div>
        <router-link to="/home" class="main_router">我的笔记</router-link>
        <router-link to="/home/public" class="main_router">分享广场</router-link>
      </div>
      
      <router-view></router-view>
    
    </div>
</template>

<script>
import home from '@/components/home'
  export default {
    mame: 'Main',
    components:{
      home
    },
    props:{},
    data(){
      return {
          
      }
    },
    created(){},
    mounted(){},
    activated(){},
    updated(){},
    methods:{},
    computed:{},
    watch:{},
  }
</script>
<style scoped>
  .main_router {
    display: inline-block;
    text-decoration: none;
    width: 45vw;
    height: 5vh;
    line-height: 5vh;
    margin: 1vh 1vw;
    color: #aaaaaa;
    font-weight: 800;
    font-size: 1.2rem;
    border-radius: 5vw;
    background: linear-gradient(45deg, #cccccc, #f3f3f3);
		box-shadow:  7px -7px 14px #aaaaaa,
             		-7px 7px 14px #ffffff;
  }
  a.router-link-exact-active {
    color: #ff3700;
    font-size: 1.1rem;
    background: linear-gradient(45deg, #cccccc, #f3f3f3);
		box-shadow: inset 7px -7px 14px #aaaaaa,
             		inset -7px 7px 14px #ffffff;
  }
</style>
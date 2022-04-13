<template>
    <div class="wrapper">
        <div class="box">
            <!-- <div class="routers">
                <router-link to="/">登录</router-link>
                <router-link to="/register">注册</router-link>
            </div> -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
            <!-- <login></login> -->
            <!-- <register></register>    -->
        </div>
    </div>
</template>

<script>
import Login from '@/components/login'
import Register from '@/components/register'
  export default {
    name: 'Visit',
    components:{
        'login': Login,
        'register': Register
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
 .box {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    overflow: hidden;
 }
 
</style>
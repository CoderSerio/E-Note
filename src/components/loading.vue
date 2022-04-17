<template>
    <div class="wrapper">
        <div class="content">
          <li style="--x: 0"></li>
          <li style="--x: 1"></li>
          <li style="--x: 2"></li>
          <li style="--x: 3"></li>
          <li style="--x: 4"></li>
        </div>
        <div class="slot">
          <slot>加载中</slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'loading',
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
    methods:{},
    computed:{},
    watch:{},
  }
</script>
<style scoped>
 /* 去除浏览器默认样式 */
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .wrapper { 
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 14vh;
        width: 20vh;
        line-height: 15vh;
        background: #dddb;
        backdrop-filter: blur(20vw);
        z-index: 9999;
        text-align: center;
        border-radius: 1em;
        font-weight: 800;
        font-size: 1.2rem;
    }
    .slot {
      width: 100%;
      height: 20%;
      line-height: 20%;
      text-align: center;
      position: absolute;
      bottom: 0;
      
    } 

   
  .content {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
     */
  }
  

    /* 设置外围容器wrapper */
    

    /* 设置内部容器 */
    li{
        position: relative;
        display: inline-block;
        width: 2vh;
        height: 80%;
      
        background: linear-gradient(to bottom , rgb(0 , 0 , 0 , .1) , #eef1f5);
        
        border-radius: 5vh;
        /* border: solid #ffffffee 1px; */
        /* #eef1f5 */
        overflow: hidden;
        box-shadow: 5px 5px 25px #585858 ,
                    -15px -15px 25px #ffffff , 
                    inset 10px 5px 10px #aaaaaa,
                    inset -10px -5px 25px #ffffff;

                    
    }

    /* 设置小球样式 */
    li::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2.1vh;
        height: 2.1vh;
        border-radius: 10vh;
        background-color: #eee;
        box-shadow: 1px 1px 5px #fff, 
                    5px 5px 20px rgba(0, 0, 0, 0.1),
                    0 5vh 0 5vh lightblue;
        animation: ball 2s ease-in-out infinite;
        /* 设置延时 */
        animation-delay: calc(var(--x) * 0.3s);
    }

    /* 设置关键帧 */
    @keyframes ball {
        0%{
            /* 设置偏移量 */
            transform: translateY(0);
            /* 设置颜色滤镜 */
            filter: hue-rotate(0deg);
        }

        50%{
            transform: translateY(500%);
            filter: hue-rotate(180deg);

        }
        
        100%{
            transform: translateY(0);
            filter: hue-rotate(360deg);
        }
    }


    
</style>